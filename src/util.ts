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

export async function hash(algorithm: string, input: string): Promise<string> {
  const hashBuf = await crypto.subtle.digest(
    algorithm,
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
