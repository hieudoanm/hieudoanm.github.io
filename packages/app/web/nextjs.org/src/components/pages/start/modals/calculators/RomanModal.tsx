'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { Roman } from './ConverterModal/tabs/math/Roman';

export const RomanModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper
      onClose={onClose}
      title="Roman Numeral Converter"
      size="max-w-lg">
      <div className="rounded-box bg-base-200 p-4">
        <Roman />
      </div>
    </ModalWrapper>
  );
};
RomanModal.displayName = 'RomanModal';
