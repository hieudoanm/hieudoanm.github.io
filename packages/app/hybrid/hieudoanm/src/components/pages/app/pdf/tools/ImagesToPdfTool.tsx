'use client';

import { FC, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { PDFDocument } from 'pdf-lib';
import { downloadBlob } from '../lib/pdf';

export const ImagesToPdfTool: FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImagesToPDF = async () => {
    if (imageFiles.length === 0) return;
    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();
      for (const file of imageFiles) {
        const bytes = await file.arrayBuffer();
        const ext = file.name.split('.').pop()?.toLowerCase();
        let image;
        if (ext === 'png') image = await pdfDoc.embedPng(bytes);
        else image = await pdfDoc.embedJpg(bytes);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }
      const out = await pdfDoc.save();
      downloadBlob(
        new Blob([out as BlobPart], { type: 'application/pdf' }),
        'output.pdf'
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="rounded-box border-base-300 bg-base-200 border p-4">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Upload images (PNG/JPG) to create a PDF.</p>
        <Dropzone
          accept="image/*"
          multiple
          onFile={(f) => setImageFiles((prev) => [...prev, f])}
        />
        {imageFiles.length > 0 && (
          <p className="text-sm">{imageFiles.length} image(s) selected</p>
        )}
        <button
          className="btn btn-primary btn-sm"
          disabled={imageFiles.length === 0 || loading}
          onClick={handleImagesToPDF}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Create PDF'
          )}
        </button>
      </div>
    </div>
  );
};
