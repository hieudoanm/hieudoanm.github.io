'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';

export const QrReadModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleQR = useCallback(async (file: File) => {
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
  }, []);

  return (
    <FullScreen centered onClose={onClose} title="QR Reader">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <Dropzone accept="image/*" onFile={handleQR} />
          {loading && <span className="loading loading-spinner" />}
          {result && (
            <div className="bg-base-200 rounded p-4">
              <pre className="text-sm whitespace-pre-wrap">{result}</pre>
            </div>
          )}
        </div>
      </div>
    </FullScreen>
  );
};
QrReadModal.displayName = 'QrReadModal';
