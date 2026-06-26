'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import {
  getPDFInfo,
  setPDFMetadata,
  PDFInfo,
  downloadBlob,
} from '../utils/pdf';

type Tab = 'info' | 'metadata';

export const PdfInspectModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('info');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<PDFInfo | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [keywords, setKeywords] = useState('');

  const formatBytes = (b: number) =>
    b > 1_000_000
      ? `${(b / 1_000_000).toFixed(1)} MB`
      : b > 1_000
        ? `${(b / 1_000).toFixed(1)} KB`
        : `${b} B`;

  const handleLoadInfo = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const pdfInfo = await getPDFInfo(file);
      setInfo(pdfInfo);
      setTitle(pdfInfo.title);
      setAuthor(pdfInfo.author);
      setSubject(pdfInfo.subject);
      setKeywords(pdfInfo.keywords.join(', '));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMetadata = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await setPDFMetadata(file, {
        title: title || undefined,
        author: author || undefined,
        subject: subject || undefined,
        keywords: keywords || undefined,
      });
      downloadBlob(bytes, 'metadata_updated.pdf');
    } finally {
      setLoading(false);
    }
  };

  const infoRows = info
    ? [
        ['Pages', String(info.pageCount)],
        ['Title', info.title || '(none)'],
        ['Author', info.author || '(none)'],
        ['Subject', info.subject || '(none)'],
        ['Keywords', info.keywords.join(', ') || '(none)'],
        ['File Size', formatBytes(info.fileSize)],
      ]
    : [];

  return (
    <ModalWrapper onClose={onClose} title="PDF Inspect" size="max-w-lg">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full">
        <button
          role="tab"
          className={`tab flex-1 ${tab === 'info' ? 'tab-active' : ''}`}
          onClick={() => setTab('info')}>
          Info
        </button>
        <button
          role="tab"
          className={`tab flex-1 ${tab === 'metadata' ? 'tab-active' : ''}`}
          onClick={() => setTab('metadata')}>
          Metadata
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          className="file-input file-input-bordered"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setInfo(null);
          }}
        />

        {tab === 'info' && (
          <>
            <button
              className="btn btn-primary"
              disabled={!file || loading}
              onClick={handleLoadInfo}>
              {loading ? 'Loading...' : 'Load Info'}
            </button>
            {infoRows.length > 0 && (
              <table className="table-sm table">
                <tbody>
                  {infoRows.map(([label, value]) => (
                    <tr key={label}>
                      <td className="font-medium">{label}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {tab === 'metadata' && (
          <>
            <button
              className="btn btn-primary"
              disabled={!file || loading}
              onClick={handleLoadInfo}>
              {loading ? 'Loading...' : 'Load Metadata'}
            </button>
            {info && (
              <div className="flex flex-col gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-sm">Title:</span>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm">Author:</span>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm">Subject:</span>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm">Keywords:</span>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </label>
                <button
                  className="btn btn-primary"
                  disabled={loading}
                  onClick={handleSaveMetadata}>
                  {loading ? 'Saving...' : 'Save & Download'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </ModalWrapper>
  );
};
