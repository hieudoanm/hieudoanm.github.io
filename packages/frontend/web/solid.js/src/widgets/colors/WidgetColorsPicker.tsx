/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSignal } from 'solid-js';
import { rgbToHex } from '~/utils/colors';
import { copyToClipboard } from '~/utils/navigator';

export const WidgetColorsPicker = () => {
  const [signal, setState] = createSignal<{ color: string }>({
    color: '#fb2c36',
  });
  const colors = [
    { r: 0xe4, g: 0x3f, b: 0x00 },
    { r: 0xfa, g: 0xe4, b: 0x10 },
    { r: 0x55, g: 0xcc, b: 0x3b },
    { r: 0x09, g: 0xad, b: 0xff },
    { r: 0x6b, g: 0x0e, b: 0xfd },
    { r: 0xe7, g: 0x0d, b: 0x86 },
    { r: 0xe4, g: 0x3f, b: 0x00 },
  ];

  return (
    <div class="shadow-3xl aspect-square w-full max-w-60 overflow-hidden rounded-full border border-black bg-gray-900">
      <div class="h-full w-full p-2">
        <div
          class="h-full w-full rounded-full bg-white p-2 transition-all"
          style={{
            background: `linear-gradient(#111111, ${signal().color}, #eeeeee)`,
          }}>
          <div class="h-full w-full rounded-full bg-gray-900 p-2">
            <button
              class="relative h-full w-full rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 50% 0,red,rgba(242,13,13,.8) 10%,rgba(230,26,26,.6) 20%,rgba(204,51,51,.4) 30%,rgba(166,89,89,.2) 40%,hsla(0,0%,50%,0) 50%),radial-gradient(circle at 85.35533905932738% 14.644660940672622%,#ffbf00,rgba(242,185,13,.8) 10%,rgba(230,179,26,.6) 20%,rgba(204,166,51,.4) 30%,rgba(166,147,89,.2) 40%,hsla(0,0%,50%,0) 50%),radial-gradient(circle at 100% 50%,#80ff00,rgba(128,242,13,.8) 10%,rgba(128,230,26,.6) 20%,rgba(128,204,51,.4) 30%,rgba(128,166,89,.2) 40%,hsla(0,0%,50%,0) 50%),radial-gradient(circle at 85.35533905932738% 85.35533905932738%,#00ff40,rgba(13,242,70,.8) 10%,rgba(26,230,77,.6) 20%,rgba(51,204,89,.4) 30%,rgba(89,166,108,.2) 40%,hsla(0,0%,50%,0) 50%),radial-gradient(circle at 50.00000000000001% 100%,#0ff,rgba(13,242,242,.8) 10%,rgba(26,230,230,.6) 20%,rgba(51,204,204,.4) 30%,rgba(89,166,166,.2) 40%,hsla(0,0%,50%,0) 50%),radial-gradient(circle at 14.64466094067263% 85.35533905932738%,#0040ff,rgba(13,70,242,.8) 10%,rgba(26,77,230,.6) 20%,rgba(51,89,204,.4) 30%,rgba(89,108,166,.2) 40%,hsla(0,0%,50%,0) 50%),radial-gradient(circle at 0 50.00000000000001%,#8000ff,rgba(128,13,242,.8) 10%,rgba(128,26,230,.6) 20%,rgba(128,51,204,.4) 30%,rgba(128,89,166,.2) 40%,hsla(0,0%,50%,0) 50%),radial-gradient(circle at 14.644660940672615% 14.64466094067263%,#ff00bf,rgba(242,13,185,.8) 10%,rgba(230,26,179,.6) 20%,rgba(204,51,166,.4) 30%,rgba(166,89,147,.2) 40%,hsla(0,0%,50%,0) 50%)',
              }}
              onMouseMove={(event) => {
                const boundingClientRect = (
                  event.target as any
                ).getBoundingClientRect();
                //Compute cartesian coordinates as if the circle radius was 1
                const x =
                  (2 * (event.clientX - boundingClientRect.left)) /
                    (boundingClientRect.right - boundingClientRect.left) -
                  1;
                const y =
                  1 -
                  (2 * (event.clientY - boundingClientRect.top)) /
                    (boundingClientRect.bottom - boundingClientRect.top);
                //Compute the angle in degrees with 0 at the top and turning clockwise as expected by css conic gradient
                let angle = ((Math.PI / 2 - Math.atan2(y, x)) / Math.PI) * 180;
                if (angle < 0) angle += 360;
                //Map the angle between 0 and number of colors in the gradient minus one
                angle = (angle / 360) * (colors.length - 1); // minus one because the last item is at 360° which is the same as 0°
                //Compute the colors to interpolate
                const angle0 = Math.floor(angle) % colors.length;
                const angle1 = (angle0 + 1) % colors.length;
                const c0 = colors[angle0];
                const c1 = colors[angle1];
                //Compute the weights and interpolate colors
                const a1w = angle - Math.floor(angle);
                const a0w = 1 - a1w;
                const color = {
                  r: c0.r * a0w + c1.r * a1w,
                  g: c0.g * a0w + c1.g * a1w,
                  b: c0.b * a0w + c1.b * a1w,
                };
                //Compute the radius
                let r = Math.sqrt(x * x + y * y);
                if (r > 1) r = 1;
                //Compute the white weight, interpolate, and round to integer
                const cw = r < 0.8 ? r / 0.8 : 1;
                const ww = 1 - cw;
                color.r = Math.round(color.r * cw + 255 * ww);
                color.g = Math.round(color.g * cw + 255 * ww);
                color.b = Math.round(color.b * cw + 255 * ww);
                //Compute the hex color code and apply it
                const hexColor = rgbToHex(color.r, color.g, color.b);
                setState((previous) => ({ ...previous, color: hexColor }));
              }}
              onClick={() => copyToClipboard(signal().color)}></button>
          </div>
        </div>
      </div>
    </div>
  );
};
