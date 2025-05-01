import { IncomingMessage, ServerResponse } from 'node:http';
import {
  getImages,
  imageUrlToBase64,
} from '../../../../../services/instagram/instagram.service';
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
  logger.info('data', data);
  const { url = '' } = data as { url: string };
  const { data: imagesData, error: imagesError } = await tryCatch(
    getImages(url)
  );
  if (imagesError) logger.error(imagesError.message);
  const { images: imageUrls = [] } = imagesData ?? { images: [] };
  logger.info('image.urls', imageUrls);
  const images = [];
  for (const imageUrl of imageUrls) {
    const { data: image, error: imageError } = await tryCatch(
      imageUrlToBase64(imageUrl)
    );
    if (imageError) logger.error(imageError.message);
    if (image) images.push(image);
  }
  logger.info('images', images);
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ error: null, images }));
};
