'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const ImageConvertTiffToJpgModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="TIFF to JPG" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert TIFF images to JPG format.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm image convert input.tiff output.jpg
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          TIFF conversion requires libtiff or ImageMagick.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertTiffToJpgModal.displayName = 'ImageConvertTiffToJpgModal';
