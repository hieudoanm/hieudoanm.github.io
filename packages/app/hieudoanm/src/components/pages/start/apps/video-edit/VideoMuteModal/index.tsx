'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const VideoMuteModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleMute = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const video = document.createElement('video');
      video.muted = true;
      video.src = URL.createObjectURL(file);
      await new Promise((r) => {
        video.onloadedmetadata = r;
      });
      video.play();
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d')!;
      const stream = canvas.captureStream(30);
      const rec = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8',
      });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = () => {
        downloadBlob(
          new Blob(chunks, { type: 'video/webm' }),
          file.name.replace(/\.[^.]+$/, '-muted.webm')
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
  }, [file]);

  return (
    <FullScreen onClose={onClose} title="Mute Video">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Remove audio track from video.</p>
        <Dropzone accept="video/*" onFile={setFile} />
        {file && <p className="text-xs opacity-60">{file.name}</p>}
        <button
          onClick={handleMute}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Processing...' : 'Mute'}
        </button>
      </div>
    </FullScreen>
  );
};
VideoMuteModal.displayName = 'VideoMuteModal';
