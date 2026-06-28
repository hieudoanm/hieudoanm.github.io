'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const PdfPageNumbersModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="Page Numbers" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Page Numbers.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            {
              'hieudoanm pdf addnumbers input.pdf --format "Page {n} of {total}"'
            }
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Adds page numbers via pdfcpu CLI.
        </p>
      </div>
    </ModalWrapper>
  );
};
PdfPageNumbersModal.displayName = 'PdfPageNumbersModal';
