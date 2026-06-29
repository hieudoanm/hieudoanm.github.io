'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { ocrPDF, downloadBlob } from '../../pdf-misc/utils/pdf';

export const PdfOcrModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [ocrLang, setOcrLang] = useState('eng');

  const handleOcr = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const text = await ocrPDF(file, ocrLang);
      setOcrText(text);
    } finally {
      setLoading(false);
    }
  };

  const copyText = () => navigator.clipboard.writeText(ocrText);

  const downloadText = () => {
    const blob = new Blob([ocrText], { type: 'text/plain' });
    downloadBlob(blob, `${file?.name ?? 'ocr'}.txt`);
  };

  return (
    <ModalWrapper onClose={onClose} title="PDF OCR" size="max-w-2xl" fullHeight>
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          className="file-input file-input-bordered"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setOcrText('');
          }}
        />

        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-sm">Language:</span>
            <select
              className="select select-bordered"
              value={ocrLang}
              onChange={(e) => setOcrLang(e.target.value)}>
              <option value="eng">English</option>
              <option value="fra">French</option>
              <option value="deu">German</option>
              <option value="spa">Spanish</option>
              <option value="ita">Italian</option>
              <option value="por">Portuguese</option>
              <option value="nld">Dutch</option>
              <option value="jpn">Japanese</option>
              <option value="chi_sim">Chinese Simplified</option>
              <option value="rus">Russian</option>
              <option value="ara">Arabic</option>
            </select>
          </label>
          <button
            className="btn btn-primary"
            disabled={!file || loading}
            onClick={handleOcr}>
            {loading ? 'Running OCR...' : 'Run OCR'}
          </button>
          {ocrText && (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button className="btn btn-ghost btn-sm" onClick={copyText}>
                  Copy
                </button>
                <button className="btn btn-ghost btn-sm" onClick={downloadText}>
                  Download
                </button>
              </div>
              <pre className="bg-base-200 max-h-96 overflow-auto rounded p-4 text-sm whitespace-pre-wrap">
                {ocrText}
              </pre>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};
PdfOcrModal.displayName = 'PdfOcrModal';
