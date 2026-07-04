'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob, encodeWav } from './utils';

export const VideoExtractAudioModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleExtract = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const ab = await file.arrayBuffer();
      const ctx = new AudioContext();
      const buf = await ctx.decodeAudioData(ab);
      downloadBlob(encodeWav(buf), file.name.replace(/\.[^.]+$/, '.wav'));
    } catch {
      /* ignore */
    }
    setProcessing(false);
  }, [file]);

  return (
    <FullScreen onClose={onClose} title="Extract Audio">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Extract audio track from video file as WAV.</p>
        <Dropzone accept="video/*" onFile={setFile} />
        {file && <p className="text-xs opacity-60">{file.name}</p>}
        <button
          onClick={handleExtract}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Extracting...' : 'Extract Audio'}
        </button>
      </div>
    </FullScreen>
  );
};
VideoExtractAudioModal.displayName = 'VideoExtractAudioModal';
