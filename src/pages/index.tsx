import { NextPage } from 'next';
import Link from 'next/link';
import profile from '@hieudoanm/assets/profile.jpg';
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa6';
import {
  FaEnvelopeSquare,
  FaFacebookSquare,
  FaInstagramSquare,
} from 'react-icons/fa';

type Project = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  link: string;
  pricing: string;
};

const socialMedias = [
  {
    shown: false,
    id: 'email',
    icon: <FaEnvelopeSquare />,
    link: 'mailto:hieumdoan@gmail.com',
    title: 'Email',
  },
  {
    shown: true,
    id: 'linkedin',
    icon: <FaLinkedin />,
    link: 'https://www.linkedin.com/in/hieudoanm',
    title: 'LinkedIn',
  },
  {
    shown: true,
    id: 'github',
    icon: <FaGithub />,
    link: 'https://github.com/hieudoanm',
    title: 'GitHub',
  },
  {
    shown: false,
    id: 'telegram',
    icon: <FaTelegram />,
    link: 'https://t.me/hieudoanm',
    title: 'Telegram',
  },
  {
    shown: false,
    id: 'facebook',
    icon: <FaFacebookSquare />,
    link: 'https://www.facebook.com/hieudoanm',
    title: 'Facebook',
  },
  {
    shown: false,
    id: 'instagram',
    icon: <FaInstagramSquare />,
    link: 'https://www.instagram.com/hieudoan.com.vn/',
    title: 'Instagram',
  },
];
const projects: Project[] = [
  {
    id: 'chess',
    name: 'chess.com Insights',
    emoji: '♟️',
    description:
      'Chess.com Insights: analytics, trends, and personalized data for chess improvement.',
    link: 'https://chessinsights.vercel.app',
    pricing: 'free',
  },
  {
    id: 'colours',
    name: 'Colours',
    emoji: '🎨',
    description: 'Colours Tools - HEX to RGB and Colours Picker',
    link: 'https://hieudoanm.github.io/app-colours',
    pricing: 'free',
  },
  {
    id: 'csv',
    name: 'CSV',
    emoji: '📒',
    description:
      'Tool for creating, editing, and managing CSV (comma-separated values) files.',
    link: 'https://hieudoanm.github.io/app-csv',
    pricing: 'free',
  },
  {
    id: 'geerthofstede',
    name: 'Geert Hofstede',
    emoji: '🤌',
    description:
      'Cultural dimensions researcher, known for cross-cultural studies.',
    link: 'https://hieudoanm.github.io/geerthofstede.com/',
    pricing: 'free',
  },
  {
    id: 'instax',
    name: 'InstaX',
    emoji: '📷',
    description: 'Instagram Extensions: Download posts, stories and reels',
    link: 'https://instagramdownload.vercel.app/',
    pricing: 'free',
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro',
    emoji: '⏱️',
    description: 'Time management technique: work for 25 mins, break, repeat.',
    link: 'https://hieudoanm.github.io/app-pomodoro',
    pricing: 'free',
  },
  {
    id: 'telegram',
    name: 'TeleX',
    emoji: '📟',
    description:
      'Utility bots enhancing user experience within Telegram messaging platform.',
    link: 'https://telegramx.vercel.app',
    pricing: 'free',
  },
];

const HomePage: NextPage = () => {
  return (
    <div data-theme='luxury'>
      <div className='h-screen w-screen overflow-auto bg-white p-8 lg:p-16'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='col-span-1'>
            <div className='flex flex-col items-center justify-center gap-y-8'>
              <div className='mx-auto flex w-[25%] flex-col lg:w-[50%]'>
                <div className='aspect-square w-full overflow-hidden rounded-full border border-secondary'>
                  <div
                    className='h-full w-full rounded-full border-4 border-white bg-cover bg-center'
                    style={{ backgroundImage: `url(${profile.src})` }}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-y-4 text-center'>
                <Link href='/about' className='text-2xl font-bold uppercase'>
                  Hieu Doan
                </Link>
                <p>📍 Vietnam</p>
                <div className='flex items-center justify-center gap-x-2'>
                  {socialMedias
                    .filter(({ shown }) => shown)
                    .map(({ id, icon, link }) => {
                      return (
                        <div key={id}>
                          <Link href={link} target='_blank'>
                            {icon}
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-1 lg:col-span-2'>
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
              {projects.map(
                ({
                  id = '',
                  name = '',
                  emoji = '',
                  description = '',
                  link = '',
                  pricing = '',
                }: Project) => {
                  return (
                    <div key={id} className='col-span-1'>
                      <Link href={link} target='_blank'>
                        <div className='w-full rounded-xl border bg-secondary shadow transition-all hover:shadow-xl'>
                          <div className='flex flex-col gap-y-2 p-4'>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center gap-x-2'>
                                <div className='flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white'>
                                  {emoji}
                                </div>
                                <h2 className='text-lg font-bold'>{name}</h2>
                              </div>
                              <div className='badge badge-primary capitalize'>
                                {pricing}
                              </div>
                            </div>
                            <p className='truncate text-sm'>{description}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
