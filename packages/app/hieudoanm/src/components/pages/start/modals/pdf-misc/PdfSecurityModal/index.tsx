'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';

export const PdfSecurityModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProcess = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuf = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuf);
      if (title) pdfDoc.setTitle(title);
      if (author) pdfDoc.setAuthor(author);
      if (subject) pdfDoc.setSubject(subject);
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], {
        type: 'application/pdf',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, '_metadata.pdf');
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update metadata'
      );
    }
    setLoading(false);
  }, [file, title, author, subject]);

  return (
    <ModalWrapper onClose={onClose} title="PDF Metadata" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Edit PDF document metadata (title, author, subject).
        </p>

        <Dropzone accept=".pdf" onFile={(f) => setFile(f)} />

        <input
          type="text"
          className="input input-bordered text-sm"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          className="input input-bordered text-sm"
          placeholder="Author (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          type="text"
          className="input input-bordered text-sm"
          placeholder="Subject (optional)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        {error && <p className="text-base-content/60 text-xs">{error}</p>}

        <button
          className="btn btn-primary btn-sm"
          disabled={!file || loading}
          onClick={handleProcess}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Update Metadata'
          )}
        </button>

        <p className="text-base-content/40 text-center text-xs">
          Changes are embedded in the PDF as XMP metadata.
        </p>
      </div>
    </ModalWrapper>
  );
};
PdfSecurityModal.displayName = 'PdfSecurityModal';
