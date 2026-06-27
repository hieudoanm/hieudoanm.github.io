'use client';
import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
export const EpochConvertModal: FC<{ onClose: () => void }> = ({ onClose }) => (
  <ModalWrapper onClose={onClose} title="Epoch Converter" size="max-w-lg">
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Converts between epoch timestamps and human-readable dates.
      </p>
      <div className="bg-base-200 rounded p-4">
        <p className="mb-2 text-xs font-bold">CLI Command:</p>
        <pre className="text-sm">hieudoanm data epoch &lt;timestamp&gt;</pre>
      </div>
      <p className="text-base-content/60 text-xs">
        Converts between epoch timestamps and human-readable dates.
      </p>
    </div>
  </ModalWrapper>
);
EpochConvertModal.displayName = 'EpochConvertModal';
