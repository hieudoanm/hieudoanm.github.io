import Converter from 'openapi-to-postmanv2';
import { logger } from '../../utils/log';

export const convert = async (openapi: string) => {
  return new Promise((resolve, reject) => {
    Converter.convert(
      { type: 'string', data: openapi },
      {},
      (error, conversionResult) => {
        logger.error(error);
        logger.info(conversionResult);
        if (!conversionResult.result) {
          reject(new Error(conversionResult.reason));
        } else {
          resolve(conversionResult);
        }
      }
    );
  });
};
