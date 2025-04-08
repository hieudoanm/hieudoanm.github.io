import { createSignal } from 'solid-js';
import { FaSolidArrowRotateLeft, FaSolidCopy } from 'solid-icons/fa';
import { hexToRgb, randomHexColorCode, rgbToHex } from '~/utils/colors';
import { copyToClipboard } from '~/utils/navigator';

export const WidgetColorsConverter = () => {
  const [colors, setColors] = createSignal<{ hex: string; rgb: string }>({
    hex: '#fb2c36',
    rgb: 'rgb(251, 44, 54)',
  });

  return (
    <div class="shadow-3xl aspect-square w-full max-w-60 overflow-hidden rounded-full border border-white bg-gray-900">
      <div class="flex h-full w-full items-center justify-center">
        <div
          style={{ color: colors.hex ?? colors.rgb }}
          class="flex flex-col gap-y-4">
          <div class="flex flex-col gap-y-2">
            <input
              id="hex"
              name="hex"
              placeholder="HEX"
              class="w-full bg-transparent text-center text-xl uppercase"
              maxLength={7}
              value={colors.hex}
              onChange={(event) => {
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
              class="w-full bg-transparent text-center text-xl uppercase"
              maxLength={18}
              value={colors.rgb}
              onChange={(event) => {
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
          <div class="flex items-center justify-center gap-x-4">
            <button
              type="button"
              class="text-gray-100"
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
              <FaSolidArrowRotateLeft class="mx-auto text-xl" />
            </button>
            <button
              type="button"
              class="text-gray-100"
              onClick={() => copyToClipboard(colors.hex)}>
              <FaSolidCopy class="mx-auto text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
