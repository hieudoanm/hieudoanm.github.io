import { logger } from '@web/log';

export const jsonParse = (text: string, defaultValue: any = []) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    logger.error(error);
    return defaultValue;
  }
};
