'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const EpubToPdfModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="EPUB to PDF" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">EPUB to PDF.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm data ebook input.epub output.pdf
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Requires calibre (ebook-convert) installed.
        </p>
      </div>
    </ModalWrapper>
  );
};
EpubToPdfModal.displayName = 'EpubToPdfModal';
