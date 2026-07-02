'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const VideoCropModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 640, h: 480 });
  const [videoW, setVideoW] = useState(640);
  const [videoH, setVideoH] = useState(480);
  const [processing, setProcessing] = useState(false);

  const handleLoad = (f: File) => {
    setFile(f);
    if (f) {
      const v = document.createElement('video');
      v.src = URL.createObjectURL(f);
      v.onloadedmetadata = () => {
        setVideoW(v.videoWidth);
        setVideoH(v.videoHeight);
        setCrop({ x: 0, y: 0, w: v.videoWidth, h: v.videoHeight });
        URL.revokeObjectURL(v.src);
      };
    }
  };

  const handleCrop = useCallback(async () => {
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
      canvas.width = crop.w;
      canvas.height = crop.h;
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
          file.name.replace(/\.[^.]+$/, '-cropped.webm')
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
        ctx.drawImage(
          video,
          crop.x,
          crop.y,
          crop.w,
          crop.h,
          0,
          0,
          crop.w,
          crop.h
        );
        requestAnimationFrame(tick);
      };
      video.ontimeupdate = tick;
    } catch {
      setProcessing(false);
    }
  }, [file, crop]);

  return (
    <ModalWrapper onClose={onClose} title="Video Cropper">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Crop video to specified dimensions.</p>
        <Dropzone accept="video/*" onFile={handleLoad} />
        {file && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <label>
              X:{' '}
              <input
                type="number"
                min={0}
                max={videoW}
                value={crop.x}
                onChange={(e) =>
                  setCrop({ ...crop, x: Number(e.target.value) })
                }
                className="input input-bordered input-xs w-16"
              />
            </label>
            <label>
              Y:{' '}
              <input
                type="number"
                min={0}
                max={videoH}
                value={crop.y}
                onChange={(e) =>
                  setCrop({ ...crop, y: Number(e.target.value) })
                }
                className="input input-bordered input-xs w-16"
              />
            </label>
            <label>
              W:{' '}
              <input
                type="number"
                min={1}
                max={videoW}
                value={crop.w}
                onChange={(e) =>
                  setCrop({ ...crop, w: Number(e.target.value) })
                }
                className="input input-bordered input-xs w-16"
              />
            </label>
            <label>
              H:{' '}
              <input
                type="number"
                min={1}
                max={videoH}
                value={crop.h}
                onChange={(e) =>
                  setCrop({ ...crop, h: Number(e.target.value) })
                }
                className="input input-bordered input-xs w-16"
              />
            </label>
          </div>
        )}
        <button
          onClick={handleCrop}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Cropping...' : 'Crop'}
        </button>
      </div>
    </ModalWrapper>
  );
};
VideoCropModal.displayName = 'VideoCropModal';
