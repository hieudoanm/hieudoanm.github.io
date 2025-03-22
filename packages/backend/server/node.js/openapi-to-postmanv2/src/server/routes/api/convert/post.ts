import { IncomingMessage, ServerResponse } from 'node:http';
import { convert } from '../../../../services/openapi/openapi.service';
import {
  CONTENT_TYPE_APPLICATION_JSON,
  getRequestBody,
} from '../../../../utils/server';
import { tryCatch } from '../../../../utils/try-catch';

export const postRoute = async (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  const { data = {} } = await tryCatch(getRequestBody(request));
  const { openapi = '' } = data as { openapi: string };
  const { data: responseData } = await tryCatch(convert(openapi));
  response.writeHead(200, { 'Content-Type': CONTENT_TYPE_APPLICATION_JSON });
  response.end(JSON.stringify({ error: null, data: responseData }));
};
