import { FC, useState } from 'react';
import { toDataURL } from 'qrcode';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

export const QRCodeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [url, setUrl] = useState('https://');
  const [dataURL, setDataURL] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!url.trim()) return;
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') generate();
  };

  const downloadQR = () => {
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'qrcode.jpg';
    a.click();
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="QR Code Generator"
      subtitle="URL → QR"
      footerNote="Press Enter or Gen · Click outside to close">
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="https://example.com"
          className="input input-bordered input-sm flex-1 font-mono text-xs"
        />
        <button
          onClick={generate}
          disabled={loading || !url.trim()}
          className="btn btn-primary btn-sm font-mono tracking-widest">
          {loading ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            'Gen'
          )}
        </button>
      </div>

      {dataURL ? (
        <div className="flex flex-col items-center gap-3">
          <div
            className="border-base-300 aspect-square w-48 overflow-hidden rounded-xl border bg-contain bg-center bg-no-repeat shadow-inner"
            style={{ backgroundImage: `url(${dataURL})` }}
          />
          <button
            onClick={downloadQR}
            className="btn btn-outline btn-sm w-full font-mono tracking-widest">
            ↓ Download JPG
          </button>
        </div>
      ) : (
        <div className="border-base-300 flex aspect-square w-full max-w-[12rem] items-center justify-center self-center rounded-xl border border-dashed">
          <p className="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
            QR appears here
          </p>
        </div>
      )}
    </ModalWrapper>
  );
};
