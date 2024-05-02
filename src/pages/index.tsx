import { NextPage } from 'next';
import Link from 'next/link';
import profile from '@hieudoanm/assets/profile.jpg';

type Project = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  link: string;
  pricing: string;
};

const HomePage: NextPage = () => {
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
      description:
        'Time management technique: work for 25 mins, break, repeat.',
      link: 'https://hieudoanm.github.io/app-pomodoro',
      pricing: 'free',
    },
  ];

  return (
    <div data-theme='luxury'>
      <div className='h-screen w-screen overflow-auto bg-white p-8 lg:p-16'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='col-span-1'>
            <div className='flex flex-col items-center justify-center gap-y-8'>
              <div className='mx-auto flex w-[25%] flex-col lg:w-[50%]'>
                <div className='aspect-square w-full overflow-hidden rounded-full border border-secondary p-1'>
                  <div
                    className='h-full w-full rounded-full bg-cover bg-center'
                    style={{ backgroundImage: `url(${profile.src})` }}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-y-4 text-center'>
                <Link href='/about' className='text-2xl font-bold uppercase'>
                  Hieu Doan
                </Link>
                <p>📍 Vietnam</p>
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
                                <div className='flex h-6 w-6 items-center justify-center rounded-full bg-white'>
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
