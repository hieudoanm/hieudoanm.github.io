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

function xmlToJson(xml: string): any {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const walk = (node: Element): any => {
    const obj: any = {};
    if (node.attributes.length > 0) {
      for (let i = 0; i < node.attributes.length; i++) {
        obj[`@${node.attributes[i].name}`] = node.attributes[i].value;
      }
    }
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const val = child.children.length > 0 ? walk(child) : child.textContent;
      if (obj[child.tagName]) {
        if (!Array.isArray(obj[child.tagName]))
          obj[child.tagName] = [obj[child.tagName]];
        obj[child.tagName].push(val);
      } else obj[child.tagName] = val;
    }
    if (node.textContent?.trim() && Object.keys(obj).length === 0)
      return node.textContent.trim();
    return obj;
  };
  return walk(doc.documentElement);
}

const readFileAsText = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = () => rej(r.error);
    r.readAsText(file);
  });

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
