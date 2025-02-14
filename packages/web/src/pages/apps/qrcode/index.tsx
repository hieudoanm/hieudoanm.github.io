import { downloadImage } from '@nothing/utils/download';
import { NextPage } from 'next';
import Image from 'next/image';
import { toDataURL } from 'qrcode';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaDownload, FaQrcode } from 'react-icons/fa6';

const QRCodePage: NextPage = () => {
  const [textQR, setTextQR] = useState<{
    loading: boolean;
    prefix: string;
    text: string;
    qr: string;
  }>({
    loading: false,
    prefix: 'https://',
    text: 'google.com',
    qr: '',
  });

  const getQrFromText = async () => {
    setTextQR((previous) => ({ ...previous, loading: true }));
    const qr = await toDataURL(`${textQR.prefix}${textQR.text}`, {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      width: 512,
      margin: 1,
    });
    setTextQR((previous) => ({ ...previous, qr, loading: false }));
  };

  useEffect(() => {
    getQrFromText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen w-screen p-8">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-2 rounded-full border bg-gray-900 p-2 text-gray-100">
            <div className="flex">
              <select
                name="prefix"
                className="join-item select select-bordered border-base-content appearance-none pl-2"
                value={textQR.prefix}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setTextQR({ ...textQR, prefix: event.target.value })
                }>
                <option value="">text</option>
                <option value="https://">https://</option>
              </select>
              <input
                type="text"
                name="text"
                placeholder="Text"
                className="w-36"
                value={textQR.text}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setTextQR({ ...textQR, text: event.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-x-2">
              <button
                type="button"
                className="aspect-square w-8 overflow-hidden rounded-full bg-white text-center text-black"
                onClick={() => getQrFromText()}>
                <FaQrcode className="mx-auto" />
              </button>
              <button
                type="button"
                className="aspect-square w-8 overflow-hidden rounded-full bg-white text-center text-black"
                onClick={() =>
                  downloadImage({
                    content: textQR.qr,
                    filename: 'qrcode',
                    format: 'jpg',
                  })
                }>
                <FaDownload className="mx-auto" />
              </button>
            </div>
          </div>
          {textQR.loading ? (
            <div className="flex h-full w-full items-center">Loading</div>
          ) : (
            <>
              {textQR.qr ? (
                <div className="mx-auto aspect-square w-[256px] overflow-hidden rounded-xl border border-black">
                  <Image
                    src={textQR.qr}
                    alt={textQR.text}
                    width={128}
                    height={128}
                    className="h-full w-full"
                  />
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
