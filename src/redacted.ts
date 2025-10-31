/**
 * Extracts the value type from a Redacted type.
 */
export type Value<T> = T extends Redacted<infer A> ? A : never;

/**
 * A type that represents a redacted value, hiding sensitive information from accidental exposure.
 */
export class Redacted<A> {
  readonly [Symbol.toStringTag] = "Redacted";

  private readonly _value: A;

  private constructor(value: A) {
    this._value = value;
  }

  /**
   * Creates a new Redacted value.
   */
  static make<A>(value: A): Redacted<A> {
    return new Redacted(value);
  }

  /**
   * Extracts the value from a Redacted instance.
   */
  static value<A>(self: Redacted<A>): A {
    return self._value;
  }

  /**
   * Returns the redacted JSON representation.
   */
  toJSON(): string {
    return "<redacted>";
  }

  /**
   * Returns the redacted string representation.
   */
  toString(): string {
    return "<redacted>";
  }
}
