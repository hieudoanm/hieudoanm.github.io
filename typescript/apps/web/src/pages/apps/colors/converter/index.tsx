import { NavbarColors } from '@web/components/NavbarColors';
import { Layout } from '@web/layout';
import { getBrightness, hexToRgb, rgbToHex } from '@web/utils/colors';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

const ColorsConverterPage: NextPage = () => {
  const [colors, setColors] = useState<{ hex: string; rgb: string }>({
    hex: '#000000',
    rgb: 'rgb(0, 0, 0)',
  });

  const color = getBrightness(colors.hex) ? '#ffffff' : '#000000';

  return (
    <div style={{ backgroundColor: colors.hex ?? colors.rgb, color }}>
      <Layout nav full footer footerContent={<NavbarColors />}>
        <div className='flex h-full w-full items-center justify-center'>
          <div className='text-center'>
            <input
              id='hex'
              name='hex'
              placeholder='HEX'
              className='input w-full bg-transparent text-center text-xl uppercase'
              maxLength={7}
              value={colors.hex}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const newHex: string = event.target.value.toString();
                const result = hexToRgb(newHex);
                if (result === null)
                  return setColors({ ...colors, hex: newHex });
                const { r, g, b } = result;
                setColors({
                  hex: newHex,
                  rgb: `rgb(${r}, ${g}, ${b})`,
                });
              }}
            />
            <hr style={{ borderColor: color }} />
            <input
              id='rgb'
              name='rgb'
              placeholder='RGB'
              className='input w-full bg-transparent text-center text-xl uppercase'
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
        </div>
      </Layout>
    </div>
  );
};

export default ColorsConverterPage;
