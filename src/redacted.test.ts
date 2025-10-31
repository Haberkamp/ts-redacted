import { describe, expect, test } from "vitest";

import { Redacted } from "./redacted.js";

describe("Redacted runtime tests", () => {
  describe("make()", () => {
    test.each([
      { description: "string", value: "secret" },
      { description: "number", value: 42 },
      { description: "boolean", value: true },
      // eslint-disable-next-line unicorn/no-null -- Testing null value
      { description: "null", value: null },
      { description: "undefined", value: undefined },
      { description: "empty string", value: "" },
      { description: "zero", value: 0 },
    ])("creates Redacted from $description", ({ value }) => {
      // Arrange & Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toBe(value);
    });

    test.each([
      { description: "object", value: { key: "secret" } },
      { description: "array", value: [1, 2, 3] },
      { description: "empty object", value: {} },
      { description: "empty array", value: [] as unknown[] },
    ])("creates Redacted from $description", ({ value }) => {
      // Arrange & Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toEqual(value);
    });

    test("creates Redacted from NaN", () => {
      // Arrange
      const value = Number.NaN;

      // Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toBeNaN();
    });
  });

  describe("value()", () => {
    test.each([
      { description: "string", value: "secret" },
      { description: "number", value: 42 },
      { description: "boolean", value: true },
      // eslint-disable-next-line unicorn/no-null -- Testing null value
      { description: "null", value: null },
      { description: "undefined", value: undefined },
    ])("extracts $description value", ({ value }) => {
      // Arrange
      const redacted = Redacted.make(value);

      // Act
      const result = Redacted.value(redacted);

      // Assert
      expect(result).toBe(value);
    });

    test.each([
      { description: "object", value: { key: "secret" } },
      { description: "array", value: [1, 2, 3] },
    ])("extracts $description value", ({ value }) => {
      // Arrange
      const redacted = Redacted.make(value);

      // Act
      const result = Redacted.value(redacted);

      // Assert
      expect(result).toEqual(value);
    });
  });

  describe("toJSON()", () => {
    test.each([
      { description: "string", value: "secret" },
      { description: "number", value: 42 },
      { description: "boolean", value: true },
      // eslint-disable-next-line unicorn/no-null -- Testing null value
      { description: "null", value: null },
      { description: "undefined", value: undefined },
      { description: "object", value: { key: "secret" } },
      { description: "array", value: [1, 2, 3] },
    ])("returns redacted string for $description value", ({ value }) => {
      // Arrange
      const redacted = Redacted.make(value);

      // Act
      const result = redacted.toJSON();

      // Assert
      expect(result).toBe("<redacted>");
    });
  });

  describe("toString()", () => {
    test.each([
      { description: "string", value: "secret" },
      { description: "number", value: 42 },
      { description: "boolean", value: true },
      // eslint-disable-next-line unicorn/no-null -- Testing null value
      { description: "null", value: null },
      { description: "undefined", value: undefined },
      { description: "object", value: { key: "secret" } },
      { description: "array", value: [1, 2, 3] },
    ])("returns redacted string for $description value", ({ value }) => {
      // Arrange
      const redacted = Redacted.make(value);

      // Act
      const result = redacted.toString();

      // Assert
      expect(result).toBe("<redacted>");
    });
  });

  describe("Symbol.toStringTag", () => {
    test("has correct toStringTag", () => {
      // Arrange
      const redacted = Redacted.make("secret");

      // Act & Assert
      expect(redacted[Symbol.toStringTag]).toBe("Redacted");
    });
  });

  describe("String()", () => {
    test.each([
      { description: "string", value: "secret" },
      { description: "number", value: 42 },
      { description: "boolean", value: true },
      // eslint-disable-next-line unicorn/no-null -- Testing null value
      { description: "null", value: null },
      { description: "undefined", value: undefined },
      { description: "object", value: { key: "secret" } },
      { description: "array", value: [1, 2, 3] },
    ])("returns redacted string for $description value", ({ value }) => {
      // Arrange
      const redacted = Redacted.make(value);

      // Act
      const result = String(redacted);

      // Assert
      expect(result).toBe("<redacted>");
    });
  });

  describe("JSON.stringify()", () => {
    test.each([
      { description: "string", value: "secret" },
      { description: "number", value: 42 },
      { description: "boolean", value: true },
      // eslint-disable-next-line unicorn/no-null -- Testing null value
      { description: "null", value: null },
      { description: "undefined", value: undefined },
      { description: "object", value: { key: "secret" } },
      { description: "array", value: [1, 2, 3] },
    ])("returns redacted string for $description value", ({ value }) => {
      // Arrange
      const redacted = Redacted.make(value);

      // Act
      const result = JSON.stringify(redacted);

      // Assert
      expect(result).toBe('"<redacted>"');
    });

    test("returns redacted string when Redacted is nested in object", () => {
      // Arrange
      const redacted = Redacted.make("secret");
      const object = { key: redacted };

      // Act
      const result = JSON.stringify(object);

      // Assert
      expect(result).toBe('{"key":"<redacted>"}');
    });

    test("returns redacted string when Redacted is nested in array", () => {
      // Arrange
      const redacted = Redacted.make("secret");
      const array = [redacted, "other"];

      // Act
      const result = JSON.stringify(array);

      // Assert
      expect(result).toBe('["<redacted>","other"]');
    });

    test("returns redacted string for multiple Redacted properties in object", () => {
      // Arrange
      const password = Redacted.make("secret123");
      const apiKey = Redacted.make("key456");
      const object = { apiKey, name: "public", password };

      // Act
      const result = JSON.stringify(object);

      // Assert
      expect(result).toBe(
        '{"apiKey":"<redacted>","name":"public","password":"<redacted>"}',
      );
    });

    test("returns redacted string for Redacted property mixed with other types", () => {
      // Arrange
      const token = Redacted.make("token123");
      const object = {
        active: true,
        id: 1,
        // eslint-disable-next-line unicorn/no-null -- Testing null value
        metadata: null,
        name: "user",
        token,
      };

      // Act
      const result = JSON.stringify(object);

      // Assert
      expect(result).toBe(
        '{"active":true,"id":1,"metadata":null,"name":"user","token":"<redacted>"}',
      );
    });

    test("returns redacted string for deeply nested Redacted property", () => {
      // Arrange
      const secret = Redacted.make("deep-secret");
      const object = {
        level1: {
          level2: {
            level3: {
              secret,
            },
          },
        },
      };

      // Act
      const result = JSON.stringify(object);

      // Assert
      expect(result).toBe(
        '{"level1":{"level2":{"level3":{"secret":"<redacted>"}}}}',
      );
    });

    test("returns redacted string for Redacted property in object with array", () => {
      // Arrange
      const password = Redacted.make("pass123");
      const object = {
        password,
        users: ["alice", "bob"],
      };

      // Act
      const result = JSON.stringify(object);

      // Assert
      expect(result).toBe('{"password":"<redacted>","users":["alice","bob"]}');
    });

    test("returns redacted string for Redacted property in object containing another object", () => {
      // Arrange
      const apiKey = Redacted.make("key789");
      const object = {
        config: {
          url: "https://example.com",
        },
        credentials: {
          apiKey,
        },
      };

      // Act
      const result = JSON.stringify(object);

      // Assert
      expect(result).toBe(
        '{"config":{"url":"https://example.com"},"credentials":{"apiKey":"<redacted>"}}',
      );
    });

    test("returns redacted string for multiple Redacted values in nested structure", () => {
      // Arrange
      const token = Redacted.make("token123");
      const secret = Redacted.make("secret456");
      const object = {
        auth: {
          token,
        },
        data: {
          public: "visible",
          secret,
        },
      };

      // Act
      const result = JSON.stringify(object);

      // Assert
      expect(result).toBe(
        '{"auth":{"token":"<redacted>"},"data":{"public":"visible","secret":"<redacted>"}}',
      );
    });
  });
});
