'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { getPDFInfo, PDFInfo } from '../../utils/pdf';

export const PdfInfoModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<PDFInfo | null>(null);

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
    <ModalWrapper onClose={onClose} title="PDF Info" size="max-w-lg">
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
      </div>
    </ModalWrapper>
  );
};
PdfInfoModal.displayName = 'PdfInfoModal';
