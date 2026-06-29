'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob, xmlToJson, readFileAsText } from './utils';

export const XmlToJsonModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const text = await readFileAsText(file);
      const json = xmlToJson(text);
      const blob = new Blob([JSON.stringify(json, null, 2)], {
        type: 'application/json',
      });
      downloadBlob(blob, file.name.replace('.xml', '.json'));
    } catch (err) {
      console.error(err);
      setError('Failed to convert XML to JSON.');
    }
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="XML to JSON" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".xml"
          className="file-input file-input-bordered"
          onChange={handleConvert}
        />
        {loading && <span className="loading loading-spinner" />}
        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    </ModalWrapper>
  );
};
XmlToJsonModal.displayName = 'XmlToJsonModal';
