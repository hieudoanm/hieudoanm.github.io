'use client';

import { FC, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import { DataUnit, dataRates, convertDataRates } from './converter';

export const Data: FC = () => {
  const [{ bit, kilobyte, megabyte, gigabyte, terabyte }, setState] = useState({
    bit: 0,
    kilobyte: 0,
    megabyte: 0,
    gigabyte: 0,
    terabyte: 0,
  });

  return (
    <div className="card flex w-full max-w-md flex-col gap-y-2 divide-y divide-white/10">
      {[
        { type: 'bit' as DataUnit, value: bit },
        { type: 'kilobyte' as DataUnit, value: kilobyte },
        { type: 'megabyte' as DataUnit, value: megabyte },
        { type: 'gigabyte' as DataUnit, value: gigabyte },
        { type: 'terabyte' as DataUnit, value: terabyte },
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
                const newValue: string = event.target.value;
                const newAmount: number = parseFloat(newValue);

                if (isNaN(newAmount)) {
                  setState({
                    bit: 0,
                    kilobyte: 0,
                    megabyte: 0,
                    gigabyte: 0,
                    terabyte: 0,
                  });
                  return;
                }

                setState((previous) => ({
                  ...previous,
                  bit: convertDataRates(dataRates)({
                    fromAmount: newAmount,
                    fromUnit: type,
                    toUnit: 'bit',
                  }),
                  kilobyte: convertDataRates(dataRates)({
                    fromAmount: newAmount,
                    fromUnit: type,
                    toUnit: 'kilobyte',
                  }),
                  megabyte: convertDataRates(dataRates)({
                    fromAmount: newAmount,
                    fromUnit: type,
                    toUnit: 'megabyte',
                  }),
                  gigabyte: convertDataRates(dataRates)({
                    fromAmount: newAmount,
                    fromUnit: type,
                    toUnit: 'gigabyte',
                  }),
                  terabyte: convertDataRates(dataRates)({
                    fromAmount: newAmount,
                    fromUnit: type,
                    toUnit: 'terabyte',
                  }),
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
Data.displayName = 'Data';

export const DataModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <FullScreen centered onClose={onClose} title="Data Converter">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <Data />
      </div>
    </FullScreen>
  );
};
DataModal.displayName = 'DataModal';
