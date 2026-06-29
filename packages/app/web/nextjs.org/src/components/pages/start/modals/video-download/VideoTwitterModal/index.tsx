'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoTwitterModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [url, setUrl] = useState('');

  return (
    <ModalWrapper onClose={onClose} title="Twitter/X Download">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Download Twitter/X video. Requires server-side yt-dlp.
        </p>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://twitter.com/user/status/..."
          className="input input-bordered input-sm w-full"
        />
        <button
          onClick={() => {}}
          disabled={!url}
          className="btn btn-primary btn-sm">
          Download
        </button>
        <p className="text-base-content/60 text-xs">
          Paste a Twitter/X video URL to download via server-side component.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoTwitterModal.displayName = 'VideoTwitterModal';
