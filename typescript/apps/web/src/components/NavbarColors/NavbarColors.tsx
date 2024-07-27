import Link from 'next/link';
import { FC } from 'react';

export const NavbarColors: FC = () => {
  return (
    <div className='flex items-center justify-center gap-x-2'>
      <Link href='/apps/colors/converter' className='uppercase'>
        Converter
      </Link>
      <span>|</span>
      <Link href='/apps/colors/picker' className='uppercase'>
        Picker
      </Link>
      <span>|</span>
      <Link href='/apps/colors/randomiser' className='uppercase'>
        Randomiser
      </Link>
    </div>
  );
};
