'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { extractText, extractImages, downloadBlob } from '../utils/pdf';

type Tab = 'text' | 'images';

export const PdfExtractModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('text');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleExtractText = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const result = await extractText(file);
      setText(result);
    } finally {
      setLoading(false);
    }
  };

  const handleExtractImages = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const blobs = await extractImages(file);
      const urls = blobs.map((b) => URL.createObjectURL(b));
      setImagePreviews((prev) => {
        prev.forEach((u) => URL.revokeObjectURL(u));
        return urls;
      });
    } finally {
      setLoading(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    downloadBlob(blob, `${file?.name ?? 'extracted'}.txt`);
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="PDF Extract"
      size="max-w-3xl"
      fullHeight>
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full">
        <button
          role="tab"
          className={`tab flex-1 ${tab === 'text' ? 'tab-active' : ''}`}
          onClick={() => setTab('text')}>
          Text
        </button>
        <button
          role="tab"
          className={`tab flex-1 ${tab === 'images' ? 'tab-active' : ''}`}
          onClick={() => setTab('images')}>
          Images
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          className="file-input file-input-bordered"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setText('');
            setImagePreviews((prev) => {
              prev.forEach((u) => URL.revokeObjectURL(u));
              return [];
            });
          }}
        />

        {tab === 'text' && file && (
          <>
            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={handleExtractText}>
              {loading ? 'Extracting...' : 'Extract Text'}
            </button>
            {text && (
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
                  {text}
                </pre>
              </div>
            )}
          </>
        )}

        {tab === 'images' && file && (
          <>
            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={handleExtractImages}>
              {loading ? 'Extracting...' : 'Extract Images (as page snapshots)'}
            </button>
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {imagePreviews.map((url, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <img
                      src={url}
                      alt={`Page ${i + 1}`}
                      className="rounded border"
                    />
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `page_${i + 1}.png`;
                        a.click();
                      }}>
                      Download Page {i + 1}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </ModalWrapper>
  );
};
PdfExtractModal.displayName = 'PdfExtractModal';
