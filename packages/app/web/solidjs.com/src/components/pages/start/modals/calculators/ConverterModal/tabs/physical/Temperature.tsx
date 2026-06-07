import { createSignal } from 'solid-js';

type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

const convertTemperature = (
  fromAmount: number,
  fromUnit: TemperatureUnit,
  toUnit: TemperatureUnit
): number => {
  let celsiusValue: number;

  if (fromUnit === 'celsius') {
    celsiusValue = fromAmount;
  } else if (fromUnit === 'fahrenheit') {
    celsiusValue = ((fromAmount - 32) * 5) / 9;
  } else if (fromUnit === 'kelvin') {
    celsiusValue = fromAmount - 273.15;
  } else {
    celsiusValue = fromAmount;
  }

  if (toUnit === 'celsius') {
    return parseFloat(celsiusValue.toFixed(2));
  } else if (toUnit === 'fahrenheit') {
    return parseFloat(((celsiusValue * 9) / 5 + 32).toFixed(2));
  } else if (toUnit === 'kelvin') {
    return parseFloat((celsiusValue + 273.15).toFixed(2));
  } else {
    return parseFloat(celsiusValue.toFixed(2));
  }
};

export const Temperature = () => {
  const [celsius, setCelsius] = createSignal(0);
  const [fahrenheit, setFahrenheit] = createSignal(32);
  const [kelvin, setKelvin] = createSignal(273.15);

  const handleChange = (value: string, type: TemperatureUnit) => {
    const newAmount = parseFloat(value);
    if (isNaN(newAmount)) {
      setCelsius(0);
      setFahrenheit(32);
      setKelvin(273.15);
      return;
    }
    setCelsius(convertTemperature(newAmount, type, 'celsius'));
    setFahrenheit(convertTemperature(newAmount, type, 'fahrenheit'));
    setKelvin(convertTemperature(newAmount, type, 'kelvin'));
  };

  return (
    <div class="card flex w-full max-w-md flex-col gap-y-2 divide-y divide-white/10">
      {[
        { type: 'celsius' as TemperatureUnit, value: celsius },
        { type: 'fahrenheit' as TemperatureUnit, value: fahrenheit },
        { type: 'kelvin' as TemperatureUnit, value: kelvin },
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
              class="grow text-right focus:outline-none"
              onChange={(event: Event) =>
                handleChange((event.target as HTMLInputElement).value, type)
              }
            />
          </div>
        );
      })}
    </div>
  );
};
