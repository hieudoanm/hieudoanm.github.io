'use client';

import { FC, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

export const VideoYoutubeTextModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [url, setUrl] = useState('');

  return (
    <FullScreen centered onClose={onClose} title="YouTube to Text">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">Extract text from YouTube video audio.</p>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="input input-bordered input-sm w-full"
          />
          <button
            onClick={() => {}}
            disabled={!url}
            className="btn btn-primary btn-sm">
            Extract Text
          </button>
          <p className="text-base-content/60 text-xs">
            Requires server-side yt-dlp and Whisper. Paste URL to proceed.
          </p>
        </div>
      </div>
    </FullScreen>
  );
};
VideoYoutubeTextModal.displayName = 'VideoYoutubeTextModal';
