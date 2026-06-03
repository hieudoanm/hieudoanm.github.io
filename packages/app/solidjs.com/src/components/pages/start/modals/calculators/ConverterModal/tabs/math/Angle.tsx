import { createSignal } from 'solid-js';

type AngleUnit = 'degrees' | 'radians';

const convertAngle = (
  fromAmount: number,
  fromUnit: AngleUnit,
  toUnit: AngleUnit
): number => {
  let degreesValue: number;

  if (fromUnit === 'degrees') {
    degreesValue = fromAmount;
  } else if (fromUnit === 'radians') {
    degreesValue = fromAmount * (180 / Math.PI);
  } else {
    degreesValue = fromAmount;
  }

  if (toUnit === 'degrees') {
    return parseFloat(degreesValue.toFixed(5));
  } else if (toUnit === 'radians') {
    return parseFloat((degreesValue * (Math.PI / 180)).toFixed(5));
  } else {
    return parseFloat(degreesValue.toFixed(5));
  }
};

export const Angle = () => {
  const [degrees, setDegrees] = createSignal(0);
  const [radians, setRadians] = createSignal(0);

  const handleChange = (value: string, type: AngleUnit) => {
    const newAmount = parseFloat(value);
    if (isNaN(newAmount)) {
      setDegrees(0);
      setRadians(0);
      return;
    }
    setDegrees(convertAngle(newAmount, type, 'degrees'));
    setRadians(convertAngle(newAmount, type, 'radians'));
  };

  return (
    <div class="card flex w-full max-w-sm flex-col gap-y-2 divide-y divide-white/10">
      {[
        { type: 'degrees' as AngleUnit, value: degrees },
        { type: 'radians' as AngleUnit, value: radians },
      ].map(({ type, value }) => {
        return (
          <div
            key={type}
            class="flex items-center justify-center gap-x-2 px-4 py-2">
            <span class="capitalize">{type}</span>
            <input
              type="text"
              id={type}
              placeholder={type}
              value={value()}
              onChange={(event: Event) =>
                handleChange((event.target as HTMLInputElement).value, type)
              }
              class="grow text-right focus:outline-none"
            />
          </div>
        );
      })}
    </div>
  );
};
