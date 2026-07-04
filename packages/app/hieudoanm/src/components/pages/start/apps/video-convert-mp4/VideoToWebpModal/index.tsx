'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const VideoToWebpModal: FC<{ onClose: () => void }> = ({ onClose }) => {
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
      video.currentTime = video.duration / 2;
      await new Promise((r) => {
        video.onseeked = r;
      });
      ctx.drawImage(video, 0, 0);
      canvas.toBlob((b) => {
        if (b) downloadBlob(b, file.name.replace(/\.[^.]+$/, '.webp'));
        URL.revokeObjectURL(video.src);
        setProcessing(false);
      }, 'image/webp');
    } catch {
      setProcessing(false);
    }
  }, [file]);

  return (
    <FullScreen centered onClose={onClose} title="Video to WebP">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">Extract a video frame as WebP image.</p>
          <Dropzone accept="video/*" onFile={setFile} />
          {file && <p className="text-xs opacity-60">{file.name}</p>}
          <button
            onClick={handleConvert}
            disabled={!file || processing}
            className="btn btn-primary btn-sm">
            {processing ? 'Extracting...' : 'Extract Frame'}
          </button>
        </div>
      </div>
    </FullScreen>
  );
};
VideoToWebpModal.displayName = 'VideoToWebpModal';
