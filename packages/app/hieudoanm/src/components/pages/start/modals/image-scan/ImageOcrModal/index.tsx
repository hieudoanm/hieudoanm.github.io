'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';

export const ImageOcrModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleOCR = useCallback(async (file: File) => {
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
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="Image OCR">
      <div className="flex flex-col gap-4">
        <Dropzone accept="image/*" onFile={handleOCR} />
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
