'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoYoutubeTextModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="YouTube to Text">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Extracts text from YouTube video audio via Whisper.
        </p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm video youtube text &lt;url&gt;
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires yt-dlp and Whisper to be installed on your
          system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoYoutubeTextModal.displayName = 'VideoYoutubeTextModal';
