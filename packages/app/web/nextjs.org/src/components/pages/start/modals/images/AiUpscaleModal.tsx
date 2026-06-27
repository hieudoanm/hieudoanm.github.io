'use client';
import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
export const AiUpscaleModal: FC<{ onClose: () => void }> = ({ onClose }) => (
  <ModalWrapper onClose={onClose} title="Upscale" size="max-w-lg">
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Increase image resolution using AI super-resolution.
      </p>
      <div className="bg-base-200 rounded p-4">
        <p className="mb-2 text-xs font-bold">CLI Command:</p>
        <pre className="text-sm">
          Uses AI upscaling — try Real-ESRGAN or ESRGAN
        </pre>
      </div>
      <p className="text-base-content/60 text-xs">
        AI-powered image operations require external AI models or services
        installed on your system.
      </p>
    </div>
  </ModalWrapper>
);
AiUpscaleModal.displayName = 'AiUpscaleModal';
