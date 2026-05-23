export type AngleUnit = 'degrees' | 'radians';

export const convertAngle = (
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
