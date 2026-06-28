'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const EPUBToMOBIModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="EPUB to MOBI" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert EPUB ebooks to MOBI format (Kindle).</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm data ebook input.epub output.mobi
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Requires calibre (ebook-convert) installed.
        </p>
      </div>
    </ModalWrapper>
  );
};
EPUBToMOBIModal.displayName = 'EPUBToMOBIModal';
