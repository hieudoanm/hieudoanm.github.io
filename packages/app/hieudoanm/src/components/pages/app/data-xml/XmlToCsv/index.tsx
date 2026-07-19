'use client';

import { FC, useState } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob, toCSV, readFileAsText } from './utils';

export const XmlToCsv: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async (file: File) => {
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
    <FullScreen centered onClose={onClose} title="XML to CSV">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <Dropzone accept=".xml" onFile={handleConvert} />
          {loading && <span className="loading loading-spinner" />}
          {error && <p className="text-base-content/60 text-sm">{error}</p>}
        </div>
      </div>
    </FullScreen>
  );
};
XmlToCsv.displayName = 'XmlToCsv';
