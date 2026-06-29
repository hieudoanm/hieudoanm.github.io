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

const encodeWav = (audioBuffer: AudioBuffer): Blob => {
  const nc = audioBuffer.numberOfChannels,
    sr = audioBuffer.sampleRate;
  const bps = 16,
    ts = audioBuffer.length * nc,
    ds = ts * (bps / 8);
  const buf = new ArrayBuffer(44 + ds),
    v = new DataView(buf);
  const w = (o: number, s: string) => {
    for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i));
  };
  w(0, 'RIFF');
  v.setUint32(4, 36 + ds, true);
  w(8, 'WAVE');
  w(12, 'fmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, nc, true);
  v.setUint32(24, sr, true);
  v.setUint32(28, sr * nc * 2, true);
  v.setUint16(32, nc * 2, true);
  v.setUint16(34, bps, true);
  w(36, 'data');
  v.setUint32(40, ds, true);
  let off = 44;
  for (let i = 0; i < audioBuffer.length; i++) {
    for (let ch = 0; ch < nc; ch++) {
      const s = Math.max(-1, Math.min(1, audioBuffer.getChannelData(ch)[i]));
      v.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      off += 2;
    }
  }
  return new Blob([buf], { type: 'audio/wav' });
};

export const VideoExtractAudioModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleExtract = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const ab = await file.arrayBuffer();
      const ctx = new AudioContext();
      const buf = await ctx.decodeAudioData(ab);
      downloadBlob(encodeWav(buf), file.name.replace(/\.[^.]+$/, '.wav'));
    } catch {
      /* ignore */
    }
    setProcessing(false);
  }, [file]);

  return (
    <ModalWrapper onClose={onClose} title="Extract Audio">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Extract audio track from video file as WAV.</p>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="file-input file-input-bordered file-input-sm w-full"
        />
        {file && <p className="text-xs opacity-60">{file.name}</p>}
        <button
          onClick={handleExtract}
          disabled={!file || processing}
          className="btn btn-primary btn-sm">
          {processing ? 'Extracting...' : 'Extract Audio'}
        </button>
      </div>
    </ModalWrapper>
  );
};
VideoExtractAudioModal.displayName = 'VideoExtractAudioModal';
