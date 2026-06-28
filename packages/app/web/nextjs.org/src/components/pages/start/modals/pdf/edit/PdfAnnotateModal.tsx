'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const PdfAnnotateModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Annotate PDF" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Annotate.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm pdf annotate input.pdf --text "Note" --page 1 --x 100 --y
            100
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Adds text annotations via pdfcpu CLI.
        </p>
      </div>
    </ModalWrapper>
  );
};
PdfAnnotateModal.displayName = 'PdfAnnotateModal';
