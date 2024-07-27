import { Layout } from '@web/layout';
import { downloadImage } from '@web/utils/download';
import { NextPage } from 'next';
import { toDataURL } from 'qrcode';
import { ChangeEvent, useState } from 'react';

const QRCodePage: NextPage = () => {
  const [textQR, setTextQR] = useState<{
    prefix: string;
    text: string;
    qr: string;
  }>({
    prefix: 'https://',
    text: 'google.com',
    qr: '',
  });

  const getQrFromText = async () => {
    const qr = await toDataURL(`${textQR.prefix}${textQR.text}`, { margin: 1 });
    setTextQR({ ...textQR, qr });
  };

  return (
    <Layout nav full>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='flex flex-col gap-y-4 md:gap-y-8'>
            <div className='join join-vertical w-full lg:join-horizontal'>
              <select
                name='prefix'
                className='join-item select select-bordered border-base-content'
                value={textQR.prefix}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setTextQR({ ...textQR, prefix: event.target.value })
                }>
                <option value=''>Text</option>
                <option value='https://'>https://</option>
              </select>
              <label className='input join-item input-bordered flex w-full items-center gap-2 border-base-content'>
                <input
                  type='text'
                  name='text'
                  placeholder='Text'
                  className='grow'
                  value={textQR.text}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setTextQR({ ...textQR, text: event.target.value })
                  }
                />
              </label>
              <button
                type='button'
                className='btn btn-outline join-item'
                onClick={() => getQrFromText()}>
                QR
              </button>
            </div>
            {textQR.qr ? (
              <>
                <div className='aspect-square overflow-hidden rounded-lg border border-base-content'>
                  <img
                    src={textQR.qr}
                    alt={textQR.text}
                    className='h-full w-full'
                  />
                </div>
                <button
                  type='button'
                  className='btn btn-outline'
                  onClick={() => {
                    downloadImage(textQR.qr, 'png', 'png');
                  }}>
                  Download
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QRCodePage;
