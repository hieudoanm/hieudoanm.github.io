import { copyToClipboard } from '~/utils/navigator';

import { createSignal } from 'solid-js';

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() ?? '');
    reader.onerror = (error) => reject(error);
  });
};

const Base64Page = () => {
  const [{ base64 = '' }, setState] = createSignal<{
    base64: string;
  }>({
    base64: '',
  });

  return (
    <div class="h-screen w-screen">
      <div class="grid h-full grid-cols-2">
        <div class="col-span-1">
          <div class="h-full w-full bg-gray-100 p-8 text-gray-900">
            <label class="flex h-full w-full cursor-pointer items-center justify-center border border-dotted">
              <input
                type="file"
                name="image"
                accept="image/*"
                id="upload-image"
                class="hidden"
                onChange={async (event) => {
                  const files = event.target.files;
                  if (files === null) return;
                  const file = files[0];
                  const base64 = await getBase64(file);
                  setState((previous) => ({ ...previous, base64 }));
                }}
              />
              <span>Upload File</span>
            </label>
          </div>
        </div>
        <div class="col-span-1">
          <div class="h-full w-full bg-gray-900 text-gray-100">
            <textarea
              id="base64"
              name="base64"
              placeholder="Base64"
              class="h-full w-full p-8"
              value={base64}
              onClick={() => {
                copyToClipboard(base64);
              }}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Page;
