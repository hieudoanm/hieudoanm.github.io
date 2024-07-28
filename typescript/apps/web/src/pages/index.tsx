import profile from '@web/assets/profile.jpg';
import { NextPage } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';
import {
  FaEnvelopeSquare,
  FaFacebookSquare,
  FaInstagramSquare,
} from 'react-icons/fa';
import { FaAppStore, FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa6';

type SocialMedia = {
  shown: boolean;
  id: string;
  name: string;
  link: string;
  icon: ReactNode;
  external: boolean;
};

const socialMedias: SocialMedia[] = [
  {
    shown: true,
    id: 'apps',
    name: 'Apps',
    icon: <FaAppStore className='inline' />,
    link: '/apps',
    external: false,
  },
  {
    shown: false,
    id: 'email',
    name: 'Email',
    icon: <FaEnvelopeSquare className='inline' />,
    link: 'mailto:hieumdoan@gmail.com',
    external: true,
  },
  {
    shown: true,
    id: 'github',
    name: 'GitHub',
    icon: <FaGithub className='inline' />,
    link: 'https://github.com/hieudoanm',
    external: true,
  },
  {
    shown: true,
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <FaLinkedin className='inline' />,
    link: 'https://www.linkedin.com/in/hieudoanm',
    external: true,
  },
  {
    shown: false,
    id: 'telegram',
    name: 'Telegram',
    icon: <FaTelegram className='inline' />,
    link: 'https://t.me/hieudoanm',
    external: true,
  },
  {
    shown: false,
    id: 'facebook',
    name: 'Facebook',
    icon: <FaFacebookSquare className='inline' />,
    link: 'https://www.facebook.com/hieudoanm',
    external: true,
  },
  {
    shown: false,
    id: 'instagram',
    name: 'Instagram',
    icon: <FaInstagramSquare className='inline' />,
    link: 'https://www.instagram.com/hieudoan.com.vn/',
    external: true,
  },
];

const HomePage: NextPage = () => {
  return (
    <div className='h-screen w-screen overflow-auto p-8 lg:p-16'>
      <div className='container mx-auto h-full w-full'>
        <div className='flex h-full items-center justify-center'>
          <div className='flex flex-col items-center justify-center gap-y-4 lg:gap-y-8'>
            <div className='w-48 md:w-64'>
              <div className='aspect-square w-full overflow-hidden rounded-full'>
                <div
                  className='h-full w-full rounded-full border-4 border-base-content bg-cover bg-center'
                  style={{ backgroundImage: `url(${profile.src})` }}
                />
              </div>
            </div>
            <p className='text-2xl uppercase'>
              <Link href='/'>Hieu Doan</Link>
            </p>
            <div className='flex flex-col items-center justify-center gap-y-2 lg:gap-y-4'>
              {socialMedias
                .filter(({ shown }) => shown)
                .map(({ id, icon, link, name, external }) => {
                  return (
                    <div key={id}>
                      <Link
                        href={link}
                        target={external ? '_blank' : '_self'}
                        className='w-full'>
                        <button className='btn btn-primary mx-auto w-48 md:w-64'>
                          {icon} {name}
                        </button>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const dynamic = 'force-static';

export default HomePage;
