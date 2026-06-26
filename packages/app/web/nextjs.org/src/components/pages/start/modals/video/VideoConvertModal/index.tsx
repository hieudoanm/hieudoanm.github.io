'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab =
  | 'mov-to-mp4'
  | 'mkv-to-mp4'
  | 'video-to-webp'
  | 'mp4-to-mp3'
  | 'm4a-to-mp3'
  | 'video-to-gif'
  | 'avi-to-mp4'
  | 'flv-to-mp4'
  | 'wmv-to-mp4'
  | 'extract-frames';

const TABS: { id: Tab; label: string; cmd: string; desc: string }[] = [
  {
    id: 'mov-to-mp4',
    label: 'MOV to MP4',
    cmd: 'hieudoanm video convert input.mov output.mp4',
    desc: 'Convert MOV files to MP4 format.',
  },
  {
    id: 'mkv-to-mp4',
    label: 'MKV to MP4',
    cmd: 'hieudoanm video convert input.mkv output.mp4',
    desc: 'Convert MKV files to MP4 format.',
  },
  {
    id: 'video-to-webp',
    label: 'Video to WebP',
    cmd: 'hieudoanm video convert input.mp4 output.webp',
    desc: 'Convert video files to WebP format.',
  },
  {
    id: 'mp4-to-mp3',
    label: 'MP4 to MP3',
    cmd: 'hieudoanm video tomp3 input.mp4',
    desc: 'Extract audio from MP4 as MP3.',
  },
  {
    id: 'm4a-to-mp3',
    label: 'M4A to MP3',
    cmd: 'ffmpeg -i input.m4a -codec:a libmp3lame -qscale:a 2 output.mp3',
    desc: 'Convert M4A audio to MP3 format.',
  },
  {
    id: 'video-to-gif',
    label: 'Video to GIF',
    cmd: 'hieudoanm video togif input.mp4',
    desc: 'Convert video to animated GIF.',
  },
  {
    id: 'avi-to-mp4',
    label: 'AVI to MP4',
    cmd: 'ffmpeg -i input.avi -c:v libx264 -c:a aac output.mp4',
    desc: 'Convert AVI files to MP4 format with H.264 video and AAC audio.',
  },
  {
    id: 'flv-to-mp4',
    label: 'FLV to MP4',
    cmd: 'ffmpeg -i input.flv -c:v libx264 -c:a aac output.mp4',
    desc: 'Convert FLV (Flash Video) files to MP4 format.',
  },
  {
    id: 'wmv-to-mp4',
    label: 'WMV to MP4',
    cmd: 'ffmpeg -i input.wmv -c:v libx264 -c:a aac output.mp4',
    desc: 'Convert WMV (Windows Media Video) files to MP4 format.',
  },
  {
    id: 'extract-frames',
    label: 'Extract Frames',
    cmd: 'ffmpeg -i input.mp4 -vf fps=1 frame_%04d.png',
    desc: 'Extract video frames as individual PNG images (1 frame per second by default).',
  },
];

export const VideoConvertModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('mov-to-mp4');

  return (
    <ModalWrapper onClose={onClose} title="Video Convert" size="max-w-lg">
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
VideoConvertModal.displayName = 'VideoConvertModal';
