export const oklch2hex = (l: number, c: number, h: number): string => {
  // Step 1: OKLCH → OKLab
  const a = c * Math.cos((h / 360) * (2 * Math.PI));
  const b = c * Math.sin((h / 360) * (2 * Math.PI));

  const L_ = Math.pow(l, 3);
  const m_ = (a + 0.3963377774 * L_ - 0.2158037573 * b) / 0.5372041979;
  const s_ = (b + 0.1055613458 * L_ + 0.0638541748 * a) / 0.7032193155;

  // Step 2: OKLab → Linear RGB
  const rLin = 3.2404541621 * L_ - 1.5371385121 * m_ - 0.498531409 * s_;
  const gLin = -0.9692660301 * L_ + 1.8760108454 * m_ + 0.0415560175 * s_;
  const bLin = 0.0556434137 * L_ - 0.2040259133 * m_ + 1.0572251882 * s_;

  // Step 3: Linear RGB → RGB
  const linearToSrgb = (c: number) =>
    c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

  const r = linearToSrgb(rLin);
  const g = linearToSrgb(gLin);
  const blue = linearToSrgb(bLin);

  // Step 4: RGB → Hex
  const toHex = (x: number) => {
    const hex = Math.round(x * 255)
      .toString(16)
      .padStart(2, '0');
    return hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(blue)}`;
};
