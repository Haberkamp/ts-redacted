import { describe, expect, it } from "vitest";

import { example } from "./index.js";

describe("example", () => {
  it("returns example string", () => {
    expect(example()).toBe("example");
  });
});
