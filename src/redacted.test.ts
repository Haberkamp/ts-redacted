import { describe, expect, test } from "vitest";

import { Redacted } from "./redacted.js";

describe("Redacted runtime tests", () => {
  describe("make()", () => {
    test("creates Redacted from string", () => {
      // Arrange
      const value = "secret";

      // Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toBe(value);
    });

    test("creates Redacted from number", () => {
      // Arrange
      const value = 42;

      // Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toBe(value);
    });

    test("creates Redacted from boolean", () => {
      // Arrange
      const value = true;

      // Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toBe(value);
    });

    test("creates Redacted from null", () => {
      // Arrange
      // eslint-disable-next-line unicorn/no-null -- Testing null value
      const value = null;

      // Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toBe(value);
    });

    test("creates Redacted from undefined", () => {
      // Arrange
      const value = undefined;

      // Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toBe(value);
    });

    test("creates Redacted from object", () => {
      // Arrange
      const value = { key: "secret" };

      // Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toEqual(value);
    });

    test("creates Redacted from array", () => {
      // Arrange
      const value = [1, 2, 3];

      // Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toEqual(value);
    });

    test("creates Redacted from empty string", () => {
      // Arrange
      const value = "";

      // Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toBe(value);
    });

    test("creates Redacted from zero", () => {
      // Arrange
      const value = 0;

      // Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toBe(value);
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

    test("creates Redacted from empty object", () => {
      // Arrange
      const value = {};

      // Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toEqual(value);
    });

    test("creates Redacted from empty array", () => {
      // Arrange
      const value: unknown[] = [];

      // Act
      const redacted = Redacted.make(value);

      // Assert
      expect(redacted).toBeInstanceOf(Redacted);
      expect(Redacted.value(redacted)).toEqual(value);
    });
  });

  describe("value()", () => {
    test("extracts string value", () => {
      // Arrange
      const value = "secret";
      const redacted = Redacted.make(value);

      // Act
      const result = Redacted.value(redacted);

      // Assert
      expect(result).toBe(value);
    });

    test("extracts number value", () => {
      // Arrange
      const value = 42;
      const redacted = Redacted.make(value);

      // Act
      const result = Redacted.value(redacted);

      // Assert
      expect(result).toBe(value);
    });

    test("extracts boolean value", () => {
      // Arrange
      const value = true;
      const redacted = Redacted.make(value);

      // Act
      const result = Redacted.value(redacted);

      // Assert
      expect(result).toBe(value);
    });

    test("extracts null value", () => {
      // Arrange
      // eslint-disable-next-line unicorn/no-null -- Testing null value
      const value = null;
      const redacted = Redacted.make(value);

      // Act
      const result = Redacted.value(redacted);

      // Assert
      expect(result).toBe(value);
    });

    test("extracts undefined value", () => {
      // Arrange
      const value = undefined;
      const redacted = Redacted.make(value);

      // Act
      const result = Redacted.value(redacted);

      // Assert
      expect(result).toBe(value);
    });

    test("extracts object value", () => {
      // Arrange
      const value = { key: "secret" };
      const redacted = Redacted.make(value);

      // Act
      const result = Redacted.value(redacted);

      // Assert
      expect(result).toEqual(value);
    });

    test("extracts array value", () => {
      // Arrange
      const value = [1, 2, 3];
      const redacted = Redacted.make(value);

      // Act
      const result = Redacted.value(redacted);

      // Assert
      expect(result).toEqual(value);
    });
  });

  describe("toJSON()", () => {
    test("returns redacted string for string value", () => {
      // Arrange
      const redacted = Redacted.make("secret");

      // Act
      const result = redacted.toJSON();

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for number value", () => {
      // Arrange
      const redacted = Redacted.make(42);

      // Act
      const result = redacted.toJSON();

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for boolean value", () => {
      // Arrange
      const redacted = Redacted.make(true);

      // Act
      const result = redacted.toJSON();

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for null value", () => {
      // Arrange
      // eslint-disable-next-line unicorn/no-null -- Testing null value
      const redacted = Redacted.make(null);

      // Act
      const result = redacted.toJSON();

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for undefined value", () => {
      // Arrange
      // eslint-disable-next-line unicorn/no-useless-undefined -- Testing undefined value
      const redacted = Redacted.make(undefined);

      // Act
      const result = redacted.toJSON();

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for object value", () => {
      // Arrange
      const redacted = Redacted.make({ key: "secret" });

      // Act
      const result = redacted.toJSON();

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for array value", () => {
      // Arrange
      const redacted = Redacted.make([1, 2, 3]);

      // Act
      const result = redacted.toJSON();

      // Assert
      expect(result).toBe("<redacted>");
    });
  });

  describe("toString()", () => {
    test("returns redacted string for string value", () => {
      // Arrange
      const redacted = Redacted.make("secret");

      // Act
      const result = redacted.toString();

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for number value", () => {
      // Arrange
      const redacted = Redacted.make(42);

      // Act
      const result = redacted.toString();

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for boolean value", () => {
      // Arrange
      const redacted = Redacted.make(true);

      // Act
      const result = redacted.toString();

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for null value", () => {
      // Arrange
      // eslint-disable-next-line unicorn/no-null -- Testing null value
      const redacted = Redacted.make(null);

      // Act
      const result = redacted.toString();

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for undefined value", () => {
      // Arrange
      // eslint-disable-next-line unicorn/no-useless-undefined -- Testing undefined value
      const redacted = Redacted.make(undefined);

      // Act
      const result = redacted.toString();

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for object value", () => {
      // Arrange
      const redacted = Redacted.make({ key: "secret" });

      // Act
      const result = redacted.toString();

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for array value", () => {
      // Arrange
      const redacted = Redacted.make([1, 2, 3]);

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
    test("returns redacted string for string value", () => {
      // Arrange
      const redacted = Redacted.make("secret");

      // Act
      const result = String(redacted);

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for number value", () => {
      // Arrange
      const redacted = Redacted.make(42);

      // Act
      const result = String(redacted);

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for boolean value", () => {
      // Arrange
      const redacted = Redacted.make(true);

      // Act
      const result = String(redacted);

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for null value", () => {
      // Arrange
      // eslint-disable-next-line unicorn/no-null -- Testing null value
      const redacted = Redacted.make(null);

      // Act
      const result = String(redacted);

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for undefined value", () => {
      // Arrange
      // eslint-disable-next-line unicorn/no-useless-undefined -- Testing undefined value
      const redacted = Redacted.make(undefined);

      // Act
      const result = String(redacted);

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for object value", () => {
      // Arrange
      const redacted = Redacted.make({ key: "secret" });

      // Act
      const result = String(redacted);

      // Assert
      expect(result).toBe("<redacted>");
    });

    test("returns redacted string for array value", () => {
      // Arrange
      const redacted = Redacted.make([1, 2, 3]);

      // Act
      const result = String(redacted);

      // Assert
      expect(result).toBe("<redacted>");
    });
  });

  describe("JSON.stringify()", () => {
    test("returns redacted string for string value", () => {
      // Arrange
      const redacted = Redacted.make("secret");

      // Act
      const result = JSON.stringify(redacted);

      // Assert
      expect(result).toBe('"<redacted>"');
    });

    test("returns redacted string for number value", () => {
      // Arrange
      const redacted = Redacted.make(42);

      // Act
      const result = JSON.stringify(redacted);

      // Assert
      expect(result).toBe('"<redacted>"');
    });

    test("returns redacted string for boolean value", () => {
      // Arrange
      const redacted = Redacted.make(true);

      // Act
      const result = JSON.stringify(redacted);

      // Assert
      expect(result).toBe('"<redacted>"');
    });

    test("returns redacted string for null value", () => {
      // Arrange
      // eslint-disable-next-line unicorn/no-null -- Testing null value
      const redacted = Redacted.make(null);

      // Act
      const result = JSON.stringify(redacted);

      // Assert
      expect(result).toBe('"<redacted>"');
    });

    test("returns redacted string for undefined value", () => {
      // Arrange
      // eslint-disable-next-line unicorn/no-useless-undefined -- Testing undefined value
      const redacted = Redacted.make(undefined);

      // Act
      const result = JSON.stringify(redacted);

      // Assert
      expect(result).toBe('"<redacted>"');
    });

    test("returns redacted string for object value", () => {
      // Arrange
      const redacted = Redacted.make({ key: "secret" });

      // Act
      const result = JSON.stringify(redacted);

      // Assert
      expect(result).toBe('"<redacted>"');
    });

    test("returns redacted string for array value", () => {
      // Arrange
      const redacted = Redacted.make([1, 2, 3]);

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
      expect(result).toBe('{"apiKey":"<redacted>","name":"public","password":"<redacted>"}');
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
      expect(result).toBe('{"active":true,"id":1,"metadata":null,"name":"user","token":"<redacted>"}');
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
      expect(result).toBe('{"level1":{"level2":{"level3":{"secret":"<redacted>"}}}}');
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
      expect(result).toBe('{"config":{"url":"https://example.com"},"credentials":{"apiKey":"<redacted>"}}');
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
      expect(result).toBe('{"auth":{"token":"<redacted>"},"data":{"public":"visible","secret":"<redacted>"}}');
    });
  });
});
