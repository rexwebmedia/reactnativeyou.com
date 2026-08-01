---
title: "How to Create a Zip Backup of Folders in Express.js (with Exclusions)"
description: "Learn how to create a zip backup of your public/storage folder in an Express.js app while excluding specific folders like backups, assets, and .gitignore. This method ensures secure and space-efficient backups for your web app."
---

Keeping regular backups of user-uploaded files or generated content is critical in any web application. If you're using Express.js and saving files inside the `public/storage` directory, this guide walks you through creating a .zip backup of the folder — excluding certain subdirectories like `backups`, `assets`, or files like `.gitignore`.

## Why Use Zip Archives for Backups?

- Space-efficient thanks to compression
- Easy to download, move, or upload elsewhere
- Simple to automate for regular intervals or on-demand backups

## The Backup Logic (Excluding Specific Files/Folders)

Here’s how the `create_storage_backup` function works:

```js
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

/**
 * Create backup of storage folder
 * create_storage_backup(['backups', 'assets', '.gitignore']);
 * @param {string[]} exclude
 */
export async function create_storage_backup(exclude = []) {
    const storagePath = path.join('public', 'storage');
    const backupDir = path.join(storagePath, 'backups');

    exclude.push('backups'); // always exclude backup folder itself

    // Format timestamp for the filename: storage-YYYY-MM-DD-HH-mm-ss.zip
    const now = new Date();
    const filename = `storage-${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}-${now.getHours().toString().padStart(2,'0')}-${now.getMinutes().toString().padStart(2,'0')}-${now.getSeconds().toString().padStart(2,'0')}.zip`;

    const zipPath = path.join(backupDir, filename);
    fs.mkdirSync(backupDir, { recursive: true });

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        console.log(`Backup created: ${zipPath} (${archive.pointer()} bytes)`);
    });

    archive.on('error', (err) => { throw err; });
    archive.pipe(output);

    // Recursively walk through storage and add files
    const walkDir = (dir, base = '') => {
        fs.readdirSync(dir).forEach((file) => {
            const fullPath = path.join(dir, file);
            const relPath = path.join(base, file);

            const shouldExclude = exclude.some((ex) =>
                relPath === ex || relPath.startsWith(ex + path.sep)
            );

            if (shouldExclude) return;

            const stats = fs.statSync(fullPath);
            if (stats.isDirectory()) {
                walkDir(fullPath, relPath);
            } else if (stats.isFile()) {
                archive.file(fullPath, { name: relPath.replace(/\\/g, '/') });
            }
        });
    };

    walkDir(storagePath);
    await archive.finalize();
}
```

## Protecting the Backup Route (Optional Admin-Only)

Here’s an example route that lets a super admin create a new backup and fetch existing ones:

```js
import { Router } from 'express';
const router = Router();

router.get('/storage-backups', auth, async (req, res) => {
    try {
        if (!is_super_admin(req.user)) {
            return res_json(res, 'Please Login as admin', 403);
        }

        if (String(req.query?.['action'] ?? '') === 'create') {
            await create_storage_backup();
        }

        const backupDir = path.join('public', 'storage', 'backups');
        const items = fs.readdirSync(backupDir).filter(f => f.endsWith('.zip'));
        const latest = items.sort().reverse()[0];

        return res_json(res, {
            items, latest,
            url: url('/storage/backups'),
        });
    } catch (error) {
        return res_json(res, get_error_message(error), 500);
    }
});
```

## Example API Usage

To create a new backup
```
GET /storage-backups?action=create
```
To list and fetch backups
```
GET /storage-backups
```


## Output Example

The backup files will be saved like:

```
/public/storage/backups/storage-2025-04-25-14-38-20.zip
```

Access them via your preferred admin panel or direct link.

### Sorted Backups

```js
import fs from 'fs';
import path from 'path';
import { Router } from 'express';

const router = Router();

router.get('/backups/grouped', async (req, res) => {
    try {
        const backupDir = path.join('public', 'storage', 'backups');
        if (!fs.existsSync(backupDir)) {
            return res.json({});
        }

        const files = fs.readdirSync(backupDir).filter(f => f.endsWith('.zip'));

        const grouped = {};

        files.forEach((file) => {
            // match formats like: storage-YYYY-MM-DD-HH-MM-SS.zip
            const match = file.match(/^(storage|mysql)-(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2}-\d{2})\.zip$/);
            if (!match) return;

            const [, type, date, timeRaw] = match;
            const time = timeRaw.replace(/-/g, ':');

            if (!grouped[date]) grouped[date] = [];

            grouped[date].push({ name: file, type, time });
        });

        // Sort files within each group (latest time first)
        for (const date in grouped) {
            grouped[date].sort((a, b) => b.time.localeCompare(a.time));
        }

        // Sort groups by newest date first
        const sortedGrouped = Object.fromEntries(
            Object.entries(grouped).sort(([a], [b]) => b.localeCompare(a))
        );

        return res.json(sortedGrouped);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

export default router;
```

## Final Tips

- This script assumes you’re using Express + ESM modules.
- Use a cron job or scheduled function to call this on intervals.
- Always exclude .gitignore and the backups folder to avoid infinite recursion.
- Store backups off-site (e.g., S3) for extra safety.

## Conclusion

This approach gives you a simple, customizable, and secure way to back up your storage files in Express.js. Whether for disaster recovery or audit logs, having compressed archives on hand is a best practice every app should adopt.
