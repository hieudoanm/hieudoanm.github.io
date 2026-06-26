'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { PDFDocument } from 'pdf-lib';

type Tab =
  | 'pdf-to-word'
  | 'word-to-pdf'
  | 'pdf-to-ppt'
  | 'ppt-to-pdf'
  | 'pdf-to-excel'
  | 'epub-to-pdf'
  | 'pdf-to-epub'
  | 'url-to-pdf'
  | 'images-to-pdf'
  | 'pdf-to-images';

const TAB_LABELS: Record<Tab, string> = {
  'pdf-to-word': 'PDF to Word',
  'word-to-pdf': 'Word to PDF',
  'pdf-to-ppt': 'PDF to PPT',
  'ppt-to-pdf': 'PPT to PDF',
  'pdf-to-excel': 'PDF to Excel',
  'epub-to-pdf': 'EPUB to PDF',
  'pdf-to-epub': 'PDF to EPUB',
  'url-to-pdf': 'URL to PDF',
  'images-to-pdf': 'Images to PDF',
  'pdf-to-images': 'PDF to Images',
};

const CLI_ONLY: Record<string, { cmd: string; note: string }> = {
  'pdf-to-word': {
    cmd: 'Use pandoc: pandoc input.pdf -o output.docx',
    note: 'Requires pandoc to be installed.',
  },
  'word-to-pdf': {
    cmd: 'pandoc input.docx -o output.pdf',
    note: 'Requires pandoc with PDF engine.',
  },
  'pdf-to-ppt': {
    cmd: 'Use pdfcpu + pandoc workflow',
    note: 'Extract text first, then convert to PPTX.',
  },
  'ppt-to-pdf': {
    cmd: 'pandoc input.pptx -o output.pdf',
    note: 'Requires pandoc or LibreOffice.',
  },
  'pdf-to-excel': {
    cmd: 'hieudoanm pdf extract text input.pdf',
    note: 'Extract tables first, then use hieudoanm data excel.',
  },
  'epub-to-pdf': {
    cmd: 'hieudoanm data ebook input.epub output.pdf',
    note: 'Requires calibre (ebook-convert) installed.',
  },
  'pdf-to-epub': {
    cmd: 'hieudoanm data ebook input.pdf output.epub',
    note: 'Requires calibre (ebook-convert) installed.',
  },
  'url-to-pdf': {
    cmd: 'hieudoanm web simplify md URL | hieudoanm pdf create --file -',
    note: 'Fetches URL and creates PDF from content.',
  },
};

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const PdfConvertModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('pdf-to-word');
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
    <ModalWrapper
      onClose={onClose}
      title="PDF Convert"
      size={
        tab === 'images-to-pdf' || tab === 'pdf-to-images'
          ? 'max-w-lg'
          : 'max-w-md'
      }>
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {tab === 'images-to-pdf' && (
        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            multiple
            className="file-input file-input-bordered"
            onChange={(e) => setImageFiles(Array.from(e.target.files ?? []))}
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
      )}

      {tab === 'pdf-to-images' && (
        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept=".pdf"
            className="file-input file-input-bordered"
            onChange={handlePDFtoImages}
          />
          {loading && <span className="loading loading-spinner" />}
        </div>
      )}

      {tab in CLI_ONLY && (
        <div className="flex flex-col gap-4">
          <p className="text-sm">{TAB_LABELS[tab]}.</p>
          <div className="bg-base-200 rounded p-4">
            <p className="mb-2 text-xs font-bold">CLI Command:</p>
            <pre className="text-sm">{CLI_ONLY[tab].cmd}</pre>
          </div>
          <p className="text-base-content/60 text-xs">{CLI_ONLY[tab].note}</p>
        </div>
      )}
    </ModalWrapper>
  );
};
PdfConvertModal.displayName = 'PdfConvertModal';
