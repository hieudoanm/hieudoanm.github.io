'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { generatePassword } from './utils';

export const TextPasswordModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [passwordLen, setPasswordLen] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [generated, setGenerated] = useState('');

  const handleGenerate = useCallback(() => {
    setGenerated(
      generatePassword(passwordLen, useUpper, useLower, useDigits, useSymbols)
    );
  }, [passwordLen, useUpper, useLower, useDigits, useSymbols]);

  return (
    <ModalWrapper onClose={onClose} title="Password Generator">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm">Length:</label>
          <input
            type="number"
            className="input input-bordered input-sm w-20"
            min={4}
            max={128}
            value={passwordLen}
            onChange={(e) => setPasswordLen(Number(e.target.value))}
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={useUpper}
            onChange={(e) => setUseUpper(e.target.checked)}
          />
          Uppercase (A-Z)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={useLower}
            onChange={(e) => setUseLower(e.target.checked)}
          />
          Lowercase (a-z)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={useDigits}
            onChange={(e) => setUseDigits(e.target.checked)}
          />
          Digits (0-9)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
          />
          Symbols (!@#$...)
        </label>
        <button className="btn btn-primary btn-sm" onClick={handleGenerate}>
          Generate
        </button>
        {generated && (
          <div className="bg-base-200 rounded p-4">
            <pre className="text-sm select-all">{generated}</pre>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
TextPasswordModal.displayName = 'TextPasswordModal';
