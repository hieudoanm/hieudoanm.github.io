'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoSpeedModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Speed Changer">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Changes video playback speed. Rate 0.5 = half speed, 2.0 = double
          speed.
        </p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm video speed input.mp4 --rate 1.5
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires ffmpeg to be installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoSpeedModal.displayName = 'VideoSpeedModal';
