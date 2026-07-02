'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const VideoResizeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState(640);
  const [height, setHeight] = useState(480);
  const [processing, setProcessing] = useState(false);

  const handleLoad = (f: File) => {
    setFile(f);
    if (f) {
      const v = document.createElement('video');
      v.src = URL.createObjectURL(f);
      v.onloadedmetadata = () => {
        setWidth(v.videoWidth);
        setHeight(v.videoHeight);
        URL.revokeObjectURL(v.src);
      };
    }
  };

  const handleResize = useCallback(async () => {
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
      canvas.width = width;
      canvas.height = height;
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
          file.name.replace(/\.[^.]+$/, `-${width}x${height}.webm`)
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
        ctx.drawImage(video, 0, 0, width, height);
        requestAnimationFrame(tick);
      };
      video.ontimeupdate = tick;
    } catch {
      setProcessing(false);
    }
  }, [file, width, height]);

  return (
    <ModalWrapper onClose={onClose} title="Resize Video">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Resize video to new dimensions.</p>
        <Dropzone accept="video/*" onFile={handleLoad} />
        {file && (
          <div className="flex gap-2 text-xs">
            <label>
              W:{' '}
              <input
                type="number"
                min={1}
                max={3840}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="input input-bordered input-xs w-20"
              />
            </label>
            <label>
              H:{' '}
              <input
                type="number"
                min={1}
                max={2160}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="input input-bordered input-xs w-20"
              />
            </label>
          </div>
        )}
        <button
          onClick={handleResize}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Resizing...' : 'Resize'}
        </button>
      </div>
    </ModalWrapper>
  );
};
VideoResizeModal.displayName = 'VideoResizeModal';
