---
title: "Creating Simple and Elegant JavaScript Wrapper for Toastify JS"
description: "Dive into creating a reusable JavaScript wrapper for the popular notification library, Toastify-js. By building a custom wrapper, you can easily manage toast notifications like success, error, and basic messages, using a clean and readable API. Learn how to implement callable instances and extend functionality with minimal code changes"
---

Toast notifications are a great way to provide feedback to users about the success or failure of their actions in web applications. Toastify-js, a lightweight JavaScript library for creating toast notifications, makes this process easy. However, when managing different types of notifications, such as success and error messages, your code can become repetitive and harder to maintain.

In this post, we’ll explore how to create a simple wrapper around Toastify-js to abstract away repetitive tasks, giving you a clean API for managing toast notifications. We’ll show you how to make your wrapper flexible, so you can call it as both a function and an object with extended methods for success and error messages.

## Why Create a Wrapper?

Creating a wrapper around an existing library allows you to:

- **Simplify repetitive tasks:** Abstract away commonly used configurations like position, color, and duration.
- **Enhance code readability:** By using a wrapper, you can create meaningful method names like `toast.success()` or `toast.error()`, making your code easier to understand. 
- **Extend functionality:** Add additional features like logging, analytics, or global error handling inside the wrapper without changing your core implementation.

## Step-by-Step Guide to Building the Toastify-js Wrapper

### Setting Up Toastify-js

First, you need to include Toastify-js in your project. You can do this by either downloading the library or including it via CDN.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
<script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
```

### Creating the Toast Class

Our wrapper will be based on a class structure that centralizes the notification logic. We’ll create a class called `Toast` and start by implementing a basic `show()` method, which will be the core of all notifications.

```js
class Toast {
    show(message, options = {}) {
        let defaultOptions = {
            text: message,
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            style: {},
        };
        let toastOptions = { ...defaultOptions, ...options };
        Toastify(toastOptions).showToast();
    }
}
```
### Adding Success and Error Methods

To enhance the functionality, we can create two additional methods, `success()` and `error()`, which will use predefined styles (green for success and red for error) but still allow customization via options.

```js
class Toast {
    show(message, options = {}) {
        let defaultOptions = {
            text: message,
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            style: {},
        };
        let toastOptions = { ...defaultOptions, ...options };
        Toastify(toastOptions).showToast();
    }

    success(message, options = {}) {
        options.style = { background: "green", ...options.style };
        this.show(message, options);
    }

    error(message, options = {}) {
        options.style = { background: "red", ...options.style };
        this.show(message, options);
    }
}
```

With this setup, you can now call `toast.success('Success message')` or `toast.error('Error message')` to display notifications with different styles.

### Making the Instance Callable

To make the class instance callable like a function, we’ll modify the constructor. By returning a callable instance from the constructor, we allow `toast('Basic message')` to work just like a regular function, while still retaining the extended methods `success` and `error`.

```js
class Toast {
    constructor() {
        const instance = (message, options = {}) => {
            this.show(message, options);
        };

        instance.success = (message, options = {}) => {
            this.success(message, options);
        };
        
        instance.error = (message, options = {}) => {
            this.error(message, options);
        };

        return instance;
    }

    show(message, options = {}) {
        let defaultOptions = {
            text: message,
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            style: {},
        };
        let toastOptions = { ...defaultOptions, ...options };
        Toastify(toastOptions).showToast();
    }

    success(message, options = {}) {
        options.style = { background: "green", ...options.style };
        this.show(message, options);
    }

    error(message, options = {}) {
        options.style = { background: "red", ...options.style };
        this.show(message, options);
    }
}

// Create a callable toast instance
const toast = new Toast();
```

### Usage Example

You can now use the `toast` object to display notifications in the following ways:

```js
toast('Basic message');           // Shows a default toast
toast.success('Success message'); // Shows a success toast
toast.error('Error message', {className: 'custom-class'}); // Shows an error toast with custom class
```

## Key Takeaways

- **Callable instances:** By returning an instance from the constructor, we make the class instance callable like a function, providing a cleaner API.
- **Extensible methods:** We added specialized methods like `success()` and `error()` to handle common notification types with predefined styles.
- **Customizability:** The wrapper still allows full customization of toast options, making it flexible for any use case.

## Conclusion

Wrapping libraries like Toastify-js in your own helper classes can significantly reduce repetitive code, improve readability, and offer a more flexible API for various use cases. By making the instance callable and extending it with specialized methods, you simplify the integration of toast notifications across your application.

This pattern is not limited to Toastify-js; it can be applied to any third-party library where you need to manage repetitive actions or configurations. Happy coding!
