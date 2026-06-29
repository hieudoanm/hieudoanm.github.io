'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import {
  downloadBlob,
  encodeGif,
  buildPalette,
  quantizePixels,
  lzwEncode,
} from './utils';

export const VideoAviToGifModal: FC<{ onClose: () => void }> = ({
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
      const frameData: ImageData[] = [];
      const totalFrames = Math.min(50, Math.floor(video.duration * 10));
      for (let i = 0; i < totalFrames; i++) {
        video.currentTime = (i / totalFrames) * video.duration;
        await new Promise((r) => {
          video.onseeked = r;
        });
        ctx.drawImage(video, 0, 0);
        frameData.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      }
      video.pause();
      const gifBlob = encodeGif(frameData, 100);
      downloadBlob(gifBlob, file.name.replace(/\.[^.]+$/, '.gif'));
    } catch {
      /* ignore */
    }
    setProcessing(false);
  }, [file]);

  return (
    <ModalWrapper onClose={onClose} title="AVI to GIF">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert AVI videos to animated GIF.</p>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="file-input file-input-bordered file-input-sm w-full"
        />
        {file && <p className="text-xs opacity-60">{file.name}</p>}
        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Converting...' : 'Convert to GIF'}
        </button>
      </div>
    </ModalWrapper>
  );
};
VideoAviToGifModal.displayName = 'VideoAviToGifModal';
