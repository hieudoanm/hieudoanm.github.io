import puppeteer, { Browser } from 'puppeteer';
import { logger } from '../../utils/log';

export const CHROMIUM_EXECUTABLE_PATH = process.env.CHROMIUM_EXECUTABLE_PATH;

export const getImages = async (
  instagramURL: string
): Promise<{ images: string[] }> => {
  // Open Page
  logger.info('get.images');
  const browser: Browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    browser: !CHROMIUM_EXECUTABLE_PATH ? 'firefox' : undefined,
    executablePath: CHROMIUM_EXECUTABLE_PATH,
    headless: true,
  });
  logger.info('puppeteer.launch');
  const page = await browser.newPage();
  logger.info('browser.newPage');
  const [url] = instagramURL.split('?');
  const embedURL: string = url.at(-1) === '/' ? `${url}embed` : `${url}/embed`;
  logger.info('embedURL', embedURL);
  await page.goto(embedURL, { waitUntil: 'networkidle2', timeout: 60000 });
  logger.info('page.goto');
  // Check Next Button
  let buttonExists: boolean =
    (await page.$('button[aria-label="Next"]')) !== null;
  logger.info('button.exists', buttonExists);
  while (buttonExists) {
    await page.waitForSelector('[aria-label="Next"]', { visible: true });
    await page.click('[aria-label="Next"]');
    buttonExists = (await page.$('button[aria-label="Next"]')) !== null;
    logger.info('button.exists', buttonExists);
  }
  logger.info('button.exists.complete');
  // Get all Images
  const images = await page.evaluate(() => {
    const imageElements: NodeListOf<HTMLImageElement> =
      document.querySelectorAll('.Content.EmbedFrame img');
    const images: string[] = [];
    for (const imageElement of imageElements) {
      images.push(imageElement.src);
    }
    return images;
  });
  logger.info('images', images);
  await browser.close();
  return { images };
};

export const imageUrlToBase64 = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const contentType = response.headers.get('content-type');
    const blob: Blob = await response.blob();
    const buffer: ArrayBuffer = await blob.arrayBuffer();
    const base64: string = Buffer.from(buffer).toString('base64');
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    logger.error('Error converting image:', error);
    return null;
  }
};
