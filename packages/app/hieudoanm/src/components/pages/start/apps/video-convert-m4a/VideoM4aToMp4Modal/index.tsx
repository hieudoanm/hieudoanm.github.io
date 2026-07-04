'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const VideoM4aToMp4Modal: FC<{ onClose: () => void }> = ({
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
      const dest = ctx.createMediaStreamDestination();
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(dest);
      const mime = MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : 'audio/webm;codecs=opus';
      const ext = mime.includes('mp4') ? 'm4a' : 'webm';
      const chunks: Blob[] = [];
      const rec = new MediaRecorder(dest.stream, { mimeType: mime });
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = () => {
        downloadBlob(new Blob(chunks, { type: mime }), `output.${ext}`);
        setProcessing(false);
      };
      rec.start();
      src.start(0);
      src.onended = () => rec.stop();
    } catch {
      setProcessing(false);
    }
  }, [file]);

  return (
    <FullScreen centered onClose={onClose} title="M4A to MP4">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            Convert M4A audio to M4A (AAC in MP4 container).
          </p>
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
VideoM4aToMp4Modal.displayName = 'VideoM4aToMp4Modal';
