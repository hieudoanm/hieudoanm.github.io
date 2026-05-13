export const getTrends = async (): Promise<Record<string, string[]>> => {
  try {
    const url: string = `https://trends.google.com/trends/hottrends/visualize/internal/data`;
    const response = await fetch(url);
    const data: Record<string, string[]> = await response.json();
    return data;
  } catch (error) {
    console.error(`getTrends error=${error}`);
    return {};
  }
};
