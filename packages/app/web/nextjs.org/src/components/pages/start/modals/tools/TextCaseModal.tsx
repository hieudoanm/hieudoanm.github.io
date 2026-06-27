'use client';

import { FC, useState, useMemo } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const TextCaseModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [inputText, setInputText] = useState('');

  const caseConverted = useMemo(() => {
    if (!inputText) return null;
    return {
      upper: inputText.toUpperCase(),
      lower: inputText.toLowerCase(),
      title: inputText.replace(
        /\w\S*/g,
        (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      ),
      camel: inputText.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
      snake: inputText.replace(/\s+/g, '_').toLowerCase(),
      kebab: inputText.replace(/\s+/g, '-').toLowerCase(),
    } as const;
  }, [inputText]);

  return (
    <ModalWrapper onClose={onClose} title="Case Converter">
      <div className="flex flex-col gap-4">
        <textarea
          className="textarea textarea-bordered min-h-[100px]"
          placeholder="Type text to convert..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        {inputText && (
          <div className="bg-base-200 space-y-2 rounded p-4 text-sm">
            <div>
              <span className="font-bold">UPPER:</span> {caseConverted!.upper}
            </div>
            <div>
              <span className="font-bold">lower:</span> {caseConverted!.lower}
            </div>
            <div>
              <span className="font-bold">Title:</span> {caseConverted!.title}
            </div>
            <div>
              <span className="font-bold">camelCase:</span>{' '}
              {caseConverted!.camel}
            </div>
            <div>
              <span className="font-bold">snake_case:</span>{' '}
              {caseConverted!.snake}
            </div>
            <div>
              <span className="font-bold">kebab-case:</span>{' '}
              {caseConverted!.kebab}
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
TextCaseModal.displayName = 'TextCaseModal';
