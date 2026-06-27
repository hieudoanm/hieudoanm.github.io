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

function toCSV(rows: string[][]): string {
  return rows
    .map((row) =>
      row
        .map((f) =>
          f.includes(',') || f.includes('"') || f.includes('\n')
            ? `"${f.replace(/"/g, '""')}"`
            : f
        )
        .join(',')
    )
    .join('\n');
}

const readFileAsText = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = () => rej(r.error);
    r.readAsText(file);
  });

export const XmlToCsvModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const text = await readFileAsText(file);
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/xml');
      const rows: string[][] = [];
      const walk = (node: Element, path: string) => {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          if (child.children.length === 0 && child.textContent) {
            rows.push([path, child.tagName, child.textContent]);
          } else walk(child, `${path}/${child.tagName}`);
        }
      };
      rows.push(['Path', 'Tag', 'Value']);
      walk(doc.documentElement, doc.documentElement.tagName);
      const csv = toCSV(rows);
      downloadBlob(
        new Blob([csv], { type: 'text/csv' }),
        file.name.replace('.xml', '.csv')
      );
    } catch (err) {
      console.error(err);
      setError('Failed to convert XML to CSV.');
    }
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="XML to CSV" size="max-w-lg">
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
XmlToCsvModal.displayName = 'XmlToCsvModal';
