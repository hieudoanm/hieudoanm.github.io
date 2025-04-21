import { recognize } from 'tesseract.js';

export const base64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const { result } = reader;
      if (!result) {
        resolve('');
      } else if (typeof result === 'string') {
        resolve(result);
      } else {
        const decoder = new TextDecoder('utf-8');
        const text = decoder.decode(result);
        resolve(text);
      }
    };
    reader.onerror = (event) => reject(new Error(event.type));
  });
};

export const ocr = (base64: string): Promise<string> => {
  return new Promise((resolve) => {
    recognize(base64, 'eng')
      .then(({ data }) => {
        resolve(data.text ?? 'No Text');
      })
      .catch((error) => {
        console.error('error', error);
        resolve('Unable to Recognize');
      });
  });
};

export const png2ico = (base64: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = base64;
    image.onload = async () => {
      // Canvas
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      // Context
      const context = canvas.getContext('2d');
      if (!context) return;
      context.drawImage(image, 0, 0, 32, 32);
      // To Blob
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          resolve(URL.createObjectURL(blob));
          canvas.remove();
        },
        'image/vnd.microsoft.icon',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        '-moz-parse-options:format=bmp;bpp=512' as any
      );
    };

    image.onerror = () => {
      reject(new Error('error'));
    };
  });
};

export const svg2png = (base64: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = base64;
    image.onload = async () => {
      // Canvas
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = image.width || 512;
      canvas.height = image.height || 512;
      // Context
      const context = canvas.getContext('2d');
      if (!context) return;
      context.drawImage(image, 0, 0);
      // To Blob
      canvas.toBlob((blob) => {
        if (!blob) return;
        resolve(URL.createObjectURL(blob));
        canvas.remove();
      }, 'image/png');
    };

    image.onerror = () => {
      reject(new Error('error'));
    };
  });
};

export const getMimeType = (base64: string): string | null => {
  const regexp: RegExp = /^data:(.*?);base64,/;
  const match = regexp.exec(base64);
  console.info('match', match);
  return match ? match[1] : null;
};

export const mimeToExtension: Record<string, 'gif' | 'ico' | 'jpg' | 'png'> = {
  'image/gif': 'gif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/x-icon': 'ico',
};

const rustFilter = async (
  mask: 'golden' | 'grayscale',
  image: HTMLImageElement
): Promise<string> => {
  const { golden, grayscale, open_image } = await import(
    '@silvia-odwyer/photon'
  );

  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext('2d');
  if (context === null) return '';
  context.drawImage(image, 0, 0);

  const photonImage = open_image(canvas, context);
  canvas.remove();

  if (mask === 'golden') {
    golden(photonImage);
  } else if (mask === 'grayscale') {
    grayscale(photonImage);
  }

  const base64: string = photonImage.get_base64();
  return base64;
};

export const filter = (
  mask: 'golden' | 'grayscale',
  base64: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = base64;

    image.onload = async () => {
      const base64: string = await rustFilter(mask, image);
      resolve(base64);
    };

    image.onerror = () => {
      reject(new Error('Error'));
    };
  });
};
