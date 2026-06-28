'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const GenerateSubtitleModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="Generate Subtitles">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Generate SRT subtitle file from audio, then burn into video.
        </p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            ffmpeg -i input.mp4 -vf subtitles=subtitles.srt output.mp4
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires ffmpeg to be installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
GenerateSubtitleModal.displayName = 'GenerateSubtitleModal';
