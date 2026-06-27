'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { Temperature } from './ConverterModal/tabs/physical/Temperature';

export const TemperatureModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper
      onClose={onClose}
      title="Temperature Converter"
      size="max-w-lg">
      <div className="rounded-box bg-base-200 p-4">
        <Temperature />
      </div>
    </ModalWrapper>
  );
};
TemperatureModal.displayName = 'TemperatureModal';
