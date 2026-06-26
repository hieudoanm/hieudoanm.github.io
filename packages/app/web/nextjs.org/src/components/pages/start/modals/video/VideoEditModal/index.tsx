'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab = 'compress' | 'trim' | 'resize' | 'mute' | 'extract-audio';

const TABS: { id: Tab; label: string; cmd: string; desc: string }[] = [
  {
    id: 'compress',
    label: 'Compress',
    cmd: 'hieudoanm video compress input.mp4',
    desc: 'Reduce video file size.',
  },
  {
    id: 'trim',
    label: 'Trim',
    cmd: 'hieudoanm video trim input.mp4 --start 00:00:10 --end 00:00:30',
    desc: 'Trim video by start and end timestamps.',
  },
  {
    id: 'resize',
    label: 'Resize',
    cmd: 'hieudoanm video resize input.mp4 --width 1280 --height 720',
    desc: 'Resize video dimensions.',
  },
  {
    id: 'mute',
    label: 'Mute',
    cmd: 'hieudoanm video mute input.mp4',
    desc: 'Remove audio track from video.',
  },
  {
    id: 'extract-audio',
    label: 'Extract Audio',
    cmd: 'hieudoanm video extractaudio input.mp4',
    desc: 'Extract audio track from video file.',
  },
];

export const VideoEditModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('compress');

  return (
    <ModalWrapper onClose={onClose} title="Video Edit" size="max-w-lg">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            className={`tab flex-1 ${tab === t.id ? 'tab-active' : ''}`}
            onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {TABS.map(
        (t) =>
          tab === t.id && (
            <div key={t.id} className="flex flex-col gap-4">
              <p className="text-sm">{t.desc}</p>
              <div className="bg-base-200 rounded p-4">
                <p className="mb-2 text-xs font-bold">CLI Command:</p>
                <pre className="text-sm">{t.cmd}</pre>
              </div>
              <p className="text-base-content/60 text-xs">
                This operation requires ffmpeg to be installed on your system.
              </p>
            </div>
          )
      )}
    </ModalWrapper>
  );
};
