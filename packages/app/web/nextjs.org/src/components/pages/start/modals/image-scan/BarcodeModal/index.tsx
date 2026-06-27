import { FC, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const FORMATS = [
  'CODE128',
  'EAN-13',
  'UPC-A',
  'CODE39',
  'ITF',
  'Codabar',
  'Pharmacode',
] as const;

type Format = (typeof FORMATS)[number];

export const BarcodeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [text, setText] = useState('');
  const [format, setFormat] = useState<Format>('CODE128');
  const [dataURL, setDataURL] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const canvas = document.createElement('canvas');
      JsBarcode(canvas, text, {
        format,
        width: 2,
        height: 80,
        displayValue: true,
        fontSize: 14,
        margin: 10,
        background: '#FFFFFF',
      });
      setDataURL(canvas.toDataURL('image/png'));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') generate();
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = `barcode-${text.trim().replace(/\s+/g, '-')}.png`;
    a.click();
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="Barcode Generator"
      subtitle="Text → Barcode"
      footerNote="Press Enter or Gen · Click outside to close">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter text for barcode"
          className="input input-bordered input-sm flex-1 font-mono text-xs"
        />
        <button
          onClick={generate}
          disabled={loading || !text.trim()}
          className="btn btn-primary btn-sm font-mono tracking-widest">
          {loading ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            'Gen'
          )}
        </button>
      </div>

      <div className="mt-2 flex gap-1">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as Format)}
          className="select select-bordered select-xs w-full font-mono">
          {FORMATS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {dataURL ? (
        <div className="mt-4 flex flex-col items-center gap-3">
          <div
            className="border-base-300 flex h-32 w-full items-center justify-center overflow-hidden rounded-xl border bg-white bg-contain bg-center bg-no-repeat shadow-inner"
            style={{ backgroundImage: `url(${dataURL})` }}
          />
          <button
            onClick={download}
            className="btn btn-outline btn-sm w-full font-mono tracking-widest">
            ↓ Download PNG
          </button>
        </div>
      ) : (
        <div className="border-base-300 mt-4 flex aspect-video w-full max-w-[16rem] items-center justify-center self-center rounded-xl border border-dashed">
          <p className="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
            Barcode appears here
          </p>
        </div>
      )}
    </ModalWrapper>
  );
};
BarcodeModal.displayName = 'BarcodeModal';
