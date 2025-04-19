import { useWindowSize } from '@web/hooks/window/use-size';
import { downloadImage } from '@web/utils/download';
import { copyToClipboard } from '@web/utils/navigator';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Split from 'react-split';
import { recognize } from 'tesseract.js';

enum Func {
  CONVERT_PNG_TO_ICO = 'PNG to ICO',
  CONVERT_SVG_TO_PNG = 'SVG to PNG',
  FILTER_GOLDEN = 'Golden',
  FILTER_GRAYSCALE = 'Grayscale',
  BASE64 = 'Base64',
  OCR = 'OCR',
}

const getMimeType = (base64: string): string | null => {
  const regexp: RegExp = /^data:(.*?);base64,/;
  const match = regexp.exec(base64);
  console.info('match', match);
  return match ? match[1] : null;
};

const mimeToExtension: Record<string, 'gif' | 'ico' | 'jpg' | 'png'> = {
  'image/gif': 'gif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/x-icon': 'ico',
};

const base64 = (file: File): Promise<string> => {
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

const png2ico = (base64: string): Promise<string> => {
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

const svg2png = (base64: string): Promise<string> => {
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

const filter = async (
  layer: 'golden' | 'grayscale',
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

  if (layer === 'golden') {
    golden(photonImage);
  } else if (layer === 'grayscale') {
    grayscale(photonImage);
  }

  const base64: string = photonImage.get_base64();
  return base64;
};

const filterBase64 = (
  mask: 'golden' | 'grayscale',
  base64: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = base64;

    image.onload = async () => {
      const base64: string = await filter(mask, image);
      resolve(base64);
    };

    image.onerror = () => {
      reject(new Error('Error'));
    };
  });
};

const ocr = (file: File): Promise<string> => {
  const imageURL = URL.createObjectURL(file);
  return new Promise((resolve) => {
    recognize(imageURL, 'eng')
      .then(({ data }) => {
        resolve(data.text ?? 'No Text');
      })
      .catch((error) => {
        console.error('error', error);
        resolve('Unable to Recognize');
      });
  });
};

const convert = async ({
  func,
  file,
}: {
  func: Func;
  file: File;
}): Promise<string> => {
  if (func === Func.BASE64) {
    return await base64(file);
  } else if (func === Func.OCR) {
    return await ocr(file);
  } else if (func === Func.FILTER_GOLDEN) {
    const base64String: string = await base64(file);
    return await filterBase64('golden', base64String);
  } else if (func === Func.FILTER_GRAYSCALE) {
    const base64String: string = await base64(file);
    return await filterBase64('grayscale', base64String);
  } else if (func === Func.CONVERT_PNG_TO_ICO) {
    const base64String: string = await base64(file);
    return await png2ico(base64String);
  } else if (func === Func.CONVERT_SVG_TO_PNG) {
    const base64String: string = await base64(file);
    return await svg2png(base64String);
  }
  return '';
};

const ImagesPage: NextPage = () => {
  const { width } = useWindowSize();
  const direction = width > 768 ? 'horizontal' : 'vertical';
  console.info('direction & width', { direction, width });

  const [
    {
      func = Func.BASE64,
      loading = false,
      inputFile = null,
      inputString = '',
      output = '',
    },
    setState,
  ] = useState<{
    func: Func;
    loading: boolean;
    inputFile: File | null;
    inputString: string;
    output: string;
  }>({
    func: Func.BASE64,
    loading: false,
    inputFile: null,
    inputString: '',
    output: '',
  });

  useEffect(() => {
    const gutters = document.getElementsByClassName('gutter');
    const gutter = gutters.item(0);
    if (!gutter) return;
    if (direction === 'vertical') {
      gutter.classList.remove('!h-full', 'w-1');
      gutter.classList.add('!w-full', 'h-1');
    } else if (direction === 'horizontal') {
      gutter.classList.remove('!w-full', 'h-1');
      gutter.classList.add('!h-full', 'w-1');
    }
  }, [direction]);

  return (
    <div className="h-screen w-screen">
      <Split
        expandToMin={false}
        sizes={[50, 50]}
        minSize={150} // pixel
        gutter={() => {
          const gutter = document.createElement('div');
          gutter.className = 'gutter bg-gray-300 hover:cursor-pointer order-2';
          return gutter;
        }}
        gutterAlign="center"
        gutterSize={4}
        direction={direction}
        className="flex h-full flex-col md:flex-row">
        <div
          className={`order-3 flex h-full flex-col gap-y-1 bg-gray-100 p-2 text-gray-900 md:order-1 md:gap-y-2 md:p-4 ${width > 768 ? '!h-full' : '!w-full'}`}>
          <p className="font-semibold">Image</p>
          <div
            className="h-full w-full grow overflow-hidden rounded border border-dashed border-gray-500 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${inputString})` }}></div>
          <label
            htmlFor="upload-image"
            className="cursor-pointer rounded border border-dashed border-gray-500 py-2 text-center">
            <input
              type="file"
              name="image"
              accept="image/*"
              id="upload-image"
              className="hidden"
              onChange={async (event) => {
                const files = event.target.files;
                if (files === null) return;
                const file = files.item(0);
                if (!file) return;
                const newInputString: string = await base64(file);
                setState((previous) => ({
                  ...previous,
                  loading: true,
                  inputFile: file,
                  inputString: newInputString,
                }));
                const newOutput: string = await convert({ func, file });
                setState((previous) => ({
                  ...previous,
                  loading: false,
                  output: newOutput,
                }));
              }}
            />
            <span>Upload File</span>
          </label>
        </div>
        <div
          className={`order-1 flex h-full flex-col gap-y-1 bg-gray-900 p-2 text-gray-100 md:order-3 md:gap-y-2 md:p-4 ${width > 768 ? '!h-full' : '!w-full'}`}>
          <select
            id="func"
            name="func"
            className="w-full appearance-none font-semibold"
            value={func}
            onChange={async (event) => {
              const newFunc: Func = event.target.value as Func;
              setState((previous) => ({
                ...previous,
                func: newFunc,
              }));
              if (inputFile) {
                setState((previous) => ({
                  ...previous,
                  loading: true,
                }));
                const newOutput: string = await convert({
                  func: newFunc,
                  file: inputFile,
                });
                setState((previous) => ({
                  ...previous,
                  loading: false,
                  output: newOutput,
                }));
              }
            }}>
            <optgroup label="Convert">
              <option value={Func.CONVERT_PNG_TO_ICO}>
                {Func.CONVERT_PNG_TO_ICO}
              </option>
              <option value={Func.CONVERT_SVG_TO_PNG}>
                {Func.CONVERT_SVG_TO_PNG}
              </option>
            </optgroup>
            <optgroup label="Filter">
              <option value={Func.FILTER_GOLDEN}>{Func.FILTER_GOLDEN}</option>
              <option value={Func.FILTER_GRAYSCALE}>
                {Func.FILTER_GRAYSCALE}
              </option>
            </optgroup>
            <optgroup label="Text">
              <option value={Func.BASE64}>{Func.BASE64}</option>
              <option value={Func.OCR}>{Func.OCR}</option>
            </optgroup>
          </select>
          {func === Func.CONVERT_PNG_TO_ICO ||
          func === Func.CONVERT_SVG_TO_PNG ||
          func === Func.FILTER_GOLDEN ||
          func === Func.FILTER_GRAYSCALE ? (
            <div className="w-full grow overflow-auto">
              {!loading && (
                <div
                  className="h-full w-full grow overflow-hidden rounded bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${output})` }}
                />
              )}
            </div>
          ) : (
            <textarea
              id="output"
              name="output"
              placeholder="Output"
              className="w-full grow rounded border border-dashed border-gray-700 p-2 focus:outline-none"
              value={loading ? 'Loading' : (output ?? 'No File Yet')}
              readOnly
            />
          )}
          <button
            type="button"
            className="cursor-pointer rounded bg-red-500 py-2 font-semibold text-gray-100"
            onClick={() => {
              if (
                func === Func.CONVERT_PNG_TO_ICO ||
                func === Func.CONVERT_SVG_TO_PNG ||
                func === Func.FILTER_GOLDEN ||
                func === Func.FILTER_GRAYSCALE
              ) {
                const mime: string = getMimeType(output) ?? '';
                const format: 'jpg' | 'png' | 'ico' | 'gif' =
                  mimeToExtension[mime];
                console.info('format', format);
                downloadImage({
                  format,
                  content: output,
                  filename: 'image',
                });
              } else {
                copyToClipboard(output);
              }
            }}>
            {func === Func.CONVERT_PNG_TO_ICO ||
            func === Func.CONVERT_SVG_TO_PNG ||
            func === Func.FILTER_GOLDEN ||
            func === Func.FILTER_GRAYSCALE
              ? 'Download'
              : 'Copy'}
          </button>
        </div>
      </Split>
    </div>
  );
};

export default ImagesPage;
