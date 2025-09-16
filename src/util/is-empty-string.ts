export function normalizeString(value?: string | null): string | undefined {
  if (value == null || value.trim() === "") {
    return undefined;
  }
  return value;
}
