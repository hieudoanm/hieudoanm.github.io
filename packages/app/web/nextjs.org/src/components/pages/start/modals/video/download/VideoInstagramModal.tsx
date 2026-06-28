'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoInstagramModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="Instagram Download">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Downloads Instagram video/reel. Requires yt-dlp.
        </p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm video download instagram &lt;url&gt;
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires yt-dlp to be installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoInstagramModal.displayName = 'VideoInstagramModal';
