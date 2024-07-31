// import axios from 'axios';
// import fs from 'node:fs';
// import { Stream } from 'node:stream';

// export const serverDownload = async (url: string, filePath: string) => {
//   const { data } = await axios.get<Stream>(url, { responseType: 'stream' });

//   if (!data) {
//     throw new Error('Invalid data');
//   }

//   const writer = fs.createWriteStream(filePath);
//   data.pipe(writer);

//   return new Promise((resolve, reject) => {
//     writer.on('finish', resolve);
//     writer.on('error', reject);
//   });
// };

export const download = (content: string, format: string, filename: string) => {
  const fileContent: string = `data:text/${format};charset=utf-8,${content}`;
  const encodedUri: string = encodeURI(fileContent);
  const link: HTMLAnchorElement = document.createElement('a');
  link.setAttribute('href', encodedUri);
  const date: string = new Date().toISOString().split('T')[0];
  link.setAttribute('download', `${filename}-${date}.${format}`);
  document.body.append(link); // Required for FF
  link.click(); // This will download the data file.
  link.remove();
};

export const downloadImage = (
  content: string,
  format: string,
  filename: string
) => {
  const encodedUri: string = encodeURI(content);
  const link: HTMLAnchorElement = document.createElement('a');
  link.setAttribute('href', encodedUri);
  const date: string = new Date().toISOString().split('T')[0];
  link.setAttribute('download', `${filename}-${date}.${format}`);
  document.body.append(link); // Required for FF
  link.click(); // This will download the data file.
  link.remove();
};
