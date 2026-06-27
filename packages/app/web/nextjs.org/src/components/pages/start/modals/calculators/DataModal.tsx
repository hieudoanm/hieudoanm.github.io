'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { Data } from './ConverterModal/tabs/math/Data';

export const DataModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Data Converter" size="max-w-lg">
      <div className="rounded-box bg-base-200 p-4">
        <Data />
      </div>
    </ModalWrapper>
  );
};
DataModal.displayName = 'DataModal';
