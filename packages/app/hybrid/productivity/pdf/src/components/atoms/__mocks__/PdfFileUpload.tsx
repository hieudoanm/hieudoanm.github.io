import { PDFDocument } from 'pdf-lib';

let pdfBytes: Uint8Array | null = null;

const getPdfBytes = async () => {
  if (!pdfBytes) {
    const doc = await PDFDocument.create();
    doc.addPage([595, 842]);
    doc.addPage([595, 842]);
    pdfBytes = await doc.save();
  }
  return pdfBytes;
};

interface FakeFile {
  name: string;
  type: string;
  size: number;
  arrayBuffer: () => Promise<ArrayBuffer>;
}

let createFile: (name: string) => FakeFile = (name) => ({
  name,
  type: 'application/pdf',
  size: 1024,
  arrayBuffer: async () => (await getPdfBytes()).slice().buffer,
});

export const __setFile = (fn: (name: string) => FakeFile) => {
  createFile = fn;
};

let fileNames = ['a.pdf'];

export const __setNames = (names: string[]) => {
  fileNames = names;
};

export const PdfFileUpload = ({ onFile, multiple }: any) => (
  <button
    onClick={() => {
      const names = multiple ? fileNames : fileNames.slice(0, 1);
      names.forEach((name) => onFile(createFile(name)));
    }}>
    PdfFileUpload
  </button>
);
