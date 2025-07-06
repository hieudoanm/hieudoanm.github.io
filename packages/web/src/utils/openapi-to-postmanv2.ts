import Converter, { ConvertResult } from 'openapi-to-postmanv2';
import { logger } from './log';

export const convert = async (openapi: string): Promise<ConvertResult> => {
  return new Promise((resolve, reject) => {
    Converter.convert(
      { type: 'string', data: openapi },
      {},
      (error, conversionResult) => {
        if (!conversionResult.result) {
          logger.error(error);
          reject(new Error(conversionResult.reason));
        } else {
          logger.info(conversionResult);
          resolve(conversionResult);
        }
      }
    );
  });
};
