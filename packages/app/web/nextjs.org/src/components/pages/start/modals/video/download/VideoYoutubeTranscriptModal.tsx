'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoYoutubeTranscriptModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="YouTube Transcript">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Fetches YouTube transcript/subtitles.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm video youtube transcript &lt;url&gt;
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires yt-dlp to be installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoYoutubeTranscriptModal.displayName = 'VideoYoutubeTranscriptModal';
