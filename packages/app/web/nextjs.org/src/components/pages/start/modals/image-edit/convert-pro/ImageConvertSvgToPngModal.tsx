'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const ImageConvertSvgToPngModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="SVG to PNG" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Convert SVG vector graphics to PNG raster format.
        </p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm image convert input.svg output.png
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Requires librsvg or ImageMagick with SVG support.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertSvgToPngModal.displayName = 'ImageConvertSvgToPngModal';
