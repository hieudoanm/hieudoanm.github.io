'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

const readFileAsText = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = () => rej(r.error);
    r.readAsText(file);
  });

export const XmlToExcelModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const XLSX = await import('xlsx');
      const text = await readFileAsText(file);
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/xml');
      const rows: string[][] = [['Tag', 'Attribute', 'Value']];
      const walk = (node: Element, path: string) => {
        for (let i = 0; i < node.attributes.length; i++) {
          rows.push([path, node.attributes[i].name, node.attributes[i].value]);
        }
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          if (child.children.length === 0 && child.textContent) {
            rows.push([`${path}/${child.tagName}`, '', child.textContent]);
          } else walk(child, `${path}/${child.tagName}`);
        }
      };
      walk(doc.documentElement, doc.documentElement.tagName);
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const out = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      downloadBlob(new Blob([out]), file.name.replace('.xml', '.xlsx'));
    } catch (err) {
      console.error(err);
      setError('Failed to convert XML to Excel.');
    }
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="XML to Excel" size="max-w-lg">
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
XmlToExcelModal.displayName = 'XmlToExcelModal';
