'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoMuteModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Mute Video">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Remove audio track from video.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">hieudoanm video mute input.mp4</pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires ffmpeg to be installed on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
VideoMuteModal.displayName = 'VideoMuteModal';
