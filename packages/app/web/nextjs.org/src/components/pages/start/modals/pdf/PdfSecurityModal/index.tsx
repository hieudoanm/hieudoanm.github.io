'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const PdfSecurityModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="PDF Security" size="max-w-md">
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <span className="text-5xl">🔒</span>
        <p className="text-lg font-semibold">Available via CLI</p>
        <p className="text-base-content/70 text-sm">
          PDF encryption and decryption are not supported in the browser. Use
          the{' '}
          <code className="bg-base-200 rounded px-2 py-0.5">
            hieudoanm pdf security encrypt/decrypt
          </code>{' '}
          CLI commands instead.
        </p>
      </div>
    </ModalWrapper>
  );
};
PdfSecurityModal.displayName = 'PdfSecurityModal';
