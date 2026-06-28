'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const ImageConvertHeicToAvifModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="HEIC to AVIF" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert HEIC images to AVIF format.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm image convert input.heic output.avif
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          AVIF conversion requires ImageMagick with libavif.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertHeicToAvifModal.displayName = 'ImageConvertHeicToAvifModal';
