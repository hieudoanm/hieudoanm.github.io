import { FC, useState } from 'react';
import { toDataURL } from 'qrcode';

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="card bg-base-100 border-base-300 w-full max-w-sm border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="card-body gap-5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight">
                QR Code Generator
              </h2>
              <p className="text-base-content/40 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                URL → QR
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-xs btn-square text-base">
              ✕
            </button>
          </div>

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
              <p className="text-base-content/20 font-mono text-[10px] tracking-widest uppercase">
                QR appears here
              </p>
            </div>
          )}

          <p className="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
            Press Enter or Gen · Click outside to close
          </p>
        </div>
      </div>
    </div>
  );
};
