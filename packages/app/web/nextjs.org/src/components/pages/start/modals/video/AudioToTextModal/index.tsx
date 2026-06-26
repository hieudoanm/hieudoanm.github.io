'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const TABS = ['transcribe', 'subtitle'] as const;
type Tab = (typeof TABS)[number];

const TAB_LABELS: Record<Tab, string> = {
  transcribe: 'Transcribe Audio',
  subtitle: 'Generate Subtitles',
};

const CLI_CMDS: Record<Tab, { cmd: string; desc: string }> = {
  transcribe: {
    cmd: 'hieudoanm video transcribe input.mp3',
    desc: 'Transcribe speech from an audio file to text using a local speech-to-text engine.',
  },
  subtitle: {
    cmd: 'ffmpeg -i input.mp4 -vf subtitles=subtitles.srt output.mp4',
    desc: 'Generate SRT subtitle file from audio, then burn into video.',
  },
};

export const AudioToTextModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('transcribe');

  const current = CLI_CMDS[tab];

  return (
    <ModalWrapper onClose={onClose} title="Audio to Text">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab flex-1 ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">{current.desc}</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">{current.cmd}</pre>
        </div>
        <p className="text-base-content/60 text-xs">
          This operation requires ffmpeg and a speech-to-text engine to be
          installed on your system.
        </p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">Alternative: Web Speech API</p>
          <p className="text-base-content/60 text-xs">
            For browser-based transcription without external tools, you can use
            the built-in Web Speech API. Open the browser console and run:
          </p>
          <pre className="mt-1 text-xs">
            {`const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.onresult = (e) => console.log(e.results[0][0].transcript);
recognition.start();`}
          </pre>
        </div>
      </div>
    </ModalWrapper>
  );
};
