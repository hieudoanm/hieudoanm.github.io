'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob, encodeWav } from './utils';

export const VideoM4aToWavModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleConvert = useCallback(async () => {
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
    <FullScreen centered onClose={onClose} title="M4A to WAV">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">Convert M4A audio to WAV format.</p>
          <Dropzone accept=".m4a,audio/mp4" onFile={setFile} />
          {file && <p className="text-xs opacity-60">{file.name}</p>}
          <button
            onClick={handleConvert}
            disabled={!file || processing}
            className="btn btn-primary btn-sm">
            {processing ? 'Converting...' : 'Convert'}
          </button>
        </div>
      </div>
    </FullScreen>
  );
};
VideoM4aToWavModal.displayName = 'VideoM4aToWavModal';
