import { A } from '@solidjs/router';
import {
  FaBrandsAppStoreIos,
  FaBrandsLinkedin,
  FaBrandsSquareGithub,
  FaBrandsSquareTwitter,
  FaSolidFileWord,
  FaSolidWindowRestore,
} from 'solid-icons/fa';
import { JSX } from 'solid-js';

const HomePage = (): JSX.Element => {
  const apps = [
    {
      id: 'apps',
      href: '/apps',
      name: 'Apps',
      icon: <FaBrandsAppStoreIos />,
      target: '_self',
    },
    {
      id: 'notes',
      href: '/posts',
      name: 'Notes',
      icon: <FaSolidFileWord />,
      target: '_self',
    },
    {
      id: 'widgets',
      href: '/widgets',
      name: 'Widgets',
      icon: <FaSolidWindowRestore />,
      target: '_self',
    },
    {
      id: 'github',
      href: 'https://github.com/hieudoanm',
      name: 'GitHub',
      icon: <FaBrandsSquareGithub />,
      target: '_blank',
    },
    {
      id: 'twitter',
      href: 'https://x.com/hieudoanm',
      name: 'Twitter',
      icon: <FaBrandsSquareTwitter />,
      target: '_blank',
    },
    {
      id: 'linkedin',
      href: 'https://www.linkedin.com/in/hieudoanm',
      name: 'LinkedIn',
      icon: <FaBrandsLinkedin />,
      target: '_blank',
    },
  ];

  const targets: string[] = [...new Set(apps.map(({ target }) => target))];
  const appsByTarget = targets.map((target: string) => {
    return { target, apps: apps.filter((app) => app.target === target) };
  });

  return (
    <div class="h-screen w-screen bg-gray-100 p-8">
      <div class="flex h-full flex-col items-center justify-center gap-y-8 text-black">
        <p class="text-xl font-black tracking-wide uppercase">Nothing</p>
        <div class="flex flex-col items-center justify-center gap-y-8">
          {appsByTarget.map(({ target, apps = [] }) => {
            return (
              <div
                title={target}
                class="flex flex-col items-center justify-center gap-y-2">
                {apps.map(({ id, href, name, icon, target = '_self' }) => {
                  return (
                    <div
                      title={id}
                      class="flex items-center gap-x-1 border-b border-dotted">
                      {icon}
                      <A
                        href={href}
                        target={target}
                        class="tracking-wide lowercase">
                        {name}
                      </A>
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
