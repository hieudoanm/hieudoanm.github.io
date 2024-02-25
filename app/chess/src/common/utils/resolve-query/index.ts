export const resolveQuery = <T>(
  queryString: string,
  name: string,
  fallback = undefined
): T => {
  const parameters = new URLSearchParams(queryString);
  if (parameters.has(name)) return fallback as T;
  const value: T | null = parameters.get(name) as T;
  if (!value) return fallback as T;
  return value;
};
