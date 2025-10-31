import { describe, expectTypeOf, test } from "vitest";

import { Redacted, Value } from "./redacted.js";

describe("Redacted type tests", () => {
  test("Value<T> extracts string type", () => {
    type Test = Value<Redacted<string>>;
    expectTypeOf<Test>().toBeString();
  });

  test("Value<T> extracts number type", () => {
    type Test = Value<Redacted<number>>;
    expectTypeOf<Test>().toBeNumber();
  });

  test("Value<T> extracts boolean type", () => {
    type Test = Value<Redacted<boolean>>;
    expectTypeOf<Test>().toBeBoolean();
  });

  test("Value<T> extracts null type", () => {
    type Test = Value<Redacted<null>>;
    expectTypeOf<Test>().toBeNull();
  });

  test("Value<T> extracts undefined type", () => {
    type Test = Value<Redacted<undefined>>;
    expectTypeOf<Test>().toBeUndefined();
  });

  test("Value<T> extracts object type", () => {
    type Test = Value<Redacted<{ key: string }>>;
    expectTypeOf<Test>().toEqualTypeOf<{ key: string }>();
  });

  test("Value<T> extracts array type", () => {
    type Test = Value<Redacted<string[]>>;
    expectTypeOf<Test>().toEqualTypeOf<string[]>();
  });

  test("Value<T> extracts union type", () => {
    type Test = Value<Redacted<number | string>>;
    expectTypeOf<Test>().toEqualTypeOf<number | string>();
  });

  test("make() returns Redacted<T>", () => {
    const result = Redacted.make("test");
    expectTypeOf(result).toEqualTypeOf<Redacted<string>>();
  });

  test("value() extracts correct type", () => {
    const redacted = Redacted.make(42);
    const result = Redacted.value(redacted);
    expectTypeOf(result).toBeNumber();
  });
});
