'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoM4aToMp3Modal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="M4A to MP3">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert M4A audio to MP3 format.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            ffmpeg -i input.m4a -codec:a libmp3lame -qscale:a 2 output.mp3
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires ffmpeg to be installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoM4aToMp3Modal.displayName = 'VideoM4aToMp3Modal';
