'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoToGifModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Video to GIF">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert video to animated GIF.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">hieudoanm video togif input.mp4</pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires ffmpeg to be installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoToGifModal.displayName = 'VideoToGifModal';
