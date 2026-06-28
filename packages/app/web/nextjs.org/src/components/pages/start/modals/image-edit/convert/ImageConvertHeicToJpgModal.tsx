'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const ImageConvertHeicToJpgModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="Convert HEIC to JPG" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert HEIC images (iPhone) to JPG format.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm image convert input.heic output.jpg
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          HEIC conversion requires libheif or ImageMagick on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertHeicToJpgModal.displayName = 'ImageConvertHeicToJpgModal';
