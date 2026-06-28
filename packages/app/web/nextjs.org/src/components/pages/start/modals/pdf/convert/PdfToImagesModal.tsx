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

export const PdfToImagesModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);

  const handlePDFtoImages = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setLoading(true);
      try {
        const { pdfjs } = await import('react-pdf');
        const loadingTask = pdfjs.getDocument(await file.arrayBuffer());
        const pdf = await loadingTask.promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d')!;
          await page.render({
            canvasContext: ctx as unknown as CanvasRenderingContext2D,
            viewport,
            canvas: null,
          }).promise;
          canvas.toBlob((blob) => {
            if (blob) downloadBlob(blob, `page_${i}.png`);
          });
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    },
    []
  );

  return (
    <ModalWrapper onClose={onClose} title="PDF to Images" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          className="file-input file-input-bordered"
          onChange={handlePDFtoImages}
        />
        {loading && <span className="loading loading-spinner" />}
      </div>
    </ModalWrapper>
  );
};
PdfToImagesModal.displayName = 'PdfToImagesModal';
