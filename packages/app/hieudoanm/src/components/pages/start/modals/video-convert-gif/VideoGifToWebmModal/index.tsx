'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const VideoGifToWebmModal: FC<{ onClose: () => void }> = ({
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
      const rec = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8,opus',
      });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = () => {
        downloadBlob(
          new Blob(chunks, { type: 'video/webm' }),
          file.name.replace(/\.[^.]+$/, '.webm')
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
    <ModalWrapper onClose={onClose} title="GIF to WebM">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert GIF animations to WebM video.</p>
        <Dropzone accept=".gif,image/gif" onFile={setFile} />
        {file && <p className="text-xs opacity-60">{file.name}</p>}
        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Converting...' : 'Convert to WebM'}
        </button>
      </div>
    </ModalWrapper>
  );
};
VideoGifToWebmModal.displayName = 'VideoGifToWebmModal';
