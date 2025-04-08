import instagram from '~/assets/instagram.svg';
import html2canvas from 'html2canvas-pro';
import { createSignal } from 'solid-js';

const Svg2PngPage = () => {
  let iconRef: HTMLDivElement | null = null;
  const [{ base64 = instagram, loading = false }, setState] = createSignal<{
    base64: string;
    loading: boolean;
  }>({
    base64: instagram,
    loading: false,
  });

  return (
    <div class="container mx-auto max-w-sm p-8">
      <div class="flex flex-col gap-y-4">
        <label
          for="upload-image"
          class="cursor-pointer border border-dotted px-4 py-2 text-center">
          <input
            type="file"
            name="image"
            accept="image/svg+xml"
            id="upload-image"
            class="hidden"
            onChange={(event) => {
              const files = event.target.files;
              if (files === null) return;
              const file = files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                setState((previous) => ({
                  ...previous,
                  base64: reader.result?.toString() ?? instagram,
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
          ref={(el) => (iconRef = el)}
          class="aspect-square w-full border border-gray-300">
          <div class="h-full w-full">
            <div class="h-full w-full bg-contain bg-center bg-no-repeat">
              <img src={base64} alt="icon" class="w-full" />
            </div>
          </div>
        </div>
        <button
          type="button"
          class="w-full cursor-pointer bg-gray-900 px-4 py-2 text-gray-100"
          disabled={loading}
          onClick={async () => {
            try {
              setState((previous) => ({
                ...previous,
                loading: true,
              }));
              if (iconRef) {
                await new Promise((resolve) => requestAnimationFrame(resolve)); // Wait for rendering
                const canvas = await html2canvas(iconRef, {
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
              console.error('error', error);
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
