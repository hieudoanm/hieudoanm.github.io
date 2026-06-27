'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const TextUrlTracerModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [urlInput, setUrlInput] = useState('');

  return (
    <ModalWrapper onClose={onClose} title="URL Tracer">
      <div className="flex flex-col gap-4">
        <input
          type="url"
          className="input input-bordered"
          placeholder="https://example.com"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm web trace {urlInput || '<url>'}
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Follows redirect chains and shows response headers via CLI.
        </p>
      </div>
    </ModalWrapper>
  );
};
TextUrlTracerModal.displayName = 'TextUrlTracerModal';
