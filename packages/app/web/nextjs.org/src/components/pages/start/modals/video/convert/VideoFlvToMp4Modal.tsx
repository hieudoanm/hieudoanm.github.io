'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoFlvToMp4Modal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="FLV to MP4">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Convert FLV (Flash Video) files to MP4 format.
        </p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            ffmpeg -i input.flv -c:v libx264 -c:a aac output.mp4
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires ffmpeg to be installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoFlvToMp4Modal.displayName = 'VideoFlvToMp4Modal';
