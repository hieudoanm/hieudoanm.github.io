'use client';

import { FC, useState, useRef, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
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
    <ModalWrapper onClose={onClose} title="Extract Audio">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Extract audio track from video file as WAV.</p>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="file-input file-input-bordered file-input-sm w-full"
        />
        {file && <p className="text-xs opacity-60">{file.name}</p>}
        <button
          onClick={handleExtract}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Extracting...' : 'Extract Audio'}
        </button>
      </div>
    </ModalWrapper>
  );
};
VideoExtractAudioModal.displayName = 'VideoExtractAudioModal';
