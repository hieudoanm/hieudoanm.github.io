'use client';

import { FC, useState, useRef, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { downloadBlob } from './utils';

export const VideoOggToMp3Modal: FC<{ onClose: () => void }> = ({
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
      const mime = MediaRecorder.isTypeSupported('audio/mpeg')
        ? 'audio/mpeg'
        : 'audio/webm;codecs=opus';
      const ext = mime.includes('mpeg') ? 'mp3' : 'webm';
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
    <ModalWrapper onClose={onClose} title="OGG to MP3">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert OGG audio to MP3 format.</p>
        <input
          type="file"
          accept=".ogg,audio/ogg"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="file-input file-input-bordered file-input-sm w-full"
        />
        {file && <p className="text-xs opacity-60">{file.name}</p>}
        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Converting...' : 'Convert'}
        </button>
      </div>
    </ModalWrapper>
  );
};
VideoOggToMp3Modal.displayName = 'VideoOggToMp3Modal';
