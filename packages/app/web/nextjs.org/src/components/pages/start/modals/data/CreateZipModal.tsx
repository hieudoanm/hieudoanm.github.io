'use client';
import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
export const CreateZipModal: FC<{ onClose: () => void }> = ({ onClose }) => (
  <ModalWrapper onClose={onClose} title="Create ZIP" size="max-w-lg">
    <div className="flex flex-col gap-4">
      <p className="text-sm">Create ZIP archives.</p>
      <div className="bg-base-200 rounded p-4">
        <p className="mb-2 text-xs font-bold">CLI Command:</p>
        <pre className="text-sm">zip -r archive.zip &lt;files&gt;</pre>
      </div>
      <p className="text-base-content/60 text-xs">
        Creates a ZIP archive. Use your system zip command.
      </p>
    </div>
  </ModalWrapper>
);
CreateZipModal.displayName = 'CreateZipModal';
