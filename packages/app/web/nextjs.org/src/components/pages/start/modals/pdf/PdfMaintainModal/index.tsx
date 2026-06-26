'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { compressPDF, ocrPDF, downloadBlob } from '../utils/pdf';

type Tab = 'repair' | 'ocr';

export const PdfMaintainModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('repair');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [ocrLang, setOcrLang] = useState('eng');

  const handleRepair = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await compressPDF(file);
      downloadBlob(bytes, 'repaired.pdf');
    } finally {
      setLoading(false);
    }
  };

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
    <ModalWrapper
      onClose={onClose}
      title="PDF Maintain"
      size="max-w-2xl"
      fullHeight={tab === 'ocr'}>
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full">
        <button
          role="tab"
          className={`tab flex-1 ${tab === 'repair' ? 'tab-active' : ''}`}
          onClick={() => setTab('repair')}>
          Repair
        </button>
        <button
          role="tab"
          className={`tab flex-1 ${tab === 'ocr' ? 'tab-active' : ''}`}
          onClick={() => setTab('ocr')}>
          OCR
        </button>
      </div>

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

        {tab === 'repair' && (
          <div className="flex flex-col gap-3">
            <p className="text-base-content/70 text-sm">
              Re-saves the PDF to fix structural issues. This is a best-effort
              repair.
            </p>
            <button
              className="btn btn-primary"
              disabled={!file || loading}
              onClick={handleRepair}>
              {loading ? 'Repairing...' : 'Repair'}
            </button>
          </div>
        )}

        {tab === 'ocr' && (
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
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={downloadText}>
                    Download
                  </button>
                </div>
                <pre className="bg-base-200 max-h-96 overflow-auto rounded p-4 text-sm whitespace-pre-wrap">
                  {ocrText}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
