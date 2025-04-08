/* eslint-disable @typescript-eslint/no-explicit-any */
import { downloadImage } from '~/utils/download';

import { createSignal } from 'solid-js';

const PNG2ICOPage = () => {
  const [{ file = null, imageSrc = '', loading = false }, setState] =
    createSignal<{
      file: File | null;
      imageSrc: string;
      loading: boolean;
    }>({
      file: null,
      imageSrc: '',
      loading: false,
    });

  return (
    <div class="container mx-auto max-w-sm p-8">
      <div class="flex flex-col gap-y-4">
        <label
          htmlFor="upload-image"
          class="cursor-pointer border border-dotted px-4 py-2 text-center">
          <input
            type="file"
            name="image"
            accept="image/png"
            id="upload-image"
            class="hidden"
            onChange={(event) => {
              const files = event.target.files;
              if (files === null) return;
              const file = files[0];
              const imageSrc = URL.createObjectURL(file);
              setState((previous) => ({ ...previous, file, imageSrc }));
            }}
          />
          <span>Upload File</span>
        </label>
        <div class="aspect-square w-full border border-gray-300">
          <div class="h-full w-full">
            <div class="h-full w-full bg-contain bg-center bg-no-repeat">
              {imageSrc && <img src={imageSrc} alt="icon" class="w-full" />}
            </div>
          </div>
        </div>
        {imageSrc && (
          <button
            type="button"
            class="w-full cursor-pointer bg-gray-900 px-4 py-2 text-gray-100"
            disabled={loading}
            onClick={async () => {
              if (!file) return;
              setState((previous) => ({ ...previous, loading: true }));
              const img = new Image();
              img.src = URL.createObjectURL(file);
              await img.decode(); // Wait for image to load
              const canvas = document.createElement('canvas');
              const width = 32;
              const height = 32;
              canvas.width = width;
              canvas.height = height;

              const context = canvas.getContext('2d');
              if (!context) return;
              context.drawImage(img, 0, 0, width, height);

              canvas.toBlob(
                (blob) => {
                  if (!blob) return;
                  downloadImage({
                    content: URL.createObjectURL(blob),
                    format: 'ico',
                    filename: 'favicon',
                  });
                  setState((previous) => ({ ...previous, loading: false }));
                },
                'image/vnd.microsoft.icon',
                '-moz-parse-options:format=bmp;bpp=32' as any
              );
            }}>
            {loading ? 'Downloading' : 'Download'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PNG2ICOPage;
