---
title: "How to Create a Type-Safe JSON Response Function in NextJS"
description: "Learn how to create a type-safe JSON response function in NextJS using TypeScript. This guide covers how to define response formats, restrict status codes, and ensure clean and consistent API responses across your NextJS application"
---

Handling JSON responses effectively is crucial for building consistent and robust APIs in Next.js. By creating a utility function for JSON responses, you can make your code more organized and maintainable. Here, we’ll explore a `resJson` function to streamline JSON responses, enforce status code ranges, and add type safety using TypeScript.

## Why Use a Custom JSON Response Function?

When building an API, you want to ensure all responses follow a consistent structure. Instead of repeating similar response code snippets, a helper function can:

* Simplify response handling.
* Enforce a specific structure for responses.
* Ensure only valid HTTP status codes are used.
* Add type safety with TypeScript, catching errors at compile time.

## Setting Up `resJson`: A Consistent JSON Response Function

Let’s walk through creating a `resJson` function that formats responses in JSON and limits the HTTP status to a specific range (200–599).

### Step 1: Import NextResponse and Define Types

First, import `NextResponse` from Next.js, which allows you to create JSON responses. Then, define custom types for the data and the allowed HTTP status codes.

```ts
import { NextResponse } from 'next/server';

// Define types for the allowed HTTP status codes
type StatusCode = 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 |
                  300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 |
                  400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 426 | 428 | 429 | 431 | 451 |
                  500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;

// Define the possible data structures for JSON response
type JsonResponse = {
  message: string;
} | object | string;
```

The `StatusCode` type limits status codes to commonly used HTTP codes, ensuring only valid values are passed to the function.

### Step 2: Implement the `resJson` Function

The `resJson` function takes three parameters:

1. `data`: The response body, which can be a string or an object.
1. `status`: A status code from our defined range, defaulting to 200.
1. `error`: An optional parameter for additional error information (optional).

The function then checks if `data` is a string and, if so, wraps it in a `{ message: data }` object.

```ts
export function resJson(data: JsonResponse, status: StatusCode = 200, error?: any) {
  // If data is a string, wrap it in a message object
  const responseData = typeof data === 'string' ? { message: data } : data;
  return NextResponse.json(responseData, { status });
}
```

### Step 3: Usage Examples for `resJson`

You can use `resJson` to handle both success and error responses with different status codes:

```ts
// Success response with default status 200
resJson('Operation successful');

// Error response with status 400
resJson({ message: 'Bad Request' }, 400);

// Invalid status example (TypeScript error)
resJson('This will throw an error', 700); // TypeScript will show an error
```

The last example, where `700` is passed as a status, will cause a TypeScript error, ensuring only values between 200 and 599 are allowed.

## Advantages of `resJson` Function in Next.js

This helper function makes API handling in Next.js more streamlined and error-free by:

1. **Enforcing Type Safety**: TypeScript will catch invalid data types and status codes, reducing potential runtime errors.
1. **Consistency Across Endpoints**: `resJson` guarantees a standardized response structure, making it easier to handle on the client side.
1. **Error Reduction**: Restricting status codes to valid values (200–599) eliminates accidental typos or unsupported codes.

## Conclusion

A well-defined JSON response function in Next.js provides a consistent, type-safe way to manage API responses. By using TypeScript to define response types and restricting status codes, you enhance code readability and maintainability while avoiding runtime errors. Integrate `resJson` in your Next.js project to keep your APIs organized and robust!

