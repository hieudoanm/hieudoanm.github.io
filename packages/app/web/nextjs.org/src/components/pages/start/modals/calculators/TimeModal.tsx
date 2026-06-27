'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { Time } from './ConverterModal/tabs/physical/Time';

export const TimeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Time Converter" size="max-w-lg">
      <div className="rounded-box bg-base-200 p-4">
        <Time />
      </div>
    </ModalWrapper>
  );
};
TimeModal.displayName = 'TimeModal';
