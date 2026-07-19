'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

export const ImageConvertTool: FC<{ config: ImageToolConfig }> = ({
  config,
}) => {
  const [loading, setLoading] = useState(false);

  const convert = useCallback(
    async (file: File) => {
      setLoading(true);
      try {
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);

        if (config.isSvg) {
          const dataUrl = canvas.toDataURL('image/png');
          const svg = `data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}">
            <image href="${dataUrl}" width="${img.width}" height="${img.height}"/>
          </svg>`
          )}`;
          const a = document.createElement('a');
          a.href = svg;
          a.download = file.name.replace(/\.[^.]+$/, `.${config.outputExt}`);
          a.click();
        } else {
          canvas.toBlob((blob) => {
            if (blob)
              downloadBlob(
                blob,
                file.name.replace(/\.[^.]+$/, `.${config.outputExt}`)
              );
            setLoading(false);
          }, config.mimeType);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    },
    [config]
  );

  return (
    <div className="rounded-box border-base-300 bg-base-200 border p-4">
      <div className="flex flex-col gap-4">
        <Dropzone accept={config.accept ?? 'image/*'} onFile={convert} />
        {loading && <span className="loading loading-spinner" />}
        <p className="text-base-content/60 text-xs">
          Convert to {config.outputExt?.toUpperCase()} format.
        </p>
      </div>
    </div>
  );
};
