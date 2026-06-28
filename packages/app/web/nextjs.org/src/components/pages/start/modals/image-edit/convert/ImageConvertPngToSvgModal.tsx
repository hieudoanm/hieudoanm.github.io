'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const ImageConvertPngToSvgModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper onClose={onClose} title="Convert PNG to SVG" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert PNG images to SVG (vector) format.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm image convert input.png output.svg
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          PNG to SVG conversion requires vector tracing tools like potrace.
        </p>
      </div>
    </ModalWrapper>
  );
};
ImageConvertPngToSvgModal.displayName = 'ImageConvertPngToSvgModal';
