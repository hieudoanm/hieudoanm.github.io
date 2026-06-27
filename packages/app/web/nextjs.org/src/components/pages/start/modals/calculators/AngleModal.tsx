'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { Angle } from './ConverterModal/tabs/math/Angle';

export const AngleModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Angle Converter" size="max-w-lg">
      <div className="rounded-box bg-base-200 p-4">
        <Angle />
      </div>
    </ModalWrapper>
  );
};
AngleModal.displayName = 'AngleModal';
