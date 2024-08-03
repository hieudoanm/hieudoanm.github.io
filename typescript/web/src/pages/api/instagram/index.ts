import { logger } from '@web/log';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { HTMLElement, parse } from 'node-html-parser';

export type RequestBody = { url: string };

export type ResponseData = { images: string[] };

const getImage = async (link: string): Promise<string> => {
  try {
    const config: AxiosRequestConfig = { responseType: 'arraybuffer' };
    const response = await axios.get(link, config);
    const { data } = response;
    return Buffer.from(data, 'binary').toString('base64');
  } catch (error) {
    logger.error((error as AxiosError).message);
    return '';
  }
};

const getImages = (links: string[]): Promise<string[]> => {
  return new Promise((resolve) => {
    Promise.all(links.map((link: string) => getImage(link))).then(
      (images: string[]) => {
        const filteredImages: string[] = images.filter(
          (image: string) => image !== ''
        );
        resolve(filteredImages);
      }
    );
  });
};

const getLinks = async (url: string) => {
  if (url.endsWith('/')) url = url.slice(0, -1);
  const embedUrl: string = encodeURI(`${url}/embed/captioned`);
  logger.info('embedUrl', embedUrl);
  const headers = { 'User-Agent': 'PostmanRuntime/7.37.0' };
  const response = await axios.get<string>(embedUrl, { headers });
  const { data } = response;
  const root: HTMLElement = parse(data);
  const images: HTMLElement[] = root.querySelectorAll('.Content img');
  const links: string[] = images
    .map((image) => image.getAttribute('src') ?? '')
    .filter((link) => link !== '');
  return links;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === 'POST') {
    const body: RequestBody = req.body;
    const url: string = body.url;
    logger.info('url', url);
    const links: string[] = await getLinks(url);
    logger.info('links', links);
    const images: string[] = await getImages(links);
    return res.status(200).json({ images });
  }
  return res.status(405);
};

export default handler;
