import { readFile } from 'node:fs/promises';
import { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import url, { UrlWithParsedQuery } from 'node:url';
import { logger } from '../../utils/log';
import { getContentType } from '../../utils/server';
import { tryCatch } from '../../utils/try-catch';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

export const getRoute = async (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  const parsedUrl: UrlWithParsedQuery = url.parse(request.url ?? '', true);
  const pathname: string = parsedUrl.pathname ?? '';
  const staticFile: string = pathname === '/' ? 'index.html' : pathname;
  const filePath = path.join(PUBLIC_DIR, staticFile);
  logger.info('GET', filePath);
  const { data } = await tryCatch(readFile(filePath));
  response.writeHead(200, { 'Content-Type': getContentType(filePath) });
  response.end(data);
};
