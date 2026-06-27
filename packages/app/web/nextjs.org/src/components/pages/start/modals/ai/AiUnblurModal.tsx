'use client';
import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
export const AiUnblurModal: FC<{ onClose: () => void }> = ({ onClose }) => (
  <ModalWrapper onClose={onClose} title="Unblur" size="max-w-lg">
    <div className="flex flex-col gap-4">
      <p className="text-sm">Sharpen and deblur blurred images.</p>
      <div className="bg-base-200 rounded p-4">
        <p className="mb-2 text-xs font-bold">CLI Command:</p>
        <pre className="text-sm">
          hieudoanm image sharpen input.jpg output.jpg
        </pre>
      </div>
      <p className="text-base-content/60 text-xs">
        AI-powered image operations require external AI models or services
        installed on your system.
      </p>
    </div>
  </ModalWrapper>
);
AiUnblurModal.displayName = 'AiUnblurModal';
