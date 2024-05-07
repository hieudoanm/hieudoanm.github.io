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
  type: 'miniapp' | 'boilerplate';
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
    type: 'miniapp',
  },
  {
    id: 'colours',
    name: 'Colours',
    emoji: '🎨',
    description: 'Colours Tools - HEX to RGB and Colours Picker',
    link: 'https://hieudoanm.github.io/app-colours',
    pricing: 'free',
    type: 'miniapp',
  },
  {
    id: 'csv',
    name: 'CSV',
    emoji: '📒',
    description:
      'Tool for creating, editing, and managing CSV (comma-separated values) files.',
    link: 'https://hieudoanm.github.io/app-csv',
    pricing: 'free',
    type: 'miniapp',
  },
  {
    id: 'fx',
    name: 'Forex',
    emoji: '💱',
    description:
      'Currency conversion tool for global financial transactions, facilitating exchange rates.',
    link: 'https://hieudoanm.github.io/app-forex',
    pricing: 'free',
    type: 'miniapp',
  },
  {
    id: 'geerthofstede',
    name: 'Geert Hofstede',
    emoji: '🤌',
    description:
      'Cultural dimensions researcher, known for cross-cultural studies.',
    link: 'https://hieudoanm.github.io/geerthofstede.com/',
    pricing: 'free',
    type: 'miniapp',
  },
  {
    id: 'google',
    name: 'GoogleX',
    emoji: '🔍',
    description:
      'Add-ons enhancing Google functionality, offering various features and utilities.',
    link: 'https://googlex.vercel.app',
    pricing: 'free',
    type: 'miniapp',
  },
  {
    id: 'instax',
    name: 'InstaX',
    emoji: '📷',
    description: 'Instagram Extensions: Download posts, stories and reels',
    link: 'https://instagramdownload.vercel.app/',
    pricing: 'free',
    type: 'miniapp',
  },
  {
    id: 'news',
    name: 'News Express',
    emoji: '📰',
    description: 'Reading quick news in 10 minutes every morning',
    link: 'https://newsexpress.vercel.app/',
    pricing: 'free',
    type: 'miniapp',
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro',
    emoji: '⏱️',
    description: 'Time management technique: work for 25 mins, break, repeat.',
    link: 'https://hieudoanm.github.io/app-pomodoro',
    pricing: 'free',
    type: 'miniapp',
  },
  {
    id: 'telegpt',
    name: 'TeleGPT',
    emoji: '📟',
    description:
      'Enhanced messaging with AI-driven assistance, enriching Telegram conversations seamlessly.',
    link: 'https://telegramxgpt.vercel.app',
    pricing: 'free',
    type: 'miniapp',
  },
  {
    id: 'go-cli',
    name: 'Go CLI',
    emoji: '',
    description:
      'Golang CLI Boilerplate: Foundation for building command-line interfaces in Go.',
    link: 'https://github.com/hieudoanm/go-cli',
    pricing: 'public',
    type: 'boilerplate',
  },
  {
    id: 'py-fast',
    name: 'FastAPI',
    emoji: '',
    description: 'Build RESTful API quickly.',
    link: 'https://github.com/hieudoanm/py-fastapi',
    pricing: 'public',
    type: 'boilerplate',
  },
  {
    id: 'ts-solid',
    name: 'TypeScript - Solid.js',
    emoji: '',
    description:
      'Solid.js Boilerplate: Jumpstart for building fast and reactive web applications effortlessly.',
    link: 'https://github.com/hieudoanm/ts-solid',
    pricing: 'public',
    type: 'boilerplate',
  },
  {
    id: 'ts - next',
    name: 'TypeScript - Next.js',
    emoji: '',
    description:
      'Next.js Boilerplate: Efficient starting point for React web application development.',
    link: 'https://github.com/hieudoanm/ts-next',
    pricing: 'public',
    type: 'boilerplate',
  },
  {
    id: 'ts-expo',
    name: 'TypeScript - Expo',
    emoji: '',
    description:
      'Expo Boilerplate: Rapid setup for cross-platform mobile app development with ease.',
    link: 'https://github.com/hieudoanm/ts-expo',
    pricing: 'public',
    type: 'boilerplate',
  },
  {
    id: 'ts-gql',
    name: 'TypeScript - GraphQL',
    emoji: '',
    description:
      'GraphQL Boilerplate: Kickstart GraphQL projects with structured schema and essential configurations.',
    link: 'https://github.com/hieudoanm/ts-gql',
    pricing: 'public',
    type: 'boilerplate',
  },
  {
    id: 'ts-hono',
    name: 'TypeScript - Hono',
    emoji: '',
    description:
      '"Hono - Serverless Framework: Scalable, efficient, cloud-native, event-driven computing solution."',
    link: 'https://github.com/hieudoanm/ts-hono',
    pricing: 'public',
    type: 'boilerplate',
  },
  {
    id: 'ts-nest',
    name: 'TypeScript - Nest.js',
    emoji: '',
    description:
      'Nest.js Boilerplate: Streamlined foundation for scalable TypeScript backend development.',
    link: 'https://github.com/hieudoanm/ts-nest',
    pricing: 'public',
    type: 'boilerplate',
  },
];

const miniapps = projects.filter(({ type }) => type === 'miniapp');
const boilerplates = projects.filter(({ type }) => type === 'boilerplate');

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
                <Link href='/' className='text-2xl font-bold uppercase'>
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
            <div className='flex flex-col gap-y-8'>
              <h1 className='text-xl font-bold'>Mini Apps</h1>
              <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
                {miniapps.map(
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
              <h1 className='text-xl font-bold'>Boilerplates</h1>
              <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
                {boilerplates.map(
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
    </div>
  );
};

export default HomePage;
