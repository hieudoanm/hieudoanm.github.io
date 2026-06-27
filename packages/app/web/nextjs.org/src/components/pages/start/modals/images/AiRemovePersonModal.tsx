'use client';
import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
export const AiRemovePersonModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => (
  <ModalWrapper onClose={onClose} title="Remove Person" size="max-w-lg">
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Remove a person from a photo using AI inpainting.
      </p>
      <div className="bg-base-200 rounded p-4">
        <p className="mb-2 text-xs font-bold">CLI Command:</p>
        <pre className="text-sm">rembg -o output.png input.png</pre>
      </div>
      <p className="text-base-content/60 text-xs">
        AI-powered image operations require external AI models or services
        installed on your system.
      </p>
    </div>
  </ModalWrapper>
);
AiRemovePersonModal.displayName = 'AiRemovePersonModal';
