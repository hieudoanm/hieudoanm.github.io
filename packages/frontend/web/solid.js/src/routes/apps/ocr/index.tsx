import Tesseract from 'tesseract.js';
import { createSignal } from 'solid-js';

const LicensePlatePage = () => {
  const [{ text = '', loading = false }, setState] = createSignal<{
    text: string;
    loading: boolean;
  }>({
    text: '',
    loading: false,
  });

  return (
    <div class="h-screen w-screen">
      <div class="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div class="col-span-1 row-span-1 h-full bg-gray-100 text-gray-900">
          <div class="h-full w-full p-8">
            <label
              htmlFor="upload-image"
              class="flex h-full w-full cursor-pointer items-center justify-center border border-dotted">
              <input
                type="file"
                name="image"
                accept="image/png"
                id="upload-image"
                class="hidden"
                onChange={async (event) => {
                  const files = event.target.files;
                  if (files === null) return;
                  const file = files[0];
                  if (!file) return;
                  setState((previous) => ({
                    ...previous,
                    loading: true,
                  }));
                  const imageURL = URL.createObjectURL(file);
                  Tesseract.recognize(imageURL, 'eng')
                    .then(({ data }) => {
                      console.log('data', data);
                      setState((previous) => ({
                        ...previous,
                        imageURL,
                        text: data.text ?? 'No Text',
                        loading: false,
                      }));
                    })
                    .catch((error) => {
                      console.error('error', error);
                      setState((previous) => ({
                        ...previous,
                        imageURL,
                        text: 'Unable to Recognize',
                        loading: false,
                      }));
                    });
                }}
              />
              <span>Upload File</span>
            </label>
          </div>
        </div>
        <div class="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <div class="h-full w-full bg-gray-900 p-8 text-gray-100">
            <p>{loading ? 'Loading' : (text ?? 'No File Yet')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicensePlatePage;
