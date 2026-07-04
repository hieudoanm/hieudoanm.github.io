'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';

export const BarcodeReadModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleBarcode = useCallback(async (file: File) => {
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
  }, []);

  return (
    <FullScreen centered onClose={onClose} title="Barcode Reader">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <Dropzone accept="image/*" onFile={handleBarcode} />
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
BarcodeReadModal.displayName = 'BarcodeReadModal';
