import { downloadImage } from '@web/utils/download';
import { NextPage } from 'next';
import Image from 'next/image';
import { toDataURL } from 'qrcode';
import { ChangeEvent, useEffect, useState } from 'react';

const QRCodePage: NextPage = () => {
  const [{ text = 'https://google.com', qr = '' }, setTextQR] = useState<{
    text: string;
    qr: string;
  }>({
    text: 'https://google.com',
    qr: '',
  });

  useEffect(() => {
    const getInitialImage = async () => {
      const qr: string = await toDataURL(text, {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        width: 512,
        margin: 1,
      });
      setTextQR({ qr, text });
    };

    getInitialImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1 row-span-1 h-full bg-gray-100 text-gray-900">
          <textarea
            id="text"
            name="text"
            placeholder="Text"
            className="h-full w-full p-8 md:p-16 lg:p-32"
            value={text}
            onChange={async (event: ChangeEvent<HTMLTextAreaElement>) => {
              const text: string = event.target.value;
              if (text.length > 0) {
                const qr: string = await toDataURL(text, {
                  errorCorrectionLevel: 'H',
                  type: 'image/jpeg',
                  width: 512,
                  margin: 1,
                });
                setTextQR({ qr, text });
              }
            }}
          />
        </div>
        <div className="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <div className="p-8 md:p-16 lg:p-32">
            <button
              type="button"
              className="w-full cursor-pointer overflow-hidden rounded"
              onClick={() => {
                downloadImage({
                  content: qr,
                  filename: 'qrcode',
                  format: 'jpg',
                });
              }}>
              <Image
                src={qr}
                alt={text}
                width={128}
                height={128}
                className="h-full w-full"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
