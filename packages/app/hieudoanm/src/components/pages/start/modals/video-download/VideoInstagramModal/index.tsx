'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoInstagramModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [url, setUrl] = useState('');

  return (
    <ModalWrapper onClose={onClose} title="Instagram Download">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Download Instagram video/reel. Requires server-side yt-dlp.
        </p>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://instagram.com/p/..."
          className="input input-bordered input-sm w-full"
        />
        <button
          onClick={() => {}}
          disabled={!url}
          className="btn btn-primary btn-sm">
          Download
        </button>
        <p className="text-base-content/60 text-xs">
          Paste an Instagram video/reel URL to download via server-side
          component.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoInstagramModal.displayName = 'VideoInstagramModal';
