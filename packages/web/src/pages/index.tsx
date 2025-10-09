import { Glass } from '@web/components/Glass';
import { Linear } from '@web/components/Linear';
import { NextPage } from 'next';
import Link from 'next/link';
import {
  FaAppStoreIos,
  FaH,
  FaLinkedin,
  FaSquareGithub,
  FaSquareTwitter,
} from 'react-icons/fa6';

const HomePage: NextPage = () => {
  const apps = [
    {
      id: 'store',
      href: '/store',
      name: 'Store',
      icon: <FaAppStoreIos className="text-4xl" />,
      target: '_self',
    },
    {
      id: 'github',
      href: 'https://github.com/hieudoanm',
      name: 'GitHub',
      icon: <FaSquareGithub className="text-4xl" />,
      target: '_blank',
    },
    {
      id: 'x',
      href: 'https://x.com/hieudoanm',
      name: 'X (Twitter)',
      icon: <FaSquareTwitter className="text-4xl" />,
      target: '_blank',
    },
    {
      id: 'linkedin',
      href: 'https://www.linkedin.com/in/hieudoanm',
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-4xl" />,
      target: '_blank',
    },
  ];

  return (
    <div className="min-h-screen w-screen overflow-hidden p-8 md:h-screen">
      <Linear.Background />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-y-12 overflow-auto">
        <Link href="/hieudoanm">
          <Glass.Button className="flex aspect-square w-36 items-center justify-center gap-x-2 rounded-full hover:rotate-12">
            <FaH key="H" className="text-6xl" />
          </Glass.Button>
        </Link>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {apps.map(({ id, name, href, icon, target }) => (
            <Link
              key={id}
              href={href}
              target={target}
              className="group text-neutral-500 transition-colors hover:text-white">
              <Glass.Card className="flex flex-col items-center justify-center gap-2">
                <div className="flex justify-center group-hover:rotate-12">
                  {icon}
                </div>
                <div className="text-center text-lg font-semibold capitalize">
                  {name}
                </div>
              </Glass.Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const dynamic = 'force-static';

export default HomePage;
