'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const PdfCropModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Crop PDF" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Crop.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm pdf crop input.pdf --bbox "0 0 400 600"
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          PDF cropping requires pdfcpu CLI.
        </p>
      </div>
    </ModalWrapper>
  );
};
PdfCropModal.displayName = 'PdfCropModal';
