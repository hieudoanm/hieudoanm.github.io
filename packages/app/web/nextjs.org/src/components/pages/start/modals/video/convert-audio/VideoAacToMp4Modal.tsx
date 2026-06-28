'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoAacToMp4Modal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="AAC to MP4">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert AAC audio to MP4 with silent video.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm video convert input.aac output.mp4
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Requires ffmpeg installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoAacToMp4Modal.displayName = 'VideoAacToMp4Modal';
