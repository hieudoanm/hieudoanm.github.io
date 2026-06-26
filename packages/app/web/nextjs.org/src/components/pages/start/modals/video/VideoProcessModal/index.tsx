'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab = 'merge' | 'speed' | 'stabilize' | 'crop' | 'webm';

const TAB_LABELS: Record<Tab, string> = {
  merge: 'Merge Videos',
  speed: 'Speed Changer',
  stabilize: 'Video Stabilizer',
  crop: 'Video Cropper',
  webm: 'Convert to WebM',
};

const CLI_INFO: Record<string, { cmd: string; note: string }> = {
  merge: {
    cmd: 'hieudoanm video merge input1.mp4 input2.mp4 -o merged.mp4',
    note: 'Concatenates multiple video files using ffmpeg.',
  },
  speed: {
    cmd: 'hieudoanm video speed input.mp4 --rate 1.5',
    note: 'Changes video playback speed. Rate 0.5 = half speed, 2.0 = double speed.',
  },
  stabilize: {
    cmd: 'hieudoanm video stabilize input.mp4',
    note: 'Stabilizes shaky video footage using ffmpeg vidstab.',
  },
  crop: {
    cmd: 'hieudoanm video crop input.mp4 --width 640 --height 480 --x 0 --y 0',
    note: 'Crops video to specified dimensions.',
  },
  webm: {
    cmd: 'hieudoanm video convert input.mp4 --to webm',
    note: 'Converts video to WebM format.',
  },
};

export const VideoProcessModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('merge');

  return (
    <ModalWrapper onClose={onClose} title="Video Process">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">{TAB_LABELS[tab]}.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">{CLI_INFO[tab].cmd}</pre>
        </div>
        <p className="text-base-content/60 text-xs">{CLI_INFO[tab].note}</p>
      </div>
    </ModalWrapper>
  );
};
