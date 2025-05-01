import { existsSync } from 'fs';
import { IncomingMessage, ServerResponse } from 'node:http';
import url, { UrlWithParsedQuery } from 'node:url';
import { download } from '../../../../../../services/youtube/youtube.service';
import { logger } from '../../../../../../utils/log';
import { getRequestBody } from '../../../../../../utils/server';
import { tryCatch } from '../../../../../../utils/try-catch';

export const postRoute = async (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  const { data: requestBody = {} } = await tryCatch(getRequestBody(request));
  const { url: urlString = '' } = requestBody as { url: string };
  logger.info(`✅ URL =${urlString}`);

  const parsedUrl: UrlWithParsedQuery = url.parse(urlString ?? '', true);
  const parsedUrlQuery = parsedUrl.query;
  const videoId: string = parsedUrlQuery.v?.toString() ?? '';
  logger.info(`✅ VideoID=${videoId}`);

  const videoFilePath = `${process.cwd()}/downloads/${videoId}.mp4`;
  const exists: boolean = existsSync(videoFilePath);

  if (!exists) {
    logger.info('⏳ Download from YouTube started');
    const { data } = await tryCatch(download(urlString));
    logger.info('✅ Download from YouTube completed', data);
  }

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ id: videoId }));
};
