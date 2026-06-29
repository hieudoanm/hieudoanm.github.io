'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

function jsonToXml(json: string): string {
  const data = JSON.parse(json);
  const arr = Array.isArray(data) ? data : [data];
  if (arr.length === 0) return '<root></root>';
  const keys = Object.keys(arr[0]);
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';
  for (const item of arr) {
    xml += '  <item>\n';
    for (const k of keys) {
      const safeTag = k.replace(/[^a-zA-Z0-9_-]/g, '_');
      const safeVal = String(item[k] ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      xml += `    <${safeTag}>${safeVal}</${safeTag}>\n`;
    }
    xml += '  </item>\n';
  }
  xml += '</root>';
  return xml;
}

export const JsonToXmlModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleConvert = useCallback(() => {
    try {
      setOutput(jsonToXml(input));
    } catch {
      setOutput('Error: invalid JSON');
    }
  }, [input]);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setInput(reader.result as string);
    reader.readAsText(file);
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="JSON to XML" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".json,.txt"
          className="file-input file-input-bordered"
          onChange={handleFile}
        />
        <textarea
          className="textarea textarea-bordered h-24 font-mono text-xs"
          placeholder='Paste JSON array here... [{"key": "value"}]'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="btn btn-primary btn-sm flex-1"
            disabled={!input.trim()}
            onClick={handleConvert}>
            Convert to XML
          </button>
          <button
            className="btn btn-outline btn-sm"
            disabled={!output}
            onClick={() =>
              downloadBlob(
                new Blob([output], { type: 'application/xml' }),
                'output.xml'
              )
            }>
            Download
          </button>
        </div>
        {output && (
          <pre className="bg-base-200 max-h-48 overflow-auto rounded p-3 font-mono text-xs">
            {output}
          </pre>
        )}
      </div>
    </ModalWrapper>
  );
};
JsonToXmlModal.displayName = 'JsonToXmlModal';
