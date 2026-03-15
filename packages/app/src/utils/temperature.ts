export type TemperatureScale = 'celsius' | 'fahrenheit' | 'kelvin';
export type TemperatureUnit = 'c' | 'f' | 'k';
// celsius to fahrenheit
export const cf = (degree: number): number => degree * 1.8 + 32;
// fahrenheit to celsius
export const fc = (degree: number): number => (degree - 32) / 1.8;
// celsius to kelvin
export const ck = (degree: number): number => degree + 273.15;
// kelvin to celsius
export const kc = (degree: number): number => degree - 273.15;
// fahrenheit to kelvin
export const fk = (degree: number): number => ck(fc(degree));
// kelvin to fahrenheit
export const kf = (degree: number): number => cf(kc(degree));
// temperature
export const convertTemperature = ({
  degree,
  from,
  to,
}: {
  from: TemperatureUnit;
  to: TemperatureUnit;
  degree: number;
}): number => {
  if (from === to) return degree;
  if (from === 'c' && to === 'f') return cf(degree);
  if (from === 'f' && to === 'c') return fc(degree);
  if (from === 'c' && to === 'k') return ck(degree);
  if (from === 'k' && to === 'c') return kc(degree);
  if (from === 'f' && to === 'k') return fk(degree);
  if (from === 'k' && to === 'f') return kf(degree);
  return degree;
};
