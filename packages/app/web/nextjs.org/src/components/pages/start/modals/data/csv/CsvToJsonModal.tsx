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

function csvToJson(csv: string): string {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return '[]';
  const headers = lines[0].split(',').map((h) => h.trim());
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim());
    const obj: Record<string, string> = {};
    headers.forEach((h, j) => {
      obj[h] = values[j] || '';
    });
    result.push(obj);
  }
  return JSON.stringify(result, null, 2);
}

export const CsvToJsonModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleConvert = useCallback(() => {
    try {
      setOutput(csvToJson(input));
    } catch {
      setOutput('Error: invalid CSV');
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
    <ModalWrapper onClose={onClose} title="CSV to JSON" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".csv,.txt"
          className="file-input file-input-bordered"
          onChange={handleFile}
        />
        <textarea
          className="textarea textarea-bordered h-24 font-mono text-xs"
          placeholder="Paste CSV data here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="btn btn-primary btn-sm flex-1"
            disabled={!input.trim()}
            onClick={handleConvert}>
            Convert to JSON
          </button>
          <button
            className="btn btn-outline btn-sm"
            disabled={!output}
            onClick={() =>
              downloadBlob(
                new Blob([output], { type: 'application/json' }),
                'output.json'
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
CsvToJsonModal.displayName = 'CsvToJsonModal';
