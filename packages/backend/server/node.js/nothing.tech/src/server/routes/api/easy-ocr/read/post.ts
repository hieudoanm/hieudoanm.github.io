import { IncomingMessage, ServerResponse } from 'node:http';
import { read } from '../../../../../services/easy-ocr/easy-ocr.service';
import { logger } from '../../../../../utils/log';
import { getRequestBody } from '../../../../../utils/server';
import { tryCatch } from '../../../../../utils/try-catch';

export const postRoute = async (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  const { data = {} } = await tryCatch(getRequestBody(request));
  logger.info(data, 'request.data');
  const { data: result, error } = await tryCatch(read('uploads/image1.png'));
  if (error) {
    logger.error(error, 'error');
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error, data: null }));
    return;
  }
  logger.info(result, 'response.data');
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ error: null, data: result }));
};
