import Link from 'next/link';
import { FC } from 'react';
import { FaAppStore } from 'react-icons/fa6';
import { TbMathFunction } from 'react-icons/tb';

export type NavbarProps = { border?: boolean };

export const Navbar: FC<NavbarProps> = ({ border = false }) => {
  const borderBottom: string = border ? 'border-b border-base-content' : '';
  const paddingBottom: string = border ? 'pb-4 md:pb-8' : 'pb-0 md:pb-0';

  return (
    <nav>
      <div className={borderBottom}>
        <div className='container mx-auto'>
          <div className={`px-4 pt-4 md:px-8 md:pt-8 ${paddingBottom}`}>
            <div className='flex items-center justify-between'>
              <Link href='/'>
                <span className='text-xl'>
                  <TbMathFunction size={24} />
                </span>
              </Link>
              <Link href='/apps'>
                <FaAppStore size={24} className='hover:animate-spin' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
