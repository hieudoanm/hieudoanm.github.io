import { NextPage } from 'next';
import Tesseract from 'tesseract.js';
import { useState } from 'react';

const LicensePlatePage: NextPage = () => {
  const [{ text = '', loading = false }, setState] = useState<{
    text: string;
    loading: boolean;
  }>({
    text: '',
    loading: false,
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1 row-span-1 h-full bg-gray-100 text-gray-900">
          <div className="h-full w-full p-8">
            <label
              htmlFor="upload-image"
              className="h-full w-full cursor-pointer border border-dotted text-center">
              <input
                type="file"
                name="image"
                accept="image/png"
                id="upload-image"
                className="hidden"
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
        <div className="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <div className="h-full w-full bg-gray-900 p-8 text-gray-100">
            <p>{loading ? 'Loading' : text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicensePlatePage;
