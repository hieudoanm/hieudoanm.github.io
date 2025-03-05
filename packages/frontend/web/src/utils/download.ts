const download = ({
  content,
  format,
  filename,
}: {
  content: string;
  format: string;
  filename: string;
}) => {
  const encodedUri: string = encodeURI(content);
  const link: HTMLAnchorElement = document.createElement('a');
  link.setAttribute('href', encodedUri);
  const date: string = new Date().toISOString().split('T')[0];
  const filenameWithExtension: string = `${filename}-${date}.${format}`;
  link.setAttribute('download', filenameWithExtension);
  document.body.append(link); // Required for FF
  link.click(); // This will download the data file.
  link.remove();
};

export const downloadText = ({
  content,
  format,
  filename,
}: {
  content: string;
  format: string;
  filename: string;
}) => {
  const textContent: string = `data:text/${format};charset=utf-8,${content}`;
  download({ content: textContent, format, filename });
};

export const downloadImage = ({
  content,
  format,
  filename,
}: {
  content: string;
  format: 'jpg' | 'png' | 'ico';
  filename: string;
}) => {
  download({ content, format, filename });
};
