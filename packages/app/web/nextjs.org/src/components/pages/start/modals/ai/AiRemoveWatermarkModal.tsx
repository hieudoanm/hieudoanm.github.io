'use client';
import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
export const AiRemoveWatermarkModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => (
  <ModalWrapper onClose={onClose} title="Remove Watermark" size="max-w-lg">
    <div className="flex flex-col gap-4">
      <p className="text-sm">Remove watermarks from images.</p>
      <div className="bg-base-200 rounded p-4">
        <p className="mb-2 text-xs font-bold">CLI Command:</p>
        <pre className="text-sm">
          Uses AI inpainting or clone-stamp — try la-ma inpainting tools
        </pre>
      </div>
      <p className="text-base-content/60 text-xs">
        AI-powered image operations require external AI models or services
        installed on your system.
      </p>
    </div>
  </ModalWrapper>
);
AiRemoveWatermarkModal.displayName = 'AiRemoveWatermarkModal';
