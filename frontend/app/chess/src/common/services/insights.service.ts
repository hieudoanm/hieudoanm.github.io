import { BASE_API } from '@chess/common/environments';
import { logger } from '@chess/common/libs/logger';
import { Insights } from '@chess/types/chess';
import axios from 'axios';

export const getInsights = async (username: string): Promise<Insights> => {
  try {
    const url = `${BASE_API}/chess/players/${username}/insights`;
    const { data: insights } = await axios.get<Insights>(url);
    return insights;
  } catch (error) {
    logger.error(error);
    return {} as Insights;
  }
};
