'use client';

import { FC, useState, useCallback } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

export const VideoYoutubeTranscriptModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [url, setUrl] = useState('');
  const [note] = useState(
    'Enter a YouTube video URL. Downloading requires a server-side component. For now, copy the URL and use yt-dlp externally.'
  );

  return (
    <FullScreen centered onClose={onClose} title="YouTube Transcript">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">Fetch YouTube transcript/subtitles.</p>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="input input-bordered input-sm w-full"
          />
          <button
            onClick={() => {}}
            disabled={!url}
            className="btn btn-primary btn-sm">
            Fetch Transcript
          </button>
          <p className="text-base-content/60 text-xs">{note}</p>
        </div>
      </div>
    </FullScreen>
  );
};
VideoYoutubeTranscriptModal.displayName = 'VideoYoutubeTranscriptModal';
