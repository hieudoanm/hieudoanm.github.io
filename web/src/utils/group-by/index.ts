export const groupBy = <T extends Record<string, string>>(
  array: T[],
  key: string
) => {
  const values: string[] = array.map((item) => item[key] || '');
  const uniqueValues = [...new Set(values)];
  const data: Record<string, T[]> = {};
  for (const uniqueValue of uniqueValues) {
    data[uniqueValue] = array.filter((item) => item[key] === uniqueValue);
  }
  return data;
};
