'use client';

import { FC, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';

export const PdfToImagesTool: FC = () => {
  const [loading, setLoading] = useState(false);

  const handlePDFtoImages = async (file: File) => {
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
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `page_${i}.png`;
            a.click();
            URL.revokeObjectURL(url);
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="rounded-box border-base-300 bg-base-200 border p-4">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Render each PDF page as a PNG image.</p>
        <Dropzone accept=".pdf" onFile={handlePDFtoImages} />
        {loading && <span className="loading loading-spinner" />}
      </div>
    </div>
  );
};
