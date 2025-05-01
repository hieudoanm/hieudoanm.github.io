import ytdl from '@distube/ytdl-core';
import { createWriteStream } from 'node:fs';

export const download = (
  urlString: string
): Promise<{ id: string | null; filePath: string }> => {
  if (!ytdl.validateURL(urlString)) {
    return Promise.resolve({ id: '', filePath: '' });
  }

  const url = new URL(urlString);
  // Get query parameters
  const urlSearchParams = new URLSearchParams(url.search);
  // https://www.youtube.com/watch?v=dZs_cLHfnNA&list=RDdZs_cLHfnNA&start_radio=1&ab_channel=HYBELABELS
  const id: string | null = urlSearchParams.get('v');

  const videoStream = ytdl(urlString, { quality: 'highestvideo' });
  const filePath = `${process.cwd()}/downloads/${id}.mp4`;

  const writeStream = createWriteStream(filePath);

  videoStream.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => {
      console.info('Download complete:', filePath);
      resolve({ id, filePath });
    });
    writeStream.on('error', reject);
  });
};
