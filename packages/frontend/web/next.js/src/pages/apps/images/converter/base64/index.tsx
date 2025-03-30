import { copyToClipboard } from '@web/utils/navigator';
import { NextPage } from 'next';
import { useState } from 'react';

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() ?? '');
    reader.onerror = (error) => reject(error);
  });
};

const Base64Page: NextPage = () => {
  const [{ base64 = '' }, setState] = useState<{
    base64: string;
  }>({
    base64: '',
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-2">
        <div className="col-span-1">
          <div className="h-full w-full bg-gray-100 p-8 text-gray-900">
            <label className="flex h-full w-full cursor-pointer items-center justify-center border border-dotted">
              <input
                type="file"
                name="image"
                accept="image/*"
                id="upload-image"
                className="hidden"
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
        <div className="col-span-1">
          <div className="h-full w-full bg-gray-900 text-gray-100">
            <textarea
              id="base64"
              name="base64"
              placeholder="Base64"
              className="h-full w-full p-8"
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
