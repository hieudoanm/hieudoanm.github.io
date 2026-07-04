'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const VideoGifToMovModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleConvert = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      await new Promise((r) => {
        video.onloadedmetadata = r;
      });
      video.play();
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d')!;
      const stream = canvas.captureStream(30);
      const mime = MediaRecorder.isTypeSupported('video/quicktime')
        ? 'video/quicktime'
        : 'video/webm;codecs=vp8,opus';
      const ext = mime.includes('quicktime') ? '.mov' : '.webm';
      const rec = new MediaRecorder(stream, { mimeType: mime });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = () => {
        downloadBlob(
          new Blob(chunks, { type: mime }),
          file.name.replace(/\.[^.]+$/, ext)
        );
        setProcessing(false);
      };
      rec.start();
      const tick = () => {
        if (!video.paused && !video.ended) {
          ctx.drawImage(video, 0, 0);
          requestAnimationFrame(tick);
        } else {
          rec.stop();
          video.pause();
          URL.revokeObjectURL(video.src);
        }
      };
      video.ontimeupdate = tick;
    } catch {
      setProcessing(false);
    }
  }, [file]);

  return (
    <FullScreen centered onClose={onClose} title="GIF to MOV">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">Convert GIF animations to MOV video.</p>
          <Dropzone accept=".gif,image/gif" onFile={setFile} />
          {file && <p className="text-xs opacity-60">{file.name}</p>}
          <button
            onClick={handleConvert}
            disabled={!file || processing}
            className="btn btn-primary btn-sm">
            {processing ? 'Converting...' : 'Convert to MOV'}
          </button>
        </div>
      </div>
    </FullScreen>
  );
};
VideoGifToMovModal.displayName = 'VideoGifToMovModal';
