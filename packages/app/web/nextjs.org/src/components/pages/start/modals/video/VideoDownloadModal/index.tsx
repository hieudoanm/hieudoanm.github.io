'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab =
  | 'instagram'
  | 'tiktok'
  | 'twitter'
  | 'facebook'
  | 'youtube-text'
  | 'youtube-transcript';

const TAB_LABELS: Record<Tab, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  twitter: 'Twitter/X',
  facebook: 'Facebook',
  'youtube-text': 'YouTube to Text',
  'youtube-transcript': 'YouTube Transcript',
};

const CLI_INFO: Record<string, { cmd: string; note: string }> = {
  instagram: {
    cmd: 'hieudoanm video download instagram <url>',
    note: 'Downloads Instagram video/reel. Requires yt-dlp.',
  },
  tiktok: {
    cmd: 'hieudoanm video download tiktok <url>',
    note: 'Downloads TikTok video. Requires yt-dlp.',
  },
  twitter: {
    cmd: 'hieudoanm video download twitter <url>',
    note: 'Downloads Twitter/X video. Requires yt-dlp.',
  },
  facebook: {
    cmd: 'hieudoanm video download facebook <url>',
    note: 'Downloads Facebook video. Requires yt-dlp.',
  },
  'youtube-text': {
    cmd: 'hieudoanm video youtube text <url>',
    note: 'Extracts text from YouTube video audio via Whisper.',
  },
  'youtube-transcript': {
    cmd: 'hieudoanm video youtube transcript <url>',
    note: 'Fetches YouTube transcript/subtitles.',
  },
};

export const VideoDownloadModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [tab, setTab] = useState<Tab>('instagram');

  return (
    <ModalWrapper onClose={onClose} title="Video Download">
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
