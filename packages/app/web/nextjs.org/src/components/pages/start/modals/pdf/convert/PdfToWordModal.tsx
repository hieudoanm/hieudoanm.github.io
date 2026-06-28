'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const PdfToWordModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="PDF to Word" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">PDF to Word.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            Use pandoc: pandoc input.pdf -o output.docx
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Requires pandoc to be installed.
        </p>
      </div>
    </ModalWrapper>
  );
};
PdfToWordModal.displayName = 'PdfToWordModal';
