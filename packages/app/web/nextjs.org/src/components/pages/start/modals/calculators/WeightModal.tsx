'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { Weight } from './ConverterModal/tabs/physical/Weight';

export const WeightModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Weight Converter" size="max-w-lg">
      <div className="rounded-box bg-base-200 p-4">
        <Weight />
      </div>
    </ModalWrapper>
  );
};
WeightModal.displayName = 'WeightModal';
