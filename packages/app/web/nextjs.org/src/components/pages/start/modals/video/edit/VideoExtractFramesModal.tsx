'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoExtractFramesModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="Extract Frames">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Extract video frames as individual PNG images (1 frame per second by
          default).
        </p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            ffmpeg -i input.mp4 -vf fps=1 frame_%04d.png
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires ffmpeg to be installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoExtractFramesModal.displayName = 'VideoExtractFramesModal';
