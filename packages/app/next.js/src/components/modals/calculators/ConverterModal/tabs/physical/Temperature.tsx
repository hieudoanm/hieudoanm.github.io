import { FC, useState } from 'react';

type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

// Conversion functions based on Celsius as the base
const convertTemperature = (
  fromAmount: number,
  fromUnit: TemperatureUnit,
  toUnit: TemperatureUnit
): number => {
  let celsiusValue: number;

  // Convert the 'from' amount to Celsius
  if (fromUnit === 'celsius') {
    celsiusValue = fromAmount;
  } else if (fromUnit === 'fahrenheit') {
    celsiusValue = ((fromAmount - 32) * 5) / 9;
  } else if (fromUnit === 'kelvin') {
    celsiusValue = fromAmount - 273.15;
  } else {
    celsiusValue = fromAmount; // Default or error case
  }

  // Convert from Celsius to the 'to' unit
  if (toUnit === 'celsius') {
    return parseFloat(celsiusValue.toFixed(2));
  } else if (toUnit === 'fahrenheit') {
    return parseFloat(((celsiusValue * 9) / 5 + 32).toFixed(2));
  } else if (toUnit === 'kelvin') {
    return parseFloat((celsiusValue + 273.15).toFixed(2));
  } else {
    return parseFloat(celsiusValue.toFixed(2)); // Default or error case
  }
};

export const Temperature: FC = () => {
  const [{ celsius, fahrenheit, kelvin }, setState] = useState<{
    celsius: number;
    fahrenheit: number;
    kelvin: number;
  }>({
    celsius: 0,
    fahrenheit: 32, // 0 Celsius is 32 Fahrenheit
    kelvin: 273.15, // 0 Celsius is 273.15 Kelvin
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

                // If the input is empty or not a valid number, set all to 0 or initial state
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
