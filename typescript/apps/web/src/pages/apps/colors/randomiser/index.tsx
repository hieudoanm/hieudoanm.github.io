import { NavbarColors } from '@web/components/NavbarColors/NavbarColors';
import { Layout } from '@web/layout';
import { getBrightness, randomHexColorCode } from '@web/utils/colors';
import { copyToClipboard } from '@web/utils/copy';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FaCopy } from 'react-icons/fa6';

export const ColorsPage: NextPage = () => {
  const [backgroundColor, setBackgroundColor] = useState(randomHexColorCode());

  useEffect(() => {
    if (!document || typeof window === 'undefined') return;
    document.body.onkeyup = (event: KeyboardEvent) => {
      if (event.key === ' ' || event.code === 'Space') {
        setBackgroundColor(randomHexColorCode());
      }
    };
  }, []);

  const color = getBrightness(backgroundColor) ? '#ffffff' : '#000000';

  return (
    <div style={{ backgroundColor, color }}>
      <Layout nav footer footerContent={<NavbarColors />} full>
        <div className='flex h-full w-full items-center justify-center overflow-hidden'>
          <div className='flex items-center justify-between gap-x-4 text-4xl'>
            <button
              type='button'
              onClick={() => setBackgroundColor(randomHexColorCode())}
              className='uppercase'>
              {backgroundColor}
            </button>
            <button
              type='button'
              onClick={() => copyToClipboard(backgroundColor)}>
              <FaCopy />
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ColorsPage;
