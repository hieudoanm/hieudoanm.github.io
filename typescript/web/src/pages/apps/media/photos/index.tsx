import { useIsOnline } from '@web/hooks/use-is-online';
import { Layout } from '@web/layout';
import { logger } from '@web/log';
import { RequestBody, ResponseData } from '@web/pages/api/instagram';
import { validate } from '@web/utils/instagram/validate';
import axios from 'axios';
import { NextPage } from 'next';
import { FormEvent, useCallback, useState } from 'react';

const DEFAULT_VALUE = 'https://www.instagram.com/p/C578i4-tkI4/';

const InstagramPage: NextPage = () => {
  const isOnline: boolean = useIsOnline();

  const [url, setUrl] = useState(DEFAULT_VALUE);
  const [{ loading = false, error = '', images = [] }, setHttpData] = useState<{
    loading: boolean;
    error: string;
    images: string[];
  }>({
    loading: false,
    error: '',
    images: [],
  });

  const fetch = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const urlInterface = new URL(url);
      const pathname: string = urlInterface.pathname;
      const postUrl = `https://instagram.com${pathname}`;
      logger.info('postUrl', postUrl);
      if (!validate(postUrl)) return alert(`Invalid URL: ${postUrl}`);

      try {
        setHttpData({ loading: true, error: '', images: [] });
        const requestData: RequestBody = { url: postUrl };
        const response = await axios.post<ResponseData>(
          '/api/instagram',
          requestData
        );
        const { data } = response;
        const { images = [] } = data;
        setHttpData({ loading: false, error: '', images });
      } catch (error) {
        logger.error(error);
        setHttpData({
          loading: false,
          error: 'Failed to Fetch Images',
          images: [],
        });
      }
    },
    [url]
  );

  const download = useCallback((base64: string, index: number) => {
    const a = document.createElement('a');
    a.href = `data:image/jpeg;base64,${base64}`;
    a.download = `image-${index}.jpg`;
    a.click();
    a.remove();
  }, []);

  if (!isOnline) {
    return (
      <Layout full nav>
        <div className='flex h-full items-center justify-center'>
          <div className='text-center text-xl uppercase'>
            Service is Offline
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout nav full>
      <div className='container mx-auto h-full'>
        <div className='h-full p-4 md:p-8'>
          <div className='flex h-full items-center justify-center'>
            <div className='flex w-full flex-col gap-y-4 md:gap-y-8'>
              <form onSubmit={fetch}>
                <div className='join w-full'>
                  <input
                    id='url'
                    name='url'
                    placeholder={DEFAULT_VALUE}
                    className='input join-item input-bordered w-full border-base-content'
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    disabled={loading}
                    required
                  />
                  <button
                    type='submit'
                    className='btn btn-outline join-item'
                    disabled={loading}>
                    {loading ? (
                      <span className='loading loading-spinner loading-sm'></span>
                    ) : (
                      'Fetch'
                    )}
                  </button>
                </div>
                {error ? (
                  <p className='mt-4 text-center text-red-500 text-white'>
                    {error}
                  </p>
                ) : (
                  <></>
                )}
              </form>
              {images.length > 0 ? (
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8 lg:grid-cols-5 xl:grid-cols-6'>
                  {images.map((image: string, index: number) => (
                    <div key={image} className='col-span-1'>
                      <div className='aspect-square rounded border border-base-content'>
                        <div
                          className='h-full w-full bg-contain bg-center bg-no-repeat'
                          style={{
                            backgroundImage: `url('data:image/jpeg;base64,${image}')`,
                          }}
                        />
                      </div>
                      <div className='py-2 md:py-4'>
                        <button
                          type='button'
                          className='btn btn-outline w-full'
                          onClick={() => {
                            download(image, index);
                          }}>
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InstagramPage;
