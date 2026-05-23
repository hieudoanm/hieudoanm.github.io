'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoFacebookModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [url, setUrl] = useState('');

  return (
    <ModalWrapper onClose={onClose} title="Facebook Download">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Download Facebook video. Requires server-side yt-dlp.
        </p>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://facebook.com/watch?v=..."
          className="input input-bordered input-sm w-full"
        />
        <button
          onClick={() => {}}
          disabled={!url}
          className="btn btn-primary btn-sm">
          Download
        </button>
        <p className="text-base-content/60 text-xs">
          Paste a Facebook video URL to download via server-side component.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoFacebookModal.displayName = 'VideoFacebookModal';
