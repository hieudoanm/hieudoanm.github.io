import { NextPage } from 'next';
import film from '@nothing/assets/film.jpg';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const FilmifyPage: NextPage = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [
    { base64 = film.src, aspectRatio = '3 / 2', loading = false },
    setState,
  ] = useState<{ base64: string; aspectRatio: string; loading: boolean }>({
    base64: film.src,
    aspectRatio: '3 / 2',
    loading: false,
  });

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col gap-y-4">
        <label
          htmlFor="upload-image"
          className="cursor-pointer border border-dotted px-4 py-2 text-center">
          <input
            type="file"
            name="image"
            accept="image/*"
            id="upload-image"
            className="hidden"
            onChange={(event) => {
              const files = event.target.files;
              if (files === null) return;
              const file = files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                setState((previous) => ({
                  ...previous,
                  base64: reader.result?.toString() ?? film.src,
                }));
              };
              reader.onerror = (error) => {
                console.error('Error converting file to Base64:', error);
              };
            }}
          />
          <span>Upload File</span>
        </label>
        <button
          className="w-full"
          style={{ aspectRatio }}
          onClick={() => {
            setState((previous) => ({
              ...previous,
              aspectRatio: previous.aspectRatio === '3 / 2' ? '2 / 3' : '3 / 2',
            }));
          }}>
          <div ref={imageRef} className="h-full w-full">
            <div
              className="h-full w-full bg-cover bg-center grayscale"
              style={{
                backgroundImage: `url(${base64})`,
              }}
            />
          </div>
        </button>
        <button
          type="button"
          className="w-full cursor-pointer bg-gray-900 px-4 py-2 text-gray-100"
          disabled={loading}
          onClick={async () => {
            if (imageRef.current) {
              console.info('Loading');
              setState((previous) => ({
                ...previous,
                loading: true,
              }));
              await new Promise((resolve) => requestAnimationFrame(resolve)); // Wait for rendering
              const canvas = await html2canvas(imageRef.current, {
                scale: 10,
                allowTaint: true,
                width: imageRef.current.offsetWidth,
                height: imageRef.current.offsetHeight,
              });
              const dataURL = canvas.toDataURL('image/jpeg');
              // Create a download link
              const link = document.createElement('a');
              link.href = dataURL;
              link.download = 'image.jpg';
              link.click();
              link.remove();
              setState((previous) => ({
                ...previous,
                loading: false,
              }));
            }
          }}>
          {loading ? 'Downloading' : 'Download'}
        </button>
      </div>
    </div>
  );
};

export default FilmifyPage;
