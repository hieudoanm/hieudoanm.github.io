export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const loadImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = URL.createObjectURL(file);
  });

export const processCanvas = (
  file: File,
  cb: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvas: HTMLCanvasElement
  ) => void,
  mimeType = 'image/png',
  filename?: string
): Promise<void> =>
  loadImage(file).then((img) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    cb(ctx, img, canvas);
    return new Promise<void>((res) => {
      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, filename ?? file.name);
        res();
      }, mimeType);
    });
  });
