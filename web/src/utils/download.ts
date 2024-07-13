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
