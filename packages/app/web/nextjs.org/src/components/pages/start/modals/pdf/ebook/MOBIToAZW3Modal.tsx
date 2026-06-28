'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const MOBIToAZW3Modal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="MOBI to AZW3" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert MOBI ebooks to AZW3 format (Kindle).</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm data ebook input.mobi output.azw3
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Requires calibre (ebook-convert) installed.
        </p>
      </div>
    </ModalWrapper>
  );
};
MOBIToAZW3Modal.displayName = 'MOBIToAZW3Modal';
