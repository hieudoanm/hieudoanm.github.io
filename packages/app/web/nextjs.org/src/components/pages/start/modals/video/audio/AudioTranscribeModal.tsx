'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const AudioTranscribeModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="Transcribe Audio">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Transcribe speech from an audio file to text using a local
          speech-to-text engine.
        </p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">hieudoanm video transcribe input.mp3</pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires ffmpeg and a speech-to-text engine to be
          installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
AudioTranscribeModal.displayName = 'AudioTranscribeModal';
