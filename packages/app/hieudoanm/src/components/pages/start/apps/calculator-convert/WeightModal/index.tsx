'use client';

import { FC, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import { weightRates, convertRates } from './converter';

export const Weight: FC = () => {
  const [{ ton, pound, ounce, kilogram, gram, milligram }, setState] = useState(
    {
      ton: weightRates.ton,
      pound: weightRates.pound,
      ounce: weightRates.ounce,
      kilogram: weightRates.kilogram,
      gram: weightRates.gram,
      milligram: weightRates.milligram,
    }
  );

  return (
    <div className="card flex w-full max-w-md flex-col gap-y-2 divide-y divide-white/10">
      {[
        { type: 'ton', value: ton },
        { type: 'pound', value: pound },
        { type: 'ounce', value: ounce },
        { type: 'kilogram', value: kilogram },
        { type: 'gram', value: gram },
        { type: 'milligram', value: milligram },
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
              className="grow text-right focus:outline-none"
              onChange={(event) => {
                const newValue: string = event.target.value;
                const newAmount: number = parseFloat(newValue) ?? 0;

                setState((previous) => ({
                  ...previous,
                  ton:
                    type === 'ton'
                      ? newAmount
                      : convertRates(weightRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'ton',
                        }),
                  pound:
                    type === 'pound'
                      ? newAmount
                      : convertRates(weightRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'pound',
                        }),
                  ounce:
                    type === 'ounce'
                      ? newAmount
                      : convertRates(weightRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'ounce',
                        }),
                  milligram:
                    type === 'milligram'
                      ? newAmount
                      : convertRates(weightRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'milligram',
                        }),
                  gram:
                    type === 'gram'
                      ? newAmount
                      : convertRates(weightRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'gram',
                        }),
                  kilogram:
                    type === 'kilogram'
                      ? newAmount
                      : convertRates(weightRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'kilogram',
                        }),
                }));
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
Weight.displayName = 'Weight';

export const WeightModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <FullScreen centered onClose={onClose} title="Weight Converter">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <Weight />
      </div>
    </FullScreen>
  );
};
WeightModal.displayName = 'WeightModal';
