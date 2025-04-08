import { toDataURL } from 'qrcode';
import { createSignal, onMount } from 'solid-js';
import { downloadImage } from '~/utils/download';

const QRCodePage = () => {
  const [signal, setSignal] = createSignal<{
    text: string;
    qr: string;
  }>({
    text: 'https://google.com',
    qr: '',
  });

  onMount(() => {
    const getInitialImage = async () => {
      const qr: string = await toDataURL(signal().text, {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        width: 512,
        margin: 1,
      });
      setSignal((previous) => ({ ...previous, qr }));
    };

    getInitialImage();
  });

  return (
    <div class="h-screen w-screen">
      <div class="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div class="col-span-1 row-span-1 h-full bg-gray-100 text-gray-900">
          <textarea
            id="text"
            name="text"
            placeholder="Text"
            class="h-full w-full p-8 md:p-16 lg:p-32"
            value={signal().text}
            onChange={async (event) => {
              const text: string = event.target.value;
              if (text.length > 0) {
                const qr: string = await toDataURL(text, {
                  errorCorrectionLevel: 'H',
                  type: 'image/jpeg',
                  width: 512,
                  margin: 1,
                });
                setSignal({ qr, text });
              }
            }}
          />
        </div>
        <div class="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <div class="p-8 md:p-16 lg:p-32">
            <button
              type="button"
              class="w-full cursor-pointer overflow-hidden rounded"
              onClick={() => {
                downloadImage({
                  content: signal().qr,
                  filename: 'qrcode',
                  format: 'jpg',
                });
              }}>
              <img
                src={signal().qr}
                alt={signal().text}
                width={128}
                height={128}
                class="h-full w-full"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
