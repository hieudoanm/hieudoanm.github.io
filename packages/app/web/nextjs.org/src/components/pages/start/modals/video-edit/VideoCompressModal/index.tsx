'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const VideoCompressModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.5);
  const [processing, setProcessing] = useState(false);

  const handleCompress = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      await new Promise((r) => {
        video.onloadedmetadata = r;
      });
      video.play();
      const scale = quality < 0.5 ? 0.5 : 1;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(video.videoWidth * scale);
      canvas.height = Math.round(video.videoHeight * scale);
      const ctx = canvas.getContext('2d')!;
      const stream = canvas.captureStream(
        Math.max(15, Math.round(30 * quality))
      );
      const mime = 'video/webm;codecs=vp8,opus';
      const rec = new MediaRecorder(stream, {
        mimeType: mime,
        videoBitsPerSecond: Math.round(500000 * quality),
      });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = () => {
        downloadBlob(
          new Blob(chunks, { type: mime }),
          file.name.replace(/\.[^.]+$/, '-compressed.webm')
        );
        setProcessing(false);
      };
      rec.start();
      const tick = () => {
        if (video.paused || video.ended) {
          rec.stop();
          video.pause();
          URL.revokeObjectURL(video.src);
          return;
        }
        ctx.drawImage(video, 0, 0);
        requestAnimationFrame(tick);
      };
      video.ontimeupdate = tick;
    } catch {
      setProcessing(false);
    }
  }, [file, quality]);

  return (
    <ModalWrapper onClose={onClose} title="Compress Video">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Reduce video file size by adjusting quality.</p>
        <Dropzone accept="video/*" onFile={setFile} />
        {file && (
          <div className="flex flex-col gap-1">
            <label className="text-xs">
              Quality: {Math.round(quality * 100)}%
            </label>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.1}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="range range-xs"
            />
          </div>
        )}
        <button
          onClick={handleCompress}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Compressing...' : 'Compress'}
        </button>
      </div>
    </ModalWrapper>
  );
};
VideoCompressModal.displayName = 'VideoCompressModal';
