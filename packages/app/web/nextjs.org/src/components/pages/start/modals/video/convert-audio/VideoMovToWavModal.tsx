'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoMovToWavModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="MOV to WAV">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Extract audio from MOV as WAV.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm video extract-audio input.mov output.wav
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Requires ffmpeg installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoMovToWavModal.displayName = 'VideoMovToWavModal';
