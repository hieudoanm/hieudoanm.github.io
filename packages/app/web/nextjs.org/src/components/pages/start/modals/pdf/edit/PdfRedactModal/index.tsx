'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { RedactTab } from '.././RedactTab';

export const PdfRedactModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper
      onClose={onClose}
      title="Redact PDF"
      size="max-w-5xl"
      fullHeight>
      <RedactTab onClose={onClose} />
    </ModalWrapper>
  );
};
PdfRedactModal.displayName = 'PdfRedactModal';
