'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const WordToPdfModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Word to PDF" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Word to PDF.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">pandoc input.docx -o output.pdf</pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Requires pandoc with PDF engine.
        </p>
      </div>
    </ModalWrapper>
  );
};
WordToPdfModal.displayName = 'WordToPdfModal';
