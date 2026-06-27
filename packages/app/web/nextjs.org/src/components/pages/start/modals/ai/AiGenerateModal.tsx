'use client';
import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
export const AiGenerateModal: FC<{ onClose: () => void }> = ({ onClose }) => (
  <ModalWrapper onClose={onClose} title="AI Generate" size="max-w-lg">
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Generate images from text descriptions using AI.
      </p>
      <div className="bg-base-200 rounded p-4">
        <p className="mb-2 text-xs font-bold">CLI Command:</p>
        <pre className="text-sm">
          Uses AI image generation — try Stable Diffusion or DALL-E via
          OpenRouter
        </pre>
      </div>
      <p className="text-base-content/60 text-xs">
        AI-powered image operations require external AI models or services
        installed on your system.
      </p>
    </div>
  </ModalWrapper>
);
AiGenerateModal.displayName = 'AiGenerateModal';
