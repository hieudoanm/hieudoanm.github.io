'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const VideoTrimModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [processing, setProcessing] = useState(false);

  const handleLoad = (f: File) => {
    setFile(f);
    if (f) {
      const v = document.createElement('video');
      v.src = URL.createObjectURL(f);
      v.onloadedmetadata = () => {
        setDuration(v.duration);
        setEndTime(v.duration);
        URL.revokeObjectURL(v.src);
      };
    }
  };

  const handleTrim = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      await new Promise((r) => {
        video.onloadedmetadata = r;
      });
      video.currentTime = startTime;
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
          file.name.replace(/\.[^.]+$/, '-trimmed.webm')
        );
        setProcessing(false);
      };
      rec.start();
      video.play();
      const tick = () => {
        if (video.currentTime >= endTime || video.ended) {
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
  }, [file, startTime, endTime]);

  return (
    <ModalWrapper onClose={onClose} title="Trim Video">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Trim video by start and end timestamps.</p>
        <Dropzone accept="video/*" onFile={handleLoad} />
        {file && (
          <>
            <p className="text-xs opacity-60">
              {file.name} ({duration.toFixed(1)}s)
            </p>
            <div className="flex items-center gap-2">
              <label className="text-xs">Start:</label>
              <input
                type="number"
                min={0}
                max={endTime}
                step={0.1}
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
                className="input input-bordered input-xs w-20"
              />
              <label className="text-xs">End:</label>
              <input
                type="number"
                min={startTime}
                max={duration}
                step={0.1}
                value={endTime}
                onChange={(e) => setEndTime(Number(e.target.value))}
                className="input input-bordered input-xs w-20"
              />
            </div>
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={endTime}
              onChange={(e) => setEndTime(Number(e.target.value))}
              className="range range-xs"
            />
          </>
        )}
        <button
          onClick={handleTrim}
          disabled={!file || processing || startTime >= endTime}
          className="btn btn-primary btn-sm">
          {processing ? 'Trimming...' : 'Trim'}
        </button>
      </div>
    </ModalWrapper>
  );
};
VideoTrimModal.displayName = 'VideoTrimModal';
