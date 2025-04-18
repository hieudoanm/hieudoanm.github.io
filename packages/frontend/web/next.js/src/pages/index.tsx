import { NextPage } from 'next';
import Link from 'next/link';
import {
  FaAppStoreIos,
  FaFileWord,
  FaLinkedin,
  FaSquareGithub,
  FaSquareTwitter,
  FaWindowRestore,
} from 'react-icons/fa6';

const HomePage: NextPage = () => {
  const apps = [
    {
      id: 'apps',
      href: '/apps',
      name: 'Apps',
      icon: <FaAppStoreIos />,
      target: '_self',
    },
    {
      id: 'notes',
      href: '/posts',
      name: 'Notes',
      icon: <FaFileWord />,
      target: '_self',
    },
    {
      id: 'widgets',
      href: '/widgets',
      name: 'Widgets',
      icon: <FaWindowRestore />,
      target: '_self',
    },
    {
      id: 'github',
      href: 'https://github.com/hieudoanm',
      name: 'GitHub',
      icon: <FaSquareGithub />,
      target: '_blank',
    },
    {
      id: 'twitter',
      href: 'https://x.com/hieudoanm',
      name: 'Twitter',
      icon: <FaSquareTwitter />,
      target: '_blank',
    },
    {
      id: 'linkedin',
      href: 'https://www.linkedin.com/in/hieudoanm',
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      target: '_blank',
    },
  ];

  const targets: string[] = [...new Set(apps.map(({ target }) => target))];
  const appsByTarget = targets.map((target: string) => {
    return { target, apps: apps.filter((app) => app.target === target) };
  });

  return (
    <div className="h-screen w-screen p-8">
      <div className="flex h-full flex-col items-center justify-center gap-y-8">
        <p className="text-xl font-black tracking-wide uppercase">Nothing</p>
        <div className="flex flex-col items-center justify-center gap-y-8">
          {appsByTarget.map(({ target, apps = [] }) => {
            return (
              <div
                key={target}
                className="flex flex-col items-center justify-center gap-y-2">
                {apps.map(({ id, href, name, icon, target = '_self' }) => {
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-x-1 border-b border-dotted">
                      {icon}
                      <Link
                        href={href}
                        target={target}
                        className="tracking-wide lowercase">
                        {name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const dynamic = 'force-static';

export default HomePage;
