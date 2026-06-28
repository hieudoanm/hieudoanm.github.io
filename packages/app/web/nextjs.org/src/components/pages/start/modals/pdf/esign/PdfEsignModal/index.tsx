'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const CLI_CMD =
  'hieudoanm pdf sign input.pdf --signature sig.png --page 1 --x 100 --y 100';
const CLI_NOTE =
  'Adds a signature image to a PDF page. Create a signature image first (white bg, dark ink), then position it on the desired page.';

export const PdfEsignModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="PDF eSign">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Add an electronic signature to any PDF document.
        </p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">{CLI_CMD}</pre>
        </div>
        <p className="text-base-content/60 text-xs">{CLI_NOTE}</p>
        <div className="bg-base-200 mt-2 rounded p-4">
          <p className="mb-2 text-xs font-bold">Workflow:</p>
          <ol className="list-inside list-decimal space-y-1 text-xs">
            <li>Sign on white paper, take a photo</li>
            <li>Crop and convert to PNG via image tools</li>
            <li>Use CLI to place signature on the PDF</li>
            <li>Output is a new PDF with signature embedded</li>
          </ol>
        </div>
      </div>
    </ModalWrapper>
  );
};
PdfEsignModal.displayName = 'PdfEsignModal';
