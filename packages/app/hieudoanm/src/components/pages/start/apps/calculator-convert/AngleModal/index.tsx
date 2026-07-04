'use client';

import { FC, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import { AngleUnit, convertAngle } from './converter';

export const Angle = () => {
  const [{ degrees, radians }, setState] = useState({
    degrees: 0,
    radians: 0,
  });

  return (
    <div className="card flex w-full max-w-sm flex-col gap-y-2 divide-y divide-white/10">
      {[
        { type: 'degrees' as AngleUnit, value: degrees },
        { type: 'radians' as AngleUnit, value: radians },
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
                    degrees: 0,
                    radians: 0,
                  });
                  return;
                }

                setState((previous) => ({
                  ...previous,
                  degrees: convertAngle(newAmount, type, 'degrees'),
                  radians: convertAngle(newAmount, type, 'radians'),
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
Angle.displayName = 'Angle';

export const AngleModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <FullScreen centered onClose={onClose} title="Angle Converter">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <Angle />
      </div>
    </FullScreen>
  );
};
AngleModal.displayName = 'AngleModal';
