'use client';

import { arabicToRoman, romanToArabic } from '@lodashx/ts';
import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import { INITIAL_NUMBER } from './converter';

export const Roman: FC = () => {
  const [{ arabicNumber, romanNumber }, setState] = useState({
    arabicNumber: INITIAL_NUMBER.toString(),
    romanNumber: arabicToRoman(INITIAL_NUMBER),
  });

  return (
    <div className="card flex w-full max-w-sm flex-col gap-y-2 divide-y divide-white/10">
      {[
        { type: 'arabic', value: arabicNumber },
        { type: 'roman', value: romanNumber },
      ].map(({ type, value }) => {
        return (
          <div
            key={type}
            className="flex items-center justify-center gap-x-2 px-4 py-2">
            <span className="capitalize">{type}</span>
            <input
              type="text"
              id={type}
              placeholder={type}
              value={value}
              onChange={(event) => {
                const newValue = event.target.value;
                const newArabicNumber: string =
                  type === 'arabic' ? newValue : romanToArabic(newValue);
                const newRomanNumber: string =
                  type === 'roman'
                    ? newValue
                    : arabicToRoman(parseInt(newValue, 10));
                setState((previous) => ({
                  ...previous,
                  arabicNumber: newArabicNumber,
                  romanNumber: newRomanNumber,
                }));
              }}
              className="grow text-right focus:outline-none"
            />
          </div>
        );
      })}
    </div>
  );
};
Roman.displayName = 'Roman';

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
