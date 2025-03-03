import { createServer } from 'node:http';
import puppeteer, { Browser, SupportedBrowser } from 'puppeteer';

const FIREFOX_EXECUTABLE_PATH = process.env.FIREFOX_EXECUTABLE_PATH;

export const getImages = async (
  instagramURL: string,
  {
    executablePath,
    supportedBrowser,
  }: { executablePath?: string; supportedBrowser?: SupportedBrowser } = {
    executablePath: undefined,
    supportedBrowser: undefined,
  }
): Promise<{ images: string[] }> => {
  // Open Page
  console.info('get.images');
  const browser: Browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    browser: supportedBrowser,
    executablePath,
    headless: true,
  });
  console.info('puppeteer.launch');
  const page = await browser.newPage();
  console.info('browser.newPage');
  const [url] = instagramURL.split('?');
  const embedURL: string = url.at(-1) === '/' ? `${url}embed` : `${url}/embed`;
  console.info('embedURL', embedURL);
  await page.goto(embedURL, { waitUntil: 'networkidle2', timeout: 60000 });
  console.info('page.goto');
  // Check Next Button
  let buttonExists: boolean =
    (await page.$('button[aria-label="Next"]')) !== null;
  console.info('button.exists', buttonExists);
  while (buttonExists) {
    await page.waitForSelector('[aria-label="Next"]', { visible: true });
    await page.click('[aria-label="Next"]');
    buttonExists = (await page.$('button[aria-label="Next"]')) !== null;
    console.info('button.exists', buttonExists);
  }
  console.info('button.exists.complete');
  // Get all Images
  const images = await page.evaluate(() => {
    const imageElements: NodeListOf<HTMLImageElement> =
      document.querySelectorAll('.Content.EmbedFrame img');
    const images: string[] = [];
    for (const imageElement of imageElements) {
      images.push(imageElement.src);
    }
    console.log();
    return images;
  });
  console.info('images', images);
  await browser.close();
  return { images };
};

const imageUrlToBase64 = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const contentType = response.headers.get('content-type');
    const blob: Blob = await response.blob();
    const buffer: ArrayBuffer = await blob.arrayBuffer();
    const base64: string = Buffer.from(buffer).toString('base64');
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error('Error converting image:', error);
    return null;
  }
};

const server = createServer((request, response) => {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === 'POST' && request.url === '/download') {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk.toString();
    });

    request.on('end', async () => {
      try {
        console.log('Received Data:', body);
        const jsonData = JSON.parse(body); // Parse JSON
        console.log('Received JSON:', jsonData);
        const { url = '' } = jsonData;

        const { images: imageUrls = [] } = await getImages(url, {
          supportedBrowser: 'firefox',
          executablePath: FIREFOX_EXECUTABLE_PATH,
        });
        console.log('image.urls', imageUrls);

        const images = [];
        for (const imageUrl of imageUrls) {
          const image = await imageUrlToBase64(imageUrl);
          images.push(image);
        }
        console.log('images', images);

        response.writeHead(200, {
          'Content-Type': 'application/json',
        });
        response.end(JSON.stringify({ error: null, images }));
      } catch (error) {
        console.error(error);
        response.writeHead(400, {
          'Content-Type': 'application/json',
        });
        response.end(JSON.stringify({ error, images: [] }));
      }
    });
  } else {
    response.writeHead(404, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT: number = parseInt(process.env.PORT ?? '10000') ?? 10000;

// starts a simple http server locally on port 3000
server.listen(PORT, '0.0.0.0', () => {
  console.info(`FIREFOX_EXECUTABLE_PATH=${FIREFOX_EXECUTABLE_PATH}`);
  console.info(`Listening on 0.0.0.0:${PORT}`);
});
