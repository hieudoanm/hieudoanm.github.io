'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const CLI_CMD = 'hieudoanm pdf translate input.pdf --target lang --source lang';
const CLI_NOTE =
  'Translates PDF text content via CLI. Supports: en, vi, ja, ko, zh, fr, de, es, it, pt, ru, ar, th. Requires API key for translation service.';

export const PdfTranslateModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="PDF Translate">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Translate PDF content between languages.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">{CLI_CMD}</pre>
        </div>
        <p className="text-base-content/60 text-xs">{CLI_NOTE}</p>
        <div className="bg-base-200 mt-2 rounded p-4">
          <p className="mb-2 text-xs font-bold">Language Codes:</p>
          <pre className="text-xs">
            en=English, vi=Vietnamese, ja=Japanese, ko=Korean, zh=Chinese,
            fr=French, de=German, es=Spanish, it=Italian, pt=Portuguese,
            ru=Russian, ar=Arabic, th=Thai
          </pre>
        </div>
      </div>
    </ModalWrapper>
  );
};
