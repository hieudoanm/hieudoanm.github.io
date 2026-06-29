'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const VideoSpeedModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [rate, setRate] = useState(1);
  const [processing, setProcessing] = useState(false);

  const handleSpeed = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      await new Promise((r) => {
        video.onloadedmetadata = r;
      });
      video.playbackRate = rate;
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
          file.name.replace(/\.[^.]+$/, `-${rate}x.webm`)
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
  }, [file, rate]);

  return (
    <ModalWrapper onClose={onClose} title="Speed Changer">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Change video playback speed. 0.5 = half speed, 2.0 = double speed.
        </p>
        <Dropzone accept="video/*" onFile={setFile} />
        {file && (
          <div className="flex flex-col gap-1">
            <label className="text-xs">Speed: {rate}x</label>
            <input
              type="range"
              min={0.25}
              max={4}
              step={0.25}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="range range-xs"
            />
          </div>
        )}
        <button
          onClick={handleSpeed}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Processing...' : 'Change Speed'}
        </button>
      </div>
    </ModalWrapper>
  );
};
VideoSpeedModal.displayName = 'VideoSpeedModal';
