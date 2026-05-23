'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import { TemperatureUnit, convertTemperature } from './converter';

export const Temperature: FC = () => {
  const [{ celsius, fahrenheit, kelvin }, setState] = useState({
    celsius: 0,
    fahrenheit: 32,
    kelvin: 273.15,
  });

  return (
    <div className="card flex w-full max-w-md flex-col gap-y-2 divide-y divide-white/10">
      {[
        { type: 'celsius' as TemperatureUnit, value: celsius },
        { type: 'fahrenheit' as TemperatureUnit, value: fahrenheit },
        { type: 'kelvin' as TemperatureUnit, value: kelvin },
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
                const newAmount: number = parseFloat(newValue);

                if (isNaN(newAmount)) {
                  setState({
                    celsius: 0,
                    fahrenheit: 32,
                    kelvin: 273.15,
                  });
                  return;
                }

                setState((previous) => ({
                  ...previous,
                  celsius: convertTemperature(newAmount, type, 'celsius'),
                  fahrenheit: convertTemperature(newAmount, type, 'fahrenheit'),
                  kelvin: convertTemperature(newAmount, type, 'kelvin'),
                }));
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
Temperature.displayName = 'Temperature';

export const TemperatureModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper
      onClose={onClose}
      title="Temperature Converter"
      size="max-w-lg">
      <div className="rounded-box bg-base-200 p-4">
        <Temperature />
      </div>
    </ModalWrapper>
  );
};
TemperatureModal.displayName = 'TemperatureModal';
