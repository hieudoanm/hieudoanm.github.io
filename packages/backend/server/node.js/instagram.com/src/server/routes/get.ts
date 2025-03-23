import { readFile } from 'node:fs/promises';
import { IncomingMessage, ServerResponse } from 'node:http';
import { join } from 'node:path';
import { logger } from '../../utils/log';
import { getContentType } from '../../utils/server';
import { tryCatch } from '../../utils/try-catch';

const PUBLIC_DIR = join(process.cwd(), 'public');

export const getRoute = async (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  const { url = '' } = request;
  const [path] = url.split('?');
  const staticFile: string = path === '/' ? 'index.html' : path;
  const filePath = join(PUBLIC_DIR, staticFile);
  logger.info(`getRoute filePath=${filePath}`);
  const { data } = await tryCatch(readFile(filePath));
  response.writeHead(200, { 'Content-Type': getContentType(filePath) });
  response.end(data);
};
