'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const CreateMdToPdfModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="Markdown to PDF" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Markdown to PDF.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm pdf create --markdown input.md
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Converts Markdown file to PDF via CLI.
        </p>
      </div>
    </ModalWrapper>
  );
};
CreateMdToPdfModal.displayName = 'CreateMdToPdfModal';
