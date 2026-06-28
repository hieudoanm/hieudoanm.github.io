'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoMp4ToMp3Modal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="MP4 to MP3">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Extract audio from MP4 as MP3.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">hieudoanm video tomp3 input.mp4</pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires ffmpeg to be installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoMp4ToMp3Modal.displayName = 'VideoMp4ToMp3Modal';
