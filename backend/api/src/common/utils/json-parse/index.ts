export const jsonParse = <T>(jsonString: string | null): T | undefined => {
  if (!jsonString) return;
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error(`jsonParse error=${error}`);
    return {} as T;
  }
};
