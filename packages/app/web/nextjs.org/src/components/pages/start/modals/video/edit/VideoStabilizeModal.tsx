'use client';

import { FC, useState, useRef, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const VideoStabilizeModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleProcess = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      await new Promise((r) => {
        video.onloadedmetadata = r;
      });
      video.play();
      const cw = video.videoWidth,
        ch = video.videoHeight;
      const canvas = document.createElement('canvas');
      canvas.width = cw;
      canvas.height = ch;
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
          file.name.replace(/\.[^.]+$/, '-stabilized.webm')
        );
        setProcessing(false);
      };
      let prevFrame: ImageData | null = null;
      rec.start();
      const tick = () => {
        if (video.paused || video.ended) {
          rec.stop();
          video.pause();
          URL.revokeObjectURL(video.src);
          return;
        }
        ctx.drawImage(video, 0, 0);
        const curr = ctx.getImageData(0, 0, cw, ch);
        if (prevFrame) {
          const dx = estimateShift(prevFrame, curr, cw, ch);
          ctx.save();
          ctx.translate(dx.x, dx.y);
          ctx.drawImage(video, 0, 0);
          ctx.restore();
        }
        prevFrame = curr;
        requestAnimationFrame(tick);
      };
      video.ontimeupdate = tick;
    } catch {
      setProcessing(false);
    }
  }, [file]);

  return (
    <ModalWrapper onClose={onClose} title="Video Stabilizer">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Basic video stabilization via frame difference tracking.
        </p>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="file-input file-input-bordered file-input-sm w-full"
        />
        {file && <p className="text-xs opacity-60">{file.name}</p>}
        <button
          onClick={handleProcess}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Stabilizing...' : 'Stabilize'}
        </button>
      </div>
    </ModalWrapper>
  );
};
VideoStabilizeModal.displayName = 'VideoStabilizeModal';

function estimateShift(a: ImageData, b: ImageData, w: number, h: number) {
  let mx = 0,
    my = 0,
    best = Infinity;
  for (let dy = -4; dy <= 4; dy += 2) {
    for (let dx = -4; dx <= 4; dx += 2) {
      let diff = 0,
        count = 0;
      for (let y = 8; y < h - 8; y += 8) {
        for (let x = 8; x < w - 8; x += 8) {
          const i = (y * w + x) * 4;
          diff +=
            Math.abs(a.data[i] - b.data[i]) +
            Math.abs(a.data[i + 1] - b.data[i + 1]) +
            Math.abs(a.data[i + 2] - b.data[i + 2]);
          count++;
        }
      }
      const avg = diff / count;
      if (avg < best) {
        best = avg;
        mx = dx;
        my = dy;
      }
    }
  }
  return { x: -mx, y: -my };
}
