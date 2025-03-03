import { downloadImage } from '@nothing/utils/download';
import { addZero } from '@nothing/utils/number';
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
      const response = await fetch(
        'https://nothing-instagram.onrender.com/download',
        { method: 'POST', headers, body: JSON.stringify({ url }) }
      );
      const data = await response.json();
      const { images } = data;
      setState((previous) => ({
        ...previous,
        images,
        loading: false,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setState((previous) => ({
        ...previous,
        loading: false,
      }));
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-y-8">
        <div className="flex w-full items-center gap-x-4">
          <input
            type="text"
            id="url"
            name="url"
            placeholder={initialUrl}
            className="grow rounded border border-gray-300 px-4 py-2"
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
            className="rounded bg-gray-900 px-4 py-2 text-gray-100"
            disabled={loading}
            onClick={() => {
              download();
            }}>
            {loading ? 'Downloading' : 'Download'}
          </button>
        </div>
        {loading ? <p className="text-center">Loading ...</p> : <></>}
        {!loading && images.length > 0 ? (
          <div className="grid grid-cols-6 gap-4">
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default InstagramPage;
