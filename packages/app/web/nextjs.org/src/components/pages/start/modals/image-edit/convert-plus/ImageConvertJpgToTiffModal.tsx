'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const ImageConvertJpgToTiffModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="JPG to TIFF" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert JPG images to TIFF format.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm image convert input.jpg output.tiff
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          TIFF conversion requires libtiff or ImageMagick.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertJpgToTiffModal.displayName = 'ImageConvertJpgToTiffModal';
