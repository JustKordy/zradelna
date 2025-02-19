export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalize(s: string) {
  if (s.length === 0) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
