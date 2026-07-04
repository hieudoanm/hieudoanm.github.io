export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

export const convertTemperature = (
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
