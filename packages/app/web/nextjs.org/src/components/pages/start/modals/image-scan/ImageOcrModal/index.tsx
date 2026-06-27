'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab = 'image-to-text' | 'qr-read' | 'barcode-read';

const TAB_LABELS: Record<Tab, string> = {
  'image-to-text': 'Image to Text',
  'qr-read': 'QR Reader',
  'barcode-read': 'Barcode Reader',
};

export const ImageOcrModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('image-to-text');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleOCR = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setLoading(true);
      setResult('');
      try {
        const Tesseract = await import('tesseract.js');
        const { data } = await Tesseract.recognize(file, 'eng');
        setResult(data.text);
      } catch (err) {
        setResult(
          'Error: ' + (err instanceof Error ? err.message : 'OCR failed')
        );
      }
      setLoading(false);
    },
    []
  );

  const handleQR = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setLoading(true);
      setResult('');
      try {
        const jsQR = (await import('jsqr')).default;
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(bitmap, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        setResult(code ? code.data : 'No QR code found.');
      } catch (err) {
        setResult(
          'Error: ' + (err instanceof Error ? err.message : 'QR reading failed')
        );
      }
      setLoading(false);
    },
    []
  );

  const handleBarcode = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setLoading(true);
      setResult('');
      try {
        const Quagga = await import('@ericblade/quagga2');
        const url = URL.createObjectURL(file);
        Quagga.default.decodeSingle(
          {
            src: url,
            numOfWorkers: 0,
            inputStream: { size: 800 },
            decoder: {
              readers: [
                'code_128_reader',
                'ean_reader',
                'ean_8_reader',
                'upc_reader',
                'code_39_reader',
              ],
            },
          },
          (res: any) => {
            if (res?.codeResult?.code) {
              setResult(res.codeResult.code);
            } else {
              setResult('No barcode found.');
            }
            setLoading(false);
          }
        );
      } catch (err) {
        setResult(
          'Error: ' +
            (err instanceof Error ? err.message : 'Barcode reading failed')
        );
        setLoading(false);
      }
    },
    []
  );

  return (
    <ModalWrapper onClose={onClose} title="Image OCR">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept={tab === 'image-to-text' ? 'image/*' : 'image/*'}
          className="file-input file-input-bordered"
          onChange={
            tab === 'image-to-text'
              ? handleOCR
              : tab === 'qr-read'
                ? handleQR
                : handleBarcode
          }
        />
        {loading && <span className="loading loading-spinner" />}
        {result && (
          <div className="bg-base-200 rounded p-4">
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
ImageOcrModal.displayName = 'ImageOcrModal';
