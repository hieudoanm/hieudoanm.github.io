import { Navbar } from '@web/components/Navbar';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type TagBrowser = 'extension' | 'web';
type TagMobile = 'android' | 'ios';
type TagNative = 'cli' | 'linux' | 'macos' | 'windows';
type Tag = TagBrowser | TagMobile | TagNative;

type MiniApp = {
  id: string;
  href: string;
  github: string;
  image: string;
  name: string;
  category: 'saas' | 'template';
  tags: Tag[];
};

const StorePage: NextPage = () => {
  const [{ query = '' }, setState] = useState<{ query: string }>({ query: '' });

  const miniApps: MiniApp[] = [
    {
      id: 'mark',
      href: 'https://markzuck.vercel.app/',
      github: 'https://github.com/hieudoanm/mark',
      image:
        'https://raw.githubusercontent.com/hieudoanm/mark/refs/heads/master/images/cover.png',
      name: 'Mark',
      category: 'saas',
      tags: ['cli', 'extension', 'ios', 'macos', 'web'],
    },
    {
      id: 'reverse-proxy',
      href: 'https://hieudoanm-reverse-proxy.vercel.app/',
      github: 'https://github.com/hieudoanm/reverse-proxy',
      image:
        'https://raw.githubusercontent.com/hieudoanm/reverse-proxy/refs/heads/master/images/cover.png',
      name: 'Reverse Proxy',
      category: 'saas',
      tags: ['web'],
    },
    {
      id: 'atomic',
      href: 'https://hieudoanm.github.io/atomic',
      github: 'https://github.com/hieudoanm/atomic',
      image:
        'https://raw.githubusercontent.com/hieudoanm/atomic/refs/heads/master/images/cover.png',
      name: 'Atomic',
      category: 'template',
      tags: ['web'],
    },
    {
      id: 'micro-saas',
      href: 'https://hieudoanm.github.io/micro-saas',
      github: 'https://github.com/hieudoanm/micro-saas',
      image:
        'https://raw.githubusercontent.com/hieudoanm/micro-saas/refs/heads/master/images/cover.png',
      name: 'Micro SaaS',
      category: 'template',
      tags: ['web'],
    },
    {
      id: 'telegram-mini-app',
      href: 'https://hieudoanm.github.io/telegram-mini-app',
      github: 'https://github.com/hieudoanm/telegram-mini-app',
      image:
        'https://raw.githubusercontent.com/hieudoanm/telegram-mini-app/refs/heads/master/images/cover.png',
      name: 'Telegram Mini App',
      category: 'template',
      tags: ['web'],
    },
  ];

  const filteredMiniApps: MiniApp[] = miniApps.filter(
    ({ name = '', tags = [] }) => {
      return (
        name.toLowerCase().includes(query.toLowerCase()) ||
        tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col gap-y-4 md:gap-y-8">
          <input
            id="filter"
            name="filter"
            placeholder="Filter"
            className="w-full rounded-full border border-neutral-800 px-4 py-2 focus:outline-none"
            value={query}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setState((previous) => ({
                ...previous,
                query: event.target.value,
              }));
            }}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            {filteredMiniApps.map(
              ({
                id = '',
                href = '',
                image = '',
                name = '',
                github = '',
                category = '',
                tags = [],
              }) => {
                return (
                  <div
                    key={id}
                    className="overflow-hidden rounded-2xl border border-neutral-800 shadow-none shadow-neutral-100/10 transition-all hover:shadow-2xl">
                    <div
                      className="aspect-video bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                    <div className="flex flex-col gap-y-2 border-t border-neutral-800 py-4">
                      <div className="flex items-center justify-between gap-x-2 px-4">
                        <Link href={href} target="_blank">
                          <h5 className="truncate text-base font-medium whitespace-nowrap md:text-lg">
                            {name}
                          </h5>
                        </Link>
                        <Link
                          href={github}
                          className="text-sm underline underline-offset-4"
                          target="_blank">
                          <p>GitHub</p>
                        </Link>
                      </div>
                      <div className="flex items-center gap-x-2 px-4">
                        <span className="block rounded-sm bg-neutral-100 px-1 py-0.5 text-xs font-black text-neutral-900">
                          {category}
                        </span>
                        {tags.map((tag: Tag) => {
                          return (
                            <span
                              key={tag}
                              className="block rounded-sm bg-neutral-100 px-1 py-0.5 text-xs font-black text-neutral-900">
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
