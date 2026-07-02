'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob, jsonToXml } from './utils';

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

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => setInput(reader.result as string);
    reader.readAsText(file);
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="JSON to XML" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <Dropzone accept=".json,.txt" onFile={handleFile} />
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
