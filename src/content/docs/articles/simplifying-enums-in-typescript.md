---
title: "Mastering Enums in TypeScript: Safer Validation and Display with Utility Functions"
description: "Learn how to create a flexible and type-safe enum structure in TypeScript for managing key-value pairs. This guide includes extracting types, validating roles, and creating a reusable function to fetch labels from enums for cleaner and safer code"
---

When working with enums in TypeScript, we often encounter the need for both database-friendly keys and user-friendly labels. Writing the same key multiple times can lead to redundancy and potential errors. Wouldn't it be great to have a concise and scalable solution that also ensures type safety and provides auto-completion?

Let’s dive into a clean approach to defining and managing enums in TypeScript using a dynamic, type-safe function.

## The Problem with Traditional Enums

A typical enum-like structure might look like this:

```ts
export const weightUnitEnum = {
  grams: { value: "grams", label: "Gms" },
  kilograms: { value: "kilograms", label: "KG" },
};
```

While this works, you are writing `"grams"` and `"kilograms"` twice: once as the key and again as the value. This redundancy is error-prone and harder to maintain as the number of keys grows.

## The Solution: A Dynamic Enum Generator

To eliminate redundancy, we can define a reusable function that generates enums dynamically. Here’s the implementation:

```ts
const createWeightUnitEnum = <T extends Record<string, string>>(units: T) => {
  return Object.keys(units).reduce((enumObject, key) => {
    enumObject[key as keyof T] = { 
      value: key, 
      label: units[key as keyof T] 
    };
    return enumObject;
  }, {} as { [K in keyof T]: { value: K; label: T[K] } });
};
```

This function takes an object where the keys represent database-friendly values and the values represent user-friendly labels. It then returns an object where each key is associated with both a `value` (the key itself) and a `label`.

## Extracting Types from Enums

To ensure your application remains type-safe, you can extract the types directly from your enum. For example, if you have a `userRoleEnum`:

```ts
export const userRoleEnum = createWeightUnitEnum({
  admin: "Administrator",
  user: "Regular User",
  guest: "Guest User",
});
```

You can extract its keys as a type:

```ts
export type UserRole = keyof typeof userRoleEnum;
```

This ensures that any function or variable expecting a user role accepts only the valid enum keys ("admin", "user", "guest") and not arbitrary strings.

## Usage Example

Here’s how you can use the `createWeightUnitEnum` function:

```ts
export const weightUnitEnum = createWeightUnitEnum({
  grams: "Gms",
  kilograms: "KG",
  pounds: "Lbs",
});

// Access with full type safety and auto-completion
console.log(weightUnitEnum.grams.value); // Output: grams
console.log(weightUnitEnum.grams.label); // Output: Gms
console.log(weightUnitEnum.kilograms.value); // Output: kilograms
console.log(weightUnitEnum.kilograms.label); // Output: KG
```

## Why This Approach Works

1. **Eliminates Redundancy**: You write each key (e.g., `"grams"`) only once.
1. **Type Safety**: TypeScript ensures that the structure is valid at compile time.
1. **Auto-Completion**: Accessing the enum's properties provides suggestions in your IDE, making development faster and less error-prone.
1. **Scalability**: Adding new items is as simple as extending the input object.

## Extending the Solution

You can use this pattern not just for weights but for any enum-like structure in your project. For instance, consider creating enums for status codes, currency units, or user roles.

```ts
export const userRoleEnum = createWeightUnitEnum({
  admin: "Administrator",
  user: "Regular User",
  guest: "Guest User",
});
```

## Creating a General Purpose Enum Label Function

Another common use case is displaying the user-friendly label of an enum value, such as showing `"Administrator"` for the database value `"admin"`. A general-purpose utility function can handle this:

```ts
export function getEnumLabel<T extends Record<string, { value: string; label: string }>>(
  enumObject: T,
  value: string
): string {
  const entry = Object.values(enumObject).find((item) => item.value === value);
  return entry?.label || "Unknown";
}
```

This function ensures:
1. **Safety**: Only values defined in the enum are mapped to their labels.
1. **Fallbacks**: Returns "Unknown" if the value doesn’t exist in the enum.

## Example: Displaying User Roles

Here’s how you can use getEnumLabel to display user roles:

```ts
const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "guest" },
  { id: 4, name: "Unknown", role: "hacker" }, // Invalid role
];

users.forEach((user) => {
  console.log(`${user.name}: ${getEnumLabel(userRoleEnum, user.role)}`);
});
```

Output:

```
Alice: Administrator
Bob: Regular User
Charlie: Guest User
Unknown: Unknown
```

This utility can be reused across any enums in your codebase, improving consistency and reducing redundancy.

## Conclusion

Dynamic enum generation in TypeScript is a powerful pattern for reducing redundancy, ensuring type safety, and maintaining code clarity. By leveraging a simple utility function, you can streamline your enums and make them more scalable and developer-friendly.

If you're building applications with TypeScript, adopting this pattern can save time and reduce bugs, especially in projects with frequently updated or large sets of enum values.

Have you tried this approach in your projects? Let us know how it worked for you.

