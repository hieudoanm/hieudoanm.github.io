'use client';

import { FC, useState } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { VideoToolConfig } from '../config';
import { processVideo } from '../lib/pipeline';

interface Props {
  config: VideoToolConfig;
}

export const VideoResizeTool: FC<Props> = ({ config }) => {
  const [file, setFile] = useState<File | null>(null);
  const [w, setW] = useState(640);
  const [h, setH] = useState(480);
  const [processing, setProcessing] = useState(false);

  const handleLoad = (f: File) => {
    setFile(f);
    const v = document.createElement('video');
    v.src = URL.createObjectURL(f);
    v.onloadedmetadata = () => {
      setW(v.videoWidth);
      setH(v.videoHeight);
      URL.revokeObjectURL(v.src);
    };
  };

  const handleResize = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      await processVideo(file, {
        canvas: { width: w, height: h },
        outputName: file.name.replace(/\.[^.]+$/, `-${w}x${h}.webm`),
      });
    } catch {}
    setProcessing(false);
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-lg font-medium">Resize Video</h2>
      <p className="text-base-content/50 text-sm">{config.description}</p>
      <Dropzone accept="video/*" onFile={handleLoad} />
      {file && (
        <div className="flex items-center gap-2 text-xs">
          <label>
            W:{' '}
            <input
              type="number"
              min={1}
              value={w}
              onChange={(e) => setW(Number(e.target.value))}
              className="input input-bordered input-xs w-20"
            />
          </label>
          <label>
            H:{' '}
            <input
              type="number"
              min={1}
              value={h}
              onChange={(e) => setH(Number(e.target.value))}
              className="input input-bordered input-xs w-20"
            />
          </label>
        </div>
      )}
      <button
        onClick={handleResize}
        disabled={!file || processing}
        className="btn btn-primary btn-sm w-fit">
        {processing ? 'Resizing...' : 'Resize'}
      </button>
    </div>
  );
};
