import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { BASE_URL } from '@chess/common/environments/environments';
import { logger } from '@chess/common/libs/logger';
import axios from 'axios';

export const getInsights = async (username: string): Promise<Insights> => {
  try {
    const url = `${BASE_URL}/api/chess/players/${username}/insights`;
    const { data: insights } = await axios.get<Insights>(url);
    return insights;
  } catch (error) {
    logger.error(error);
    return {} as Insights;
  }
};
