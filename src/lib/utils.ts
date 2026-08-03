// Lightweight clsx re-implementation so we don't need to install the package.
// Supports string, number, boolean, null, undefined and conditional objects.
type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: unknown };

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string' || typeof input === 'number') {
      out.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else if (typeof input === 'object') {
      for (const key of Object.keys(input)) {
        if ((input as Record<string, unknown>)[key]) out.push(key);
      }
    }
  }
  return out.join(' ');
}