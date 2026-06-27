'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { Length } from './ConverterModal/tabs/physical/Length';

export const LengthModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Length Converter" size="max-w-lg">
      <div className="rounded-box bg-base-200 p-4">
        <Length />
      </div>
    </ModalWrapper>
  );
};
LengthModal.displayName = 'LengthModal';
