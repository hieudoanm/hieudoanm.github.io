'use client';

import { FC, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

export const VideoTikTokModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [url, setUrl] = useState('');

  return (
    <FullScreen centered onClose={onClose} title="TikTok Download">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            Download TikTok video. Requires server-side yt-dlp.
          </p>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://tiktok.com/@user/video/..."
            className="input input-bordered input-sm w-full"
          />
          <button
            onClick={() => {}}
            disabled={!url}
            className="btn btn-primary btn-sm">
            Download
          </button>
          <p className="text-base-content/60 text-xs">
            Paste a TikTok video URL to download via server-side component.
          </p>
        </div>
      </div>
    </FullScreen>
  );
};
VideoTikTokModal.displayName = 'VideoTikTokModal';
