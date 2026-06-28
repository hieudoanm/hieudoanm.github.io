'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const PdfToPptModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="PDF to PPT" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">PDF to PPT.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">Use pdfcpu + pandoc workflow</pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Extract text first, then convert to PPTX.
        </p>
      </div>
    </ModalWrapper>
  );
};
PdfToPptModal.displayName = 'PdfToPptModal';
