'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoM4aToWavModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="M4A to WAV">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert M4A audio to WAV format.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm video convert input.m4a output.wav
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Requires ffmpeg installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoM4aToWavModal.displayName = 'VideoM4aToWavModal';
