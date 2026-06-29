'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob, readFile } from './utils';

export const ExcelToXmlModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const XLSX = await import('xlsx');
      const buf = await readFile(file);
      const wb = XLSX.read(new Uint8Array(buf), { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<string[]>(ws, {
        header: 1,
      }) as string[][];
      if (rows.length < 2) {
        setLoading(false);
        return;
      }
      const headers = rows[0];
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';
      for (let i = 1; i < rows.length; i++) {
        xml += '  <row>\n';
        for (let j = 0; j < headers.length && j < rows[i].length; j++) {
          xml += `    <${headers[j]}>${rows[i][j]}</${headers[j]}>\n`;
        }
        xml += '  </row>\n';
      }
      xml += '</root>';
      downloadBlob(
        new Blob([xml], { type: 'text/xml' }),
        file.name.replace(/\.\w+$/, '.xml')
      );
    } catch (err) {
      console.error(err);
      setError('Failed to convert Excel to XML.');
    }
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="Excel to XML" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".xlsx,.xls"
          className="file-input file-input-bordered"
          onChange={handleConvert}
        />
        {loading && <span className="loading loading-spinner" />}
        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    </ModalWrapper>
  );
};
ExcelToXmlModal.displayName = 'ExcelToXmlModal';
