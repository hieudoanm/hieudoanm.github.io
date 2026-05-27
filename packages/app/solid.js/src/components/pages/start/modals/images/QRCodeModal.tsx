import { createSignal } from 'solid-js';
import { toDataURL } from 'qrcode';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const QRCodeModal = ({ onClose }: { onClose: () => void }) => {
  const [url, setUrl] = createSignal('https://');
  const [dataURL, setDataURL] = createSignal<string>('');
  const [loading, setLoading] = createSignal(false);

  const generate = async () => {
    if (!url().trim()) return;
    setLoading(true);
    try {
      const result = await toDataURL(url, {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        width: 512,
        margin: 1,
        color: { dark: '#F5F5F5', light: '#171717' },
      });
      setDataURL(result);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') generate();
  };

  const downloadQR = () => {
    const a = document.createElement('a');
    a.href = dataURL();
    a.download = 'qrcode.jpg';
    a.click();
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="QR Code Generator"
      subtitle="URL → QR"
      footerNote="Press Enter or Gen · Click outside to close">
      <div class="flex gap-2">
        <input
          type="url"
          value={url()}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="https://example.com"
          class="input input-bordered input-sm flex-1 font-mono text-xs"
        />
        <button
          onClick={generate}
          disabled={loading() || !url().trim()}
          class="btn btn-primary btn-sm font-mono tracking-widest">
          {loading() ? (
            <span class="loading loading-spinner loading-xs" />
          ) : (
            'Gen'
          )}
        </button>
      </div>

      {dataURL() ? (
        <div class="flex flex-col items-center gap-3">
          <div
            class="border-base-300 aspect-square w-48 overflow-hidden rounded-xl border bg-contain bg-center bg-no-repeat shadow-inner"
            style={{ backgroundImage: `url(${dataURL()})` }}
          />
          <button
            onClick={downloadQR}
            class="btn btn-outline btn-sm w-full font-mono tracking-widest">
            ↓ Download JPG
          </button>
        </div>
      ) : (
        <div class="border-base-300 flex aspect-square w-full max-w-[12rem] items-center justify-center self-center rounded-xl border border-dashed">
          <p class="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
            QR appears here
          </p>
        </div>
      )}
    </ModalWrapper>
  );
};
