import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaAppStoreIos,
  FaChessKnight,
  FaCode,
  FaGithub,
  FaLinkedin,
  FaLinkedinIn,
  FaPalette,
  FaPenToSquare,
  FaRobot,
  FaSquareGithub,
  FaSquareTwitter,
  FaTwitter,
  FaWindowRestore,
} from 'react-icons/fa6';

const HomePage: NextPage = () => {
  const [{ index = 0 }, setState] = useState<{ index: number }>({ index: 0 });

  const icons = [
    <FaCode key="code" className="text-5xl" />,
    <FaRobot key="robot" className="text-5xl" />,
    <FaGithub key="github" className="text-5xl" />,
    <FaTwitter key="github" className="text-5xl" />,
    <FaPalette key="design" className="text-5xl" />,
    <FaLinkedinIn key="github" className="text-5xl" />,
    <FaChessKnight key="chess" className="text-5xl" />,
    <FaPenToSquare key="notes" className="text-5xl" />,
  ];

  const apps = [
    {
      id: 'notes',
      href: '/posts',
      name: 'Notes',
      icon: <FaPenToSquare />,
      target: '_self',
    },
    {
      id: 'studio',
      href: '/apps',
      name: 'studio',
      icon: <FaAppStoreIos />,
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
        <button
          className="flex aspect-square w-24 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-900"
          onClick={() => {
            const newIndex: number = Math.floor(Math.random() * icons.length);
            setState((previous) => ({ ...previous, index: newIndex }));
          }}>
          {icons.at(index)}
        </button>
        <p className="text-xl font-bold uppercase">Hieu Doan</p>
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
