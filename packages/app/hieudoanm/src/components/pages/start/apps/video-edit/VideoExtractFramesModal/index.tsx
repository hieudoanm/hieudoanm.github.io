'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const VideoExtractFramesModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fps, setFps] = useState(1);
  const [processing, setProcessing] = useState(false);

  const handleExtract = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      await new Promise((r) => {
        video.onloadedmetadata = r;
      });
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d')!;
      const interval = 1 / fps;
      const frames: Blob[] = [];
      for (let t = 0; t < video.duration; t += interval) {
        video.currentTime = t;
        await new Promise((r) => {
          video.onseeked = r;
        });
        ctx.drawImage(video, 0, 0);
        frames.push(
          await new Promise<Blob>((r) =>
            canvas.toBlob((b) => r(b!), 'image/png')
          )
        );
      }
      URL.revokeObjectURL(video.src);
      for (let i = 0; i < frames.length; i++) {
        downloadBlob(frames[i], `frame_${String(i + 1).padStart(4, '0')}.png`);
      }
    } catch {
      /* ignore */
    }
    setProcessing(false);
  }, [file, fps]);

  return (
    <FullScreen onClose={onClose} title="Extract Frames">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Extract video frames as PNG images.</p>
        <Dropzone accept="video/*" onFile={setFile} />
        {file && (
          <label className="text-xs">
            Frames per second:{' '}
            <input
              type="number"
              min={0.1}
              max={30}
              step={0.1}
              value={fps}
              onChange={(e) => setFps(Number(e.target.value))}
              className="input input-bordered input-xs ml-1 w-16"
            />
          </label>
        )}
        <button
          onClick={handleExtract}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Extracting...' : 'Extract Frames'}
        </button>
      </div>
    </FullScreen>
  );
};
VideoExtractFramesModal.displayName = 'VideoExtractFramesModal';
