# ts-redacted

<!-- ![CI passing](https://github.com/Haberkamp/ts-redacted/actions/workflows/ci.yml/badge.svg?event=push&branch=main) -->

![Created by](https://img.shields.io/badge/created%20by-@n__haberkamp-065afa.svg)

![NPM License](https://img.shields.io/npm/l/ts-redacted)

## Overview

Working with sensitive values like API keys, passwords, or tokens in TypeScript can be risky. Accidentally logging or serializing these values can expose them in production.

```ts
const apiKey = "sk_live_1234567890";
console.log(apiKey); // Oops! Secret exposed in logs
JSON.stringify({ key: apiKey }); // Oops! Secret in JSON output
```

```ts
const apiKey = Redacted.make("sk_live_1234567890");
console.log(apiKey); // "<redacted>"
JSON.stringify({ key: apiKey }); // {"key":"<redacted>"}

// Access the actual value only when explicitly needed
const actualKey = Redacted.value(apiKey);
```

### Author

Hey, I'm Nils. In my spare time [I write about things I learned](https://www.haberkamp.dev/) or I [create open source packages](https://github.com/Haberkamp), that help me (and hopefully you) to build better apps.

## Installation

You can install this package with any package manager you like.

```bash
pnpm add ts-redacted
```

## Usage

### Creating Redacted Values

```ts
import { Redacted } from "ts-redacted";

const secret = Redacted.make("my-secret-api-key");
const password = Redacted.make(process.env.PASSWORD);
const token = Redacted.make({ accessToken: "abc123", refreshToken: "xyz789" });
```

### Extracting Values

```ts
const secret = Redacted.make("my-secret-api-key");

// Extract the actual value
const actualValue = Redacted.value(secret); // "my-secret-api-key"
```

### Safe Serialization

```ts
const secret = Redacted.make("my-secret-api-key");

// toString() returns "<redacted>"
secret.toString(); // "<redacted>"
String(secret); // "<redacted>"

// toJSON() returns "<redacted>"
secret.toJSON(); // "<redacted>"
JSON.stringify({ key: secret }); // '{"key":"<redacted>"}'
```

### Type Safety

```ts
import { Redacted, Value } from "ts-redacted";

// Type inference works correctly
const secret = Redacted.make("my-secret-api-key");
type SecretType = Value<typeof secret>; // string

const token = Redacted.make(42);
type TokenType = Value<typeof token>; // number

// Extract with correct types
const actualSecret: string = Redacted.value(secret);
const actualToken: number = Redacted.value(token);
```

### Supported Value Types

The `Redacted` class works with any value type:

```ts
Redacted.make("string");
Redacted.make(42);
Redacted.make(true);
Redacted.make(null);
Redacted.make(undefined);
Redacted.make({ key: "value" });
Redacted.make([1, 2, 3]);
```

## Feedback and Contributing

I highly appreciate your feedback! Please create an [issue](https://github.com/Haberkamp/ts-redacted/issues/new), if you've found any bugs or want to request a feature.
