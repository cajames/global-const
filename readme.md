![Build](https://github.com/cajames/global-const/workflows/Build%20and%20Test/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/cajames/global-const/badge.svg?branch=master)](https://coveralls.io/github/cajames/global-const?branch=master)

> A lightweight utility to create global singletons (on browser and node)

> [!WARNING]
> Attaching items on globals should be a last resort, so only do this if you must... But sometimes you've got to do what you've got to do, and for that, this package exists.

## Basic features

- Works in Node and the browser
- Namespace in global object to prevent collision if multiple projects use this.
- Globally reference any kind of variable, object/function
- TypeScript support

## Installation

To install `global-const`, use npm or yarn as follows:

```bash
npm install global-const
# or
yarn add global-const
```

## Usage

```ts
import { getGlobalisedValue, clearGlobalNamespace } from "global-const";

const targetFunction = (someParams) => {
  // some function that maintains state, or works
  // within a closure.
};

const singletonInstance = getGlobalisedValue(
  "namespace",
  "targetFunction",
  targetFunction
);

// ...
singletonInstance("...");

// ... somewhere else in code

// this will get the same function instance as above
const anotherInstance = getGlobalisedValue(
  "namespace",
  "targetFunction",
  targetFunction
);

expect(singletonInstance).toBe(anotherInstance); // true
```

## Why would you need this library?

While it's generally not advised to add code to the global-state (`window`/`globalThis`), you might need to. This library comes handle to manage this.

And example is when you have many packages, each using a "metrics" module. When a customer individually instantiates each module, each module will probably instantiate it's own metrics tracking module. However if you wish for all the features to use the same metrics tracking function, instead of being siloed, this feature will help ensure that each time the metrics functions are instantiated, they'll check if there's one that's been globalised, and if so return that one instead.

> [!CAUTION]
> This assumes that each instantiation is the same as the other, so be careful to ensure that your customers aren't likely to mix different versions of the function.

## API Reference

### `getGlobalisedValue(namespace, key, value)`

- `namespace`: A unique string identifier to prevent collisions when considering other packages using this module.
- `key`: The name of the value to retrieve or set.
- `value`: An object/function to be globalised if it doesn't already exist.

Returns the globalised value or stores the value passed in if not initialised, and returns it.

```ts
const logger = getGlobalisedValue("myApp", "logger", new Logger());
```

### `clearGlobalNamespace(namespace)`

- `namespace`: A unique string identifier to prevent collisions when considering other packages using this module.

This function is used for an application to clear out it's namespace.
