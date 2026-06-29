'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const VideoYoutubeTranscriptModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [url, setUrl] = useState('');
  const [note] = useState(
    'Enter a YouTube video URL. Downloading requires a server-side component. For now, copy the URL and use yt-dlp externally.'
  );

  return (
    <ModalWrapper onClose={onClose} title="YouTube Transcript">
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
    </ModalWrapper>
  );
};
VideoYoutubeTranscriptModal.displayName = 'VideoYoutubeTranscriptModal';
