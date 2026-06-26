'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab =
  | 'mp4-to-mp3'
  | 'extract-audio'
  | 'audio-to-text'
  | 'video-to-gif'
  | 'mute';

const TAB_LABELS: Record<Tab, string> = {
  'mp4-to-mp3': 'MP4 to MP3',
  'extract-audio': 'Extract Audio',
  'audio-to-text': 'Audio to Text',
  'video-to-gif': 'Video to GIF',
  mute: 'Mute Video',
};

const CLI_INFO: Record<string, { cmd: string; note: string }> = {
  'mp4-to-mp3': {
    cmd: 'hieudoanm video convert input.mp4 --to mp3',
    note: 'Converts MP4 to MP3 audio.',
  },
  'extract-audio': {
    cmd: 'hieudoanm video extract audio input.mp4',
    note: 'Extracts audio track from video.',
  },
  'audio-to-text': {
    cmd: 'hieudoanm video transcribe input.mp3',
    note: 'Transcribes audio to text via Whisper.',
  },
  'video-to-gif': {
    cmd: 'hieudoanm video convert input.mp4 --to gif',
    note: 'Converts video clip to animated GIF.',
  },
  mute: {
    cmd: 'hieudoanm video mute input.mp4',
    note: 'Removes audio track from video.',
  },
};

export const VideoAudioModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('mp4-to-mp3');

  return (
    <ModalWrapper onClose={onClose} title="Video Audio">
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
