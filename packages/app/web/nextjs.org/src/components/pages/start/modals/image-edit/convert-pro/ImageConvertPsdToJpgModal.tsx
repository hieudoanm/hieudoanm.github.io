'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const ImageConvertPsdToJpgModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="PSD to JPG" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert Photoshop PSD files to JPG format.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm image convert input.psd output.jpg
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          PSD conversion requires ImageMagick with Ghostscript.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertPsdToJpgModal.displayName = 'ImageConvertPsdToJpgModal';
