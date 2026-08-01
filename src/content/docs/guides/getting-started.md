---
title: React Native You
description: Modern UI components for React Native — inspired by Android and Flutter design.
---

**`react-native-you`** is a lightweight and opinionated UI utility library for React Native — designed to help *you* build apps faster, with better defaults and fewer headaches.

Whether you're prototyping or scaling a production app, `react-native-you` gives you expressive building blocks that feel natural, composable, and consistent across platforms.

---

## ✨ Features

* ⚡ **Zero Config Setup** — Start using components instantly, no setup required.
* 🧩 **Prebuilt Layout Primitives** — Common building blocks like `Row`, `Column`, and `Spacer` out of the box.
* 🪄 **Smart CLI** — Add components or hooks on demand with `npx` (tree-shakable and file-based).
* 🤯 **Native Feel** — Designed with platform consistency and accessibility in mind.
* 🧠 **Tiny & Focused** — No theme systems, no bloat, just essentials.
* 🧵 **Composable & Readable** — Build UIs with better semantics and less noise.
* 🎯 **Strictly Typed** — Built in TypeScript with strict types and IntelliSense support.

---

## 🧱 Available Building Blocks

### ✅ Components

* **`<Row />`**
  Horizontally stacked layout with gap support, ideal for aligning elements in a row.

* **`<Column />`**
  Vertically stacked layout with spacing, similar to `Row` but for columns.

* **`<Spacer />`**
  Simple and flexible spacing element — use it to push content apart in any layout.

### 🔗 Hooks

* **`useBottomSheetBack()`**
  A helper hook that dismisses your bottom sheet when the hardware back button is pressed on Android — useful for consistent UX.

---

## 🚀 Getting Started

No installation, direactly use the CLI to add components or hooks:

```bash
npx react-native-you add view
npx react-native-you add use-bottom-sheet-back
```

This will automatically create files in your project with recommended best practices and sensible defaults.

---

## 💡 Philosophy

> *Build UIs like LEGO bricks — simple, predictable, and fun.*

`react-native-you` isn't trying to be a full design system. It's a utility-first kit of composable blocks and helpers that make your own UI system more ergonomic and maintainable.

You stay in control — bring your own styling, themes, and design choices. Let this library handle the common scaffolding so you can focus on the *what* instead of the *how*.

---

<!-- ## 🛠 Use Case Examples

Coming soon: visit the [Examples](./examples) section for practical usage, recipes, and animated demos.

--- -->

## 📦 CLI Features

* Add any component or hook with one command
* Avoid bundling unused code — only what you add exists in your repo
* Scaffold includes TS/JSX, documentation, and prop types
* Re-runnable and customizable

```bash
npx react-native-you add <component|hook>
```

---

## 📚 What's Next?

Explore available components and hooks in the sidebar, or start by checking out:

* [Row and Column Component →](/components/view/)
* [useBottomSheetBack Hook →](/hooks/use-bottom-sheet-back/)

---

## ❤️ Made for *You*

React Native **You** is made for **You**, crafted for developers who value clarity, speed, and developer experience. Whether you're building a one-screen MVP or scaling a complex app — `react-native-you` keeps your UI code lean and clean.
