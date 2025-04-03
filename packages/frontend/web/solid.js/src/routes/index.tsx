import { A } from '@solidjs/router';
import { JSX } from 'solid-js';

const HomePage = (): JSX.Element => {
  return (
    <div class="h-screen w-screen bg-gray-100 p-8">
      <div class="flex h-full flex-col items-center justify-center gap-y-8 text-black">
        <p class="text-xl font-black tracking-wide uppercase">Hieu</p>
        <div class="flex flex-col items-center justify-center gap-y-2">
          {[
            {
              id: 'apps',
              href: '/apps',
              name: 'Apps',
              icon: <></>,
              target: '_self',
            },
            {
              id: 'notes',
              href: '/posts',
              name: 'Notes',
              icon: <></>,
              target: '_self',
            },
            {
              id: 'chess',
              href: 'https://www.chess.com/member/redeyesdarknessmetaldrago',
              name: 'Chess',
              icon: <></>,
              target: '_blank',
            },
            {
              id: 'github',
              href: 'https://github.com/hieudoanm',
              name: 'GitHub',
              icon: <></>,
              target: '_blank',
            },
            {
              id: 'twitter',
              href: 'https://x.com/hieudoanm',
              name: 'Twitter',
              icon: <></>,
              target: '_blank',
            },
            {
              id: 'linkedin',
              href: 'https://www.linkedin.com/in/hieudoanm',
              name: 'LinkedIn',
              icon: <></>,
              target: '_blank',
            },
          ].map(({ href, name, icon, target = '_self' }) => {
            return (
              <div class="flex items-center gap-x-1 border-b border-dotted">
                {icon}
                <A href={href} target={target} class="tracking-wide lowercase">
                  {name}
                </A>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const prerender = true;

export default HomePage;
