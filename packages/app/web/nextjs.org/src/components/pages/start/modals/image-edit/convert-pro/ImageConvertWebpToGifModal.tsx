'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const ImageConvertWebpToGifModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="WebP to GIF" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert WebP images to GIF format.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm image convert input.webp output.gif
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          GIF conversion requires ImageMagick with WebP support.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertWebpToGifModal.displayName = 'ImageConvertWebpToGifModal';
