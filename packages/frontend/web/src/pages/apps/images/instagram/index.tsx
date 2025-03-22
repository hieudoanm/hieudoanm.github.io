import { downloadImage } from '@web/utils/download';
import { addZero } from '@web/utils/number';
import { NextPage } from 'next';
import { useState } from 'react';

const InstagramPage: NextPage = () => {
  const initialUrl =
    'https://www.instagram.com/p/DFijU7Gzkae/?utm_source=ig_web_copy_link';
  const [{ url = initialUrl, loading = false, images = [] }, setState] =
    useState<{
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
      setState((previous) => ({
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
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      const { images } = data;
      setState((previous) => ({
        ...previous,
        images,
        loading: false,
      }));
    } catch (error) {
      console.error('error', error);
    } finally {
      setState((previous) => ({
        ...previous,
        loading: false,
      }));
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col gap-y-8">
        <div className="flex w-full flex-col items-center gap-4 md:flex-row">
          <input
            type="text"
            id="url"
            name="url"
            placeholder={initialUrl}
            className="w-full grow rounded border border-gray-300 px-4 py-2"
            value={url}
            onChange={(event) => {
              setState((previous) => ({
                ...previous,
                url: event?.target.value,
              }));
            }}
          />
          <button
            type="button"
            className="w-full rounded bg-gray-900 px-4 py-2 text-gray-100 hover:bg-red-500"
            disabled={loading}
            onClick={() => {
              download();
            }}>
            {loading ? 'Downloading' : 'Download'}
          </button>
        </div>
        <hr className="border-gray-300" />
        {loading ? <p className="text-center">Loading ...</p> : <></>}
        {!loading && images.length > 0 ? (
          <div className="flex flex-col gap-y-4">
            <button
              type="button"
              className="w-full rounded bg-gray-900 px-4 py-2 text-gray-100 hover:bg-red-500"
              onClick={() => {
                images.forEach((image: string, index: number) => {
                  downloadImage({
                    format: 'jpg',
                    content: image,
                    filename: addZero(index + 1),
                  });
                });
              }}>
              Download All
            </button>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {images.map((image: string, index: number) => {
                return (
                  <div key={image} className="col-span-1">
                    <div className="flex flex-col gap-y-2">
                      <div
                        className="aspect-square w-full rounded border border-gray-300 bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${image})` }}
                      />
                      <button
                        className="cursor-pointer rounded bg-gray-900 px-4 py-2 text-gray-100 hover:bg-red-500"
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
