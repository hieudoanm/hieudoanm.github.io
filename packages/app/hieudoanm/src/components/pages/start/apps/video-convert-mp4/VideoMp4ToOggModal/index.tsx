'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const VideoMp4ToOggModal: FC<{ onClose: () => void }> = ({
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
      const stream = canvas.captureStream(30);
      const audioCtx = new AudioContext();
      const dest = audioCtx.createMediaStreamDestination();
      const src = audioCtx.createBufferSource();
      try {
        const ab = await file.arrayBuffer();
        const buf = await audioCtx.decodeAudioData(ab);
        src.buffer = buf;
        src.connect(dest);
        src.start(0);
      } catch {
        /* no audio track */
      }
      const combined = new MediaStream([
        ...stream.getVideoTracks(),
        ...dest.stream.getAudioTracks(),
      ]);
      const mime = MediaRecorder.isTypeSupported(
        'video/ogg;codecs=theora,vorbis'
      )
        ? 'video/ogg;codecs=theora,vorbis'
        : 'video/webm;codecs=vp8,opus';
      const rec = new MediaRecorder(combined, { mimeType: mime });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = () => {
        downloadBlob(
          new Blob(chunks, { type: mime }),
          file.name.replace(/\.[^.]+$/, '.ogg')
        );
        setProcessing(false);
      };
      rec.start();
      video.currentTime = 0;
      const tick = () => {
        if (!video.paused && !video.ended) {
          ctx.drawImage(video, 0, 0);
          requestAnimationFrame(tick);
        } else {
          rec.stop();
          src.stop();
          video.pause();
          URL.revokeObjectURL(video.src);
        }
      };
      video.ontimeupdate = tick;
      video.playbackRate = 1;
    } catch {
      setProcessing(false);
    }
  }, [file]);

  return (
    <FullScreen centered onClose={onClose} title="MP4 to OGG">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">Extract audio from MP4 as OGG.</p>
          <Dropzone accept=".mp4,video/mp4" onFile={setFile} />
          {file && <p className="text-xs opacity-60">{file.name}</p>}
          <button
            onClick={handleConvert}
            disabled={!file || processing}
            className="btn btn-primary btn-sm">
            {processing ? 'Converting...' : 'Convert'}
          </button>
        </div>
      </div>
    </FullScreen>
  );
};
VideoMp4ToOggModal.displayName = 'VideoMp4ToOggModal';
