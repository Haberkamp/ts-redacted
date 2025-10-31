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
});
