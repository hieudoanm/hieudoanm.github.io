import { months, weekdays } from '~/constants';
import { addZero } from '~/utils/number';

import { createSignal } from 'solid-js';

const buildReadableString = (date: Date): string => {
  const dateString: string = `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const time: string = `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
  return `${dateString} ${time}`;
};

const EpochPage = () => {
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
  ] = createSignal<{
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
    <div class="h-screen w-screen">
      <div class="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div class="col-span-1 row-span-1 h-full bg-gray-100 text-gray-900">
          <textarea
            id="timestamp"
            name="timestamp"
            placeholder="Timestamp"
            value={timestamp}
            class="h-full w-full p-8"
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
        <div class="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="dateTime"
            name="dateTime"
            placeholder="Date Time"
            value={dateString}
            class="h-full w-full p-8"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default EpochPage;
