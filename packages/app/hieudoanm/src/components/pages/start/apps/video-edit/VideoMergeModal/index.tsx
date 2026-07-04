'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const VideoMergeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleMerge = useCallback(async () => {
    if (files.length < 2) return;
    setProcessing(true);
    try {
      const videos = await Promise.all(
        files.map(async (f) => {
          const v = document.createElement('video');
          v.src = URL.createObjectURL(f);
          await new Promise((r) => {
            v.onloadedmetadata = r;
          });
          return v;
        })
      );
      const cw = Math.max(...videos.map((v) => v.videoWidth));
      const ch = Math.max(...videos.map((v) => v.videoHeight));
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
        downloadBlob(new Blob(chunks, { type: 'video/webm' }), 'merged.webm');
        setProcessing(false);
      };
      rec.start();
      for (const v of videos) {
        v.currentTime = 0;
        v.play();
        await new Promise<void>((resolve) => {
          const tick = () => {
            if (v.paused || v.ended) {
              v.pause();
              resolve();
              return;
            }
            ctx.drawImage(v, 0, 0);
            requestAnimationFrame(tick);
          };
          v.ontimeupdate = tick;
        });
        videos.forEach((vv) => URL.revokeObjectURL(vv.src));
      }
      rec.stop();
    } catch {
      setProcessing(false);
    }
  }, [files]);

  return (
    <FullScreen onClose={onClose} title="Merge Videos">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Merge multiple videos sequentially (browser-based, limited).
        </p>
        <Dropzone
          accept="video/*"
          multiple
          onFile={(f) => setFiles((prev) => [...prev, f])}
        />
        {files.length > 0 && (
          <ul className="space-y-1 text-xs">
            {files.map((f, i) => (
              <li key={i} className="opacity-60">
                {i + 1}. {f.name}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleMerge}
          disabled={files.length < 2 || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Merging...' : 'Merge'}
        </button>
      </div>
    </FullScreen>
  );
};
VideoMergeModal.displayName = 'VideoMergeModal';
