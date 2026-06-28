'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoOggToMp3Modal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="OGG to MP3">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert OGG audio to MP3 format.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm video convert input.ogg output.mp3
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Requires ffmpeg installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoOggToMp3Modal.displayName = 'VideoOggToMp3Modal';
