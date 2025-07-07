import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaAppStoreIos,
  FaAtom,
  FaLinkedin,
  FaPenToSquare,
  FaSquareGithub,
  FaSquareInstagram,
  FaSquareTwitter,
  FaWindowRestore,
} from 'react-icons/fa6';

const HomePage: NextPage = () => {
  const [{ index = 0 }, setState] = useState<{ index: number }>({ index: 0 });

  const icons = [
    <FaAtom key="atom" className="text-5xl" />,
    <FaWindowRestore key="code" className="text-5xl" />,
    <FaAppStoreIos key="robot" className="text-5xl" />,
    <FaPenToSquare key="notes" className="text-5xl" />,
  ];

  const apps = [
    {
      id: 'notes',
      href: '/posts',
      name: 'Notes',
      icon: <FaPenToSquare className="text-2xl" />,
      target: '_self',
    },
    {
      id: 'store',
      href: '/store',
      name: 'Store',
      icon: <FaAppStoreIos className="text-2xl" />,
      target: '_self',
    },
    {
      id: 'atomic',
      href: '/atomic',
      name: 'Atomic',
      icon: <FaAtom className="text-2xl" />,
      target: '_self',
    },
    {
      id: 'widgets',
      href: '/widgets',
      name: 'Widgets',
      icon: <FaWindowRestore className="text-2xl" />,
      target: '_self',
    },
    {
      id: 'github',
      href: 'https://github.com/hieudoanm',
      name: 'GitHub',
      icon: <FaSquareGithub className="text-2xl" />,
      target: '_blank',
    },
    {
      id: 'twitter',
      href: 'https://x.com/hieudoanm',
      name: 'Twitter',
      icon: <FaSquareTwitter className="text-2xl" />,
      target: '_blank',
    },
    {
      id: 'linkedin',
      href: 'https://www.linkedin.com/in/hieudoanm',
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-2xl" />,
      target: '_blank',
    },
    {
      id: 'instagram',
      href: 'https://www.instagram.com/hieudoanm.github.io',
      name: 'Instagram',
      icon: <FaSquareInstagram className="text-2xl" />,
      target: '_blank',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-neutral-950 p-6 text-neutral-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-y-12">
        <button
          className="flex aspect-square w-24 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 shadow-lg transition-transform duration-300 hover:rotate-12"
          onClick={() => {
            const newIndex: number = Math.floor(Math.random() * icons.length);
            setState((prev) => ({ ...prev, index: newIndex }));
          }}>
          {icons.at(index)}
        </button>

        <h1 className="text-3xl font-bold tracking-wide uppercase">
          <Link href="/hieudoanm">Hieu Doan</Link>
        </h1>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {apps.map(({ id, name, href, icon, target }) => (
            <Link
              key={id}
              href={href}
              target={target}
              className="group block rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-center transition hover:border-neutral-700 hover:shadow-xl">
              <div className="mb-4 flex justify-center text-neutral-300 group-hover:text-white">
                {icon}
              </div>
              <div className="text-lg font-semibold capitalize group-hover:text-white">
                {name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const dynamic = 'force-static';

export default HomePage;
