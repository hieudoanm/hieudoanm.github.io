'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoFacebookModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="Facebook Download">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Downloads Facebook video. Requires yt-dlp.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm video download facebook &lt;url&gt;
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires yt-dlp to be installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoFacebookModal.displayName = 'VideoFacebookModal';
