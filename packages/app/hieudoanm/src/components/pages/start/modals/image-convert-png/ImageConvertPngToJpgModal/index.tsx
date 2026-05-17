'use client';

import { FC, useState, useCallback } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { downloadBlob } from './utils';

export const ImageConvertPngToJpgModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  const convert = useCallback(async (file: File) => {
    if (!file) return;
    setLoading(true);
    try {
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = URL.createObjectURL(file);
      });
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, file.name.replace(/\.[^.]+$/, '.jpg'));
        setLoading(false);
      }, 'image/jpeg');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="Convert PNG to JPG" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <Dropzone accept=".png" onFile={convert} />
        {loading && <span className="loading loading-spinner" />}
        <p className="text-base-content/60 text-xs">Convert to JPG format.</p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertPngToJpgModal.displayName = 'ImageConvertPngToJpgModal';
