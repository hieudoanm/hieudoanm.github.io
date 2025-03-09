import { hexToRgb, randomHexColorCode, rgbToHex } from '@web/utils/colors';
import { copyToClipboard } from '@web/utils/navigator';
import { ChangeEvent, useState } from 'react';
import { FaArrowRotateLeft, FaCopy } from 'react-icons/fa6';

export const WidgetColorsConverter = () => {
  const [colors, setColors] = useState<{ hex: string; rgb: string }>({
    hex: '#fb2c36',
    rgb: 'rgb(251, 44, 54)',
  });

  return (
    <div className="shadow-3xl aspect-square w-full max-w-60 overflow-hidden rounded-full border border-white bg-gray-900">
      <div className="flex h-full w-full items-center justify-center">
        <div
          style={{ color: colors.hex ?? colors.rgb }}
          className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <input
              id="hex"
              name="hex"
              placeholder="HEX"
              className="w-full bg-transparent text-center text-xl uppercase"
              maxLength={7}
              value={colors.hex}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const newHex: string = event.target.value.toString();
                const newRBG = hexToRgb(newHex);
                if (newRBG === null)
                  return setColors({ ...colors, hex: newHex });
                const { r, g, b } = newRBG;
                setColors({
                  hex: newHex,
                  rgb: `rgb(${r}, ${g}, ${b})`,
                });
              }}
            />
            <input
              id="rgb"
              name="rgb"
              placeholder="RGB"
              className="w-full bg-transparent text-center text-xl uppercase"
              maxLength={18}
              value={colors.rgb}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const newRgb = event.target.value;
                const [r = '0', g = '0', b = '0'] = newRgb
                  .replaceAll('rgb(', '')
                  .replaceAll(')', '')
                  .replaceAll(' ', '')
                  .split(',');
                const newHex: string = rgbToHex(
                  parseInt(r, 10),
                  parseInt(g, 10),
                  parseInt(b, 10)
                );
                setColors({ hex: newHex, rgb: newRgb });
              }}
            />
          </div>
          <div className="flex items-center justify-center gap-x-4">
            <button
              type="button"
              className="text-gray-100"
              onClick={() => {
                const newHex: string = randomHexColorCode();
                const newRBG = hexToRgb(newHex);
                if (newRBG === null)
                  return setColors({ ...colors, hex: newHex });
                const { r, g, b } = newRBG;
                setColors({
                  hex: newHex,
                  rgb: `rgb(${r}, ${g}, ${b})`,
                });
              }}>
              <FaArrowRotateLeft className="mx-auto text-xl" />
            </button>
            <button
              type="button"
              className="text-gray-100"
              onClick={() => copyToClipboard(colors.hex)}>
              <FaCopy className="mx-auto text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
