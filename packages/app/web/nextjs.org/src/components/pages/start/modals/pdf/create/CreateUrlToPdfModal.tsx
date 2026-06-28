'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const CreateUrlToPdfModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="URL to PDF" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">URL to PDF.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm web simplify md &lt;url&gt; | hieudoanm pdf create --file
            -
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Fetches URL content, converts to PDF via CLI.
        </p>
      </div>
    </ModalWrapper>
  );
};
CreateUrlToPdfModal.displayName = 'CreateUrlToPdfModal';
