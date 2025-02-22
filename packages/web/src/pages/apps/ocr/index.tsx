import { NextPage } from 'next';
import Tesseract from 'tesseract.js';
import { useState } from 'react';

const LicensePlatePage: NextPage = () => {
  const [{ text = '', imageURL = '', loading = false }, setState] = useState<{
    text: string;
    imageURL: string;
    loading: boolean;
  }>({
    text: '',
    imageURL: '',
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
        <div className="aspect-square w-full border border-gray-300">
          <div className="flex h-full w-full items-center justify-center bg-contain bg-center bg-no-repeat">
            {imageURL && <img src={imageURL} alt="icon" className="w-full" />}
          </div>
        </div>
        <p>{loading ? 'Loading' : text}</p>
      </div>
    </div>
  );
};

export default LicensePlatePage;
