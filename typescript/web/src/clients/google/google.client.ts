import { logger } from '@web/log';

export const getTrends = async (): Promise<Record<string, string[]>> => {
  try {
    const url: string = `https://trends.google.com/trends/hottrends/visualize/internal/data`;
    const response: Response = await fetch(url);
    return await response.json();
  } catch (error) {
    logger.error(`getTrends error=${error}`);
    return {};
  }
};
