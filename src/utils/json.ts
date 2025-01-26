export const jsonParse = <T = unknown[]>(
  text: string,
  defaultValue: T[] = []
) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};
