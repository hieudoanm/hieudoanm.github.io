import { createReadStream, existsSync, statSync } from 'node:fs';
import { IncomingMessage, ServerResponse } from 'node:http';
import { logger } from '../../../../utils/log';
import { getRequestBody } from '../../../../utils/server';
import { tryCatch } from '../../../../utils/try-catch';

const humanFileSize = (bytes: number, si = false, dp = 1) => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + ' ' + units[u];
};

export const postRoute = async (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  const { data: requestBody = {} } = await tryCatch(getRequestBody(request));
  const { id: videoId } = requestBody as { id: string };

  logger.info(`✅ VideoID=${videoId}`);
  const videoFilePath = `${process.cwd()}/downloads/${videoId}.mp4`;
  const exists: boolean = existsSync(videoFilePath);

  if (!exists) {
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('Error Download Video');
  }

  const stats = statSync(videoFilePath);
  const totalSize = stats.size;
  logger.info(`✅ Total Size: ${totalSize}`);
  let bytesRead = 0;

  response.writeHead(200, {
    'Content-Type': 'video/mp4',
    'Content-Disposition': `attachment; filename="${videoId}.mp4"`,
    'Content-Length': totalSize,
  });

  // Create stream and pipe to response
  const fileStream = createReadStream(videoFilePath);
  fileStream.pipe(response);

  fileStream.on('data', (chunk) => {
    bytesRead += chunk.length;
    const progress = ((bytesRead / totalSize) * 100).toFixed(2);
    logger.info(`⏳ Progress: ${progress}%`);
  });

  fileStream.on('end', () => {
    logger.info(`✅ Download ${humanFileSize(totalSize)} complete!`);
  });

  fileStream.on('error', (err) => {
    logger.error('❌ File streaming error:', err);
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('Error streaming video');
  });
};
