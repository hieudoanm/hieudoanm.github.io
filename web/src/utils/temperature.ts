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
