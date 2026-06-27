'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { Base } from './ConverterModal/tabs/math/Base';

export const BaseModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Base Converter" size="max-w-lg">
      <div className="rounded-box bg-base-200 p-4">
        <Base />
      </div>
    </ModalWrapper>
  );
};
BaseModal.displayName = 'BaseModal';
