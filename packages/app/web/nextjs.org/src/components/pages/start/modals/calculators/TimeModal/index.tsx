'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import { TimeUnit } from './constants';
import { convertTime } from './converter';

export const Time: FC = () => {
  const [
    { milliseconds, seconds, minutes, hours, days, weeks, months, years, date },
    setState,
  ] = useState({
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0,
    years: 0,
    date: new Date().toLocaleString(),
  });

  return (
    <div className="card flex w-full max-w-md flex-col gap-y-2 divide-y divide-white/10">
      {(
        [
          { type: 'milliseconds' as TimeUnit, value: milliseconds },
          { type: 'seconds' as TimeUnit, value: seconds },
          { type: 'minutes' as TimeUnit, value: minutes },
          { type: 'hours' as TimeUnit, value: hours },
          { type: 'days' as TimeUnit, value: days },
          { type: 'weeks' as TimeUnit, value: weeks },
          { type: 'months' as TimeUnit, value: months },
          { type: 'years' as TimeUnit, value: years },
          { type: 'date' as TimeUnit, value: date },
        ] as const
      ).map(({ type, value }) => {
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
                let newAmount: number;

                if (type === 'date') {
                  const parsedDate = new Date(newValue);
                  newAmount = !isNaN(parsedDate.getTime())
                    ? parsedDate.getTime()
                    : 0;
                } else {
                  newAmount = parseFloat(newValue);
                }

                if (isNaN(newAmount) && type !== 'date') {
                  setState({
                    milliseconds: 0,
                    seconds: 0,
                    minutes: 0,
                    hours: 0,
                    days: 0,
                    weeks: 0,
                    months: 0,
                    years: 0,
                    date: new Date(0).toLocaleString(),
                  });
                  return;
                }

                const baseMilliseconds =
                  type === 'date'
                    ? newAmount
                    : (convertTime(newAmount, type, 'milliseconds') as number);

                setState({
                  milliseconds: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'milliseconds'
                  ) as number,
                  seconds: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'seconds'
                  ) as number,
                  minutes: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'minutes'
                  ) as number,
                  hours: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'hours'
                  ) as number,
                  days: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'days'
                  ) as number,
                  weeks: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'weeks'
                  ) as number,
                  months: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'months'
                  ) as number,
                  years: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'years'
                  ) as number,
                  date: convertTime(
                    baseMilliseconds,
                    'milliseconds',
                    'date'
                  ) as string,
                });
              }}
              className="grow text-right focus:outline-none"
            />
          </div>
        );
      })}
    </div>
  );
};
Time.displayName = 'Time';

export const TimeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Time Converter" size="max-w-lg">
      <div className="rounded-box bg-base-200 p-4">
        <Time />
      </div>
    </ModalWrapper>
  );
};
TimeModal.displayName = 'TimeModal';
