import { Glass } from '@web/components/Glass';
import { Linear } from '@web/components/Linear';
import { NextPage } from 'next';
import Link from 'next/link';
import type { IconType } from 'react-icons';
import {
  FaAppStoreIos,
  FaH,
  FaLaptopCode,
  FaLinkedin,
  FaSquareGithub,
  FaSquareTwitter,
} from 'react-icons/fa6';

type AppLink = {
  id: string;
  name: string;
  href: string;
  Icon: IconType;
  target?: '_self' | '_blank';
};

const apps: AppLink[] = [
  {
    id: 'activities',
    href: '/activities',
    name: 'Activities',
    Icon: FaLaptopCode,
    target: '_self',
  },
  {
    id: 'store',
    href: '/store',
    name: 'Store',
    Icon: FaAppStoreIos,
    target: '_self',
  },
  {
    id: 'github',
    href: 'https://github.com/hieudoanm',
    name: 'GitHub',
    Icon: FaSquareGithub,
    target: '_blank',
  },
  {
    id: 'x',
    href: 'https://x.com/hieudoanm',
    name: 'X (Twitter)',
    Icon: FaSquareTwitter,
    target: '_blank',
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/hieudoanm',
    name: 'LinkedIn',
    Icon: FaLinkedin,
    target: '_blank',
  },
];

const primaryApps = apps.filter((a) => a.target !== '_blank');
const socialApps = apps.filter((a) => a.target === '_blank');

const HomePage: NextPage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Linear.Background />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12 md:px-12">
        {/* Header / Identity */}
        <div className="flex flex-1 flex-col justify-center gap-12 md:flex-row md:items-center md:gap-20">
          {/* Left: Identity */}
          <div className="flex flex-col items-center gap-6">
            <Link href="/hieudoanm">
              <Glass.Button className="flex aspect-square w-32 items-center justify-center rounded-full transition-transform hover:rotate-12">
                <FaH className="text-6xl" aria-hidden />
              </Glass.Button>
            </Link>

            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight">Hieu Doan</h1>
              <p className="mt-1 text-neutral-400">Builder · Engineer</p>
            </div>
          </div>

          {/* Right: Primary actions */}
          <div className="flex w-full max-w-md flex-col gap-4">
            {primaryApps.map(({ id, name, href, Icon }) => (
              <Link key={id} href={href} className="group">
                <Glass.Card className="flex items-center gap-4 px-6 py-4 transition-all group-hover:translate-x-1">
                  <Icon
                    className="text-3xl text-neutral-400 transition-colors group-hover:text-white"
                    aria-hidden
                  />
                  <span className="text-lg font-medium">{name}</span>
                </Glass.Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer / Social dock */}
        <div className="mt-12 flex justify-center gap-4">
          {socialApps.map(({ id, href, Icon }) => (
            <Link
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer">
              <Glass.Button className="flex aspect-square items-center justify-center rounded-full transition-transform hover:scale-110">
                <Icon className="text-xl md:text-4xl" aria-hidden />
              </Glass.Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
