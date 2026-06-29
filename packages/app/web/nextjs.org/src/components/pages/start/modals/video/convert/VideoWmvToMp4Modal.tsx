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

export const VideoWmvToMp4Modal: FC<{ onClose: () => void }> = ({
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
      const mime = MediaRecorder.isTypeSupported('video/mp4')
        ? 'video/mp4'
        : 'video/webm;codecs=vp8,opus';
      const rec = new MediaRecorder(stream, { mimeType: mime });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = () => {
        downloadBlob(
          new Blob(chunks, { type: mime }),
          file.name.replace(/\.[^.]+$/, mime.includes('mp4') ? '.mp4' : '.webm')
        );
        setProcessing(false);
      };
      rec.start();
      const tick = () => {
        if (!video.paused && !video.ended) {
          ctx.drawImage(video, 0, 0);
          requestAnimationFrame(tick);
        } else {
          rec.stop();
          video.pause();
          URL.revokeObjectURL(video.src);
        }
      };
      video.ontimeupdate = tick;
    } catch {
      setProcessing(false);
    }
  }, [file]);

  return (
    <ModalWrapper onClose={onClose} title="WMV to MP4">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Convert WMV (Windows Media Video) files to MP4 format.
        </p>
        <input
          type="file"
          accept=".wmv,video/x-ms-wmv"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="file-input file-input-bordered file-input-sm w-full"
        />
        {file && <p className="text-xs opacity-60">{file.name}</p>}
        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Converting...' : 'Convert to MP4'}
        </button>
      </div>
    </ModalWrapper>
  );
};
VideoWmvToMp4Modal.displayName = 'VideoWmvToMp4Modal';
