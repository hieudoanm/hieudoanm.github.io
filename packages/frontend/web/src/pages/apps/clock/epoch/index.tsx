import { months, weekdays } from '@web/constants';
import { addZero } from '@web/utils/number';
import { NextPage } from 'next';
import { useState } from 'react';

const buildReadableString = (date: Date): string => {
  const dateString: string = `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const time: string = `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
  return `${dateString} ${time}`;
};

const EpochPage: NextPage = () => {
  const oneHour: number = 1000 * 60 * 60;
  const initialDate: Date = new Date();
  const initial: number = Math.floor(initialDate.getTime() / 1000);
  const timezoneOffset: number = initialDate.getTimezoneOffset();
  const timezone: number = timezoneOffset / -60;

  const [
    {
      timestamp = initial,
      isoString = new Date(initial * 1000).toISOString(),
      gmtString = buildReadableString(
        new Date(initial * 1000 - timezone * oneHour)
      ),
      readableString = buildReadableString(new Date(initial * 1000)),
    },
    setState,
  ] = useState<{
    timestamp: number;
    isoString: string;
    gmtString: string;
    readableString: string;
  }>({
    timestamp: initial,
    isoString: new Date(initial * 1000).toISOString(),
    gmtString: buildReadableString(
      new Date(initial * 1000 - timezone * oneHour)
    ),
    readableString: buildReadableString(new Date(initial * 1000)),
  });

  const dateString = `Assuming that this timestamp is in seconds:\n
ISO String     : ${isoString}
GMT            : ${gmtString}
Your Time Zone : ${readableString} GMT+${addZero(timezone)}`;

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-2">
        <div className="col-span-1">
          <textarea
            id="timestamp"
            name="timestamp"
            placeholder="Timestamp"
            value={timestamp}
            className="h-full w-full bg-gray-100 p-8 text-gray-900"
            onChange={(event) => {
              const newTimestamp: number =
                parseInt(event.target.value ?? '0', 10) ?? 0;
              const newDate: Date = new Date(newTimestamp * 1000);
              const isoString: string = newDate.toISOString();
              const timezoneOffset: number = newDate.getTimezoneOffset();
              const timezone: number = timezoneOffset / -60;
              const gmtDate = new Date(
                newTimestamp - timezone * 1000 * 60 * 60
              );
              setState((previous) => ({
                ...previous,
                timestamp: newTimestamp,
                isoString,
                gmtString: buildReadableString(gmtDate),
                readableString: buildReadableString(newDate),
              }));
            }}
          />
        </div>
        <div className="col-span-1">
          <textarea
            id="dateTime"
            name="dateTime"
            placeholder="Date Time"
            value={dateString}
            className="h-full w-full bg-gray-900 p-8 text-gray-100"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default EpochPage;
