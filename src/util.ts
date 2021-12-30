export function pickKeys<T extends object, X extends Array<keyof T>>(
  input: T,
  keys: X,
): Pick<T, X[number]> {
  const x: any = {};
  for (const key of keys) {
    x[key] = input[key];
  }
  return x;
}
