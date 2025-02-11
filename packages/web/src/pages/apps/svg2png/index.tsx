import { NextPage } from 'next';
import instagram from '@nothing/assets/instagram.svg';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const Svg2PngPage: NextPage = () => {
  const iconRef = useRef<HTMLDivElement>(null);
  const [{ base64 = instagram.src, loading = false }, setState] = useState<{
    base64: string;
    loading: boolean;
  }>({
    base64: instagram.src,
    loading: false,
  });

  return (
    <div className="container mx-auto max-w-sm p-8">
      <div className="flex flex-col gap-y-4">
        <label
          htmlFor="upload-image"
          className="cursor-pointer border border-dotted px-4 py-2 text-center">
          <input
            type="file"
            name="image"
            accept="image/svg+xml"
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
                  base64: reader.result?.toString() ?? instagram.src,
                }));
              };
              reader.onerror = (error) => {
                console.error('Error converting file to Base64:', error);
              };
            }}
          />
          <span>Upload File</span>
        </label>
        <div
          ref={iconRef}
          className="aspect-square w-full border border-gray-300">
          <div className="h-full w-full">
            <div className="h-full w-full bg-contain bg-center bg-no-repeat">
              <img src={base64} alt="icon" className="w-full" />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="w-full cursor-pointer bg-gray-900 px-4 py-2 text-gray-100"
          disabled={loading}
          onClick={async () => {
            try {
              setState((previous) => ({
                ...previous,
                loading: true,
              }));
              if (iconRef.current) {
                await new Promise((resolve) => requestAnimationFrame(resolve)); // Wait for rendering
                const canvas = await html2canvas(iconRef.current, {
                  scale: 10,
                  allowTaint: true,
                  width: 1024,
                  height: 1024,
                  foreignObjectRendering: true,
                  useCORS: true,
                });
                const dataURL = canvas.toDataURL('image/png');
                // Create a download link
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'icon.png';
                link.click();
                link.remove();
                setState((previous) => ({
                  ...previous,
                  loading: false,
                }));
              }
            } catch (error) {
              console.error(error);
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

export default Svg2PngPage;
