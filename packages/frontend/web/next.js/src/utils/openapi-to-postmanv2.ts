import Converter, { ConvertResult } from 'openapi-to-postmanv2';

export const convert = async (openapi: string): Promise<ConvertResult> => {
  return new Promise((resolve, reject) => {
    Converter.convert(
      { type: 'string', data: openapi },
      {},
      (error, conversionResult) => {
        console.error(error);
        console.info(conversionResult);
        if (!conversionResult.result) {
          reject(new Error(conversionResult.reason));
        } else {
          resolve(conversionResult);
        }
      }
    );
  });
};
