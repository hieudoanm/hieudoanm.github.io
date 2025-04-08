import { createSignal } from 'solid-js';
import { downloadImage } from '~/utils/download';
import { addZero } from '~/utils/number';

const InstagramPage = () => {
  const initialUrl =
    'https://www.instagram.com/p/DFijU7Gzkae/?utm_source=ig_web_copy_link';
  const [signal, setSignal] = createSignal<{
    url: string;
    loading: boolean;
    images: string[];
  }>({
    url: initialUrl,
    loading: false,
    images: [],
  });

  const download = async () => {
    try {
      setSignal((previous) => ({
        ...previous,
        loading: true,
      }));
      const headers = {
        'Content-Type': 'application/json', // Specify content type
      };
      const downloadUrl: string =
        'https://nothing-instagram.onrender.com/api/download';
      const response = await fetch(downloadUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ url: signal().url }),
      });
      const data = await response.json();
      const { images } = data;
      setSignal((previous) => ({
        ...previous,
        images,
        loading: false,
      }));
    } catch (error) {
      console.error('error', error);
    } finally {
      setSignal((previous) => ({
        ...previous,
        loading: false,
      }));
    }
  };

  return (
    <div class="container mx-auto p-8">
      <div class="flex flex-col gap-y-8">
        <div class="flex w-full flex-col items-center gap-4 md:flex-row">
          <input
            type="text"
            id="url"
            name="url"
            placeholder={initialUrl}
            class="w-full grow rounded border border-gray-300 px-4 py-2"
            value={signal().url}
            onChange={(event) => {
              setSignal((previous) => ({
                ...previous,
                url: event?.target.value,
              }));
            }}
          />
          <button
            type="button"
            class="w-full rounded bg-gray-900 px-4 py-2 text-gray-100 hover:bg-red-500"
            disabled={signal().loading}
            onClick={() => {
              download();
            }}>
            {signal().loading ? 'Downloading' : 'Download'}
          </button>
        </div>
        <hr class="border-gray-300" />
        {signal().loading ? <p class="text-center">Loading ...</p> : <></>}
        {!signal().loading && signal().images.length > 0 ? (
          <div class="flex flex-col gap-y-4">
            <button
              type="button"
              class="w-full rounded bg-gray-900 px-4 py-2 text-gray-100 hover:bg-red-500"
              onClick={() => {
                signal().images.forEach((image: string, index: number) => {
                  downloadImage({
                    format: 'jpg',
                    content: image,
                    filename: addZero(index + 1),
                  });
                });
              }}>
              Download All
            </button>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {signal().images.map((image: string, index: number) => {
                return (
                  <div title={image} class="col-span-1">
                    <div class="flex flex-col gap-y-2">
                      <div
                        class="aspect-square w-full rounded border border-gray-300 bg-contain bg-center bg-no-repeat"
                        style={{ 'background-image': `url(${image})` }}
                      />
                      <button
                        class="cursor-pointer rounded bg-gray-900 px-4 py-2 text-gray-100 hover:bg-red-500"
                        onClick={() => {
                          downloadImage({
                            format: 'jpg',
                            content: image,
                            filename: addZero(index + 1),
                          });
                        }}>
                        Download
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default InstagramPage;
