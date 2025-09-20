export function isObejct(value: unknown): value is object {
  return value instanceof Object
}

export function isEmpty<T>(value: Readonly<Array<T>>) {
  return value.length === 0
}
