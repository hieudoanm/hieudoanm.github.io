import { Navbar } from '@web/components/Navbar';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type TagBrowser = 'extension' | 'web';
type TagMobile = 'android' | 'ios';
type TagNative = 'cli' | 'linux' | 'macos' | 'windows';
type Tag = TagBrowser | TagMobile | TagNative;

enum Category {
  SAAS = 'saas',
  TEMPLATE = 'template',
}

type MiniApp = {
  id: string;
  href: string;
  github: string;
  image: string;
  name: string;
  category: Category;
  tags: Tag[];
};

const StorePage: NextPage = () => {
  const [{ query = '' }, setState] = useState<{ query: string }>({ query: '' });

  const miniApps: MiniApp[] = [
    {
      id: 'blackjack',
      href: 'https://hieudoanm.github.io/blackjack',
      github: 'https://github.com/hieudoanm/blackjack',
      image:
        'https://raw.githubusercontent.com/hieudoanm/blackjack/refs/heads/master/images/cover.png',
      name: 'blackjack',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'chat',
      href: 'https://hieudoanm.github.io/chat',
      github: 'https://github.com/hieudoanm/chat',
      image:
        'https://raw.githubusercontent.com/hieudoanm/chat/refs/heads/master/images/cover.png',
      name: 'chat',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'chess',
      href: 'https://hieudoanm.github.io/chess',
      github: 'https://github.com/hieudoanm/chess',
      image:
        'https://raw.githubusercontent.com/hieudoanm/chess/refs/heads/master/images/cover.png',
      name: 'chess',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'colors',
      href: 'https://hieudoanm.github.io/colors',
      github: 'https://github.com/hieudoanm/colors',
      image:
        'https://raw.githubusercontent.com/hieudoanm/colors/refs/heads/master/images/cover.png',
      name: 'colors',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'converter',
      href: 'https://hieudoanm.github.io/converter',
      github: 'https://github.com/hieudoanm/converter',
      image:
        'https://raw.githubusercontent.com/hieudoanm/converter/refs/heads/master/images/cover.png',
      name: 'converter',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'doi',
      href: 'https://hieudoanm.github.io/doi',
      github: 'https://github.com/hieudoanm/doi',
      image:
        'https://raw.githubusercontent.com/hieudoanm/doi/refs/heads/master/images/cover.png',
      name: 'doi',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'gh',
      href: 'https://hieudoanm.github.io/gh',
      github: 'https://github.com/hieudoanm/gh',
      image:
        'https://raw.githubusercontent.com/hieudoanm/gh/refs/heads/master/images/cover.png',
      name: 'gh',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'ig',
      href: 'https://hieudoanm.github.io/ig',
      github: 'https://github.com/hieudoanm/ig',
      image:
        'https://raw.githubusercontent.com/hieudoanm/ig/refs/heads/master/images/cover.png',
      name: 'ig',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'invoice',
      href: 'https://hieudoanm.github.io/invoice',
      github: 'https://github.com/hieudoanm/invoice',
      image:
        'https://raw.githubusercontent.com/hieudoanm/invoice/refs/heads/master/images/cover.png',
      name: 'invoice',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'macosx',
      href: 'https://hieudoanm.github.io/macosx',
      github: 'https://github.com/hieudoanm/macosx',
      image:
        'https://raw.githubusercontent.com/hieudoanm/macosx/refs/heads/master/images/cover.png',
      name: 'macosx',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'maps',
      href: 'https://hieudoanm.github.io/maps',
      github: 'https://github.com/hieudoanm/maps',
      image:
        'https://raw.githubusercontent.com/hieudoanm/maps/refs/heads/master/images/cover.png',
      name: 'maps',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'md',
      href: 'https://hieudoanm.github.io/md',
      github: 'https://github.com/hieudoanm/md',
      image:
        'https://raw.githubusercontent.com/hieudoanm/md/refs/heads/master/images/cover.png',
      name: 'md',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'pomodoro',
      href: 'https://hieudoanm.github.io/pomodoro',
      github: 'https://github.com/hieudoanm/pomodoro',
      image:
        'https://raw.githubusercontent.com/hieudoanm/pomodoro/refs/heads/master/images/cover.png',
      name: 'pomodoro',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'proxy',
      href: 'https://hieudoanm.github.io/proxy',
      github: 'https://github.com/hieudoanm/proxy',
      image:
        'https://raw.githubusercontent.com/hieudoanm/proxy/refs/heads/master/images/cover.png',
      name: 'proxy',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'qrcode',
      href: 'https://hieudoanm.github.io/qrcode',
      github: 'https://github.com/hieudoanm/qrcode',
      image:
        'https://raw.githubusercontent.com/hieudoanm/qrcode/refs/heads/master/images/cover.png',
      name: 'qrcode',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'redact',
      href: 'https://hieudoanm.github.io/redact',
      github: 'https://github.com/hieudoanm/redact',
      image:
        'https://raw.githubusercontent.com/hieudoanm/redact/refs/heads/master/images/cover.png',
      name: 'redact',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'status',
      href: 'https://hieudoanm.github.io/status',
      github: 'https://github.com/hieudoanm/status',
      image:
        'https://raw.githubusercontent.com/hieudoanm/status/refs/heads/master/images/cover.png',
      name: 'status',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 't3',
      href: 'https://hieudoanm.github.io/t3',
      github: 'https://github.com/hieudoanm/t3',
      image:
        'https://raw.githubusercontent.com/hieudoanm/t3/refs/heads/master/images/cover.png',
      name: 't3',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'tg',
      href: 'https://hieudoanm.github.io/tg',
      github: 'https://github.com/hieudoanm/tg',
      image:
        'https://raw.githubusercontent.com/hieudoanm/tg/refs/heads/master/images/cover.png',
      name: 'tg',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'today.do',
      href: 'https://hieudoanm.github.io/today.do',
      github: 'https://github.com/hieudoanm/today.do',
      image:
        'https://raw.githubusercontent.com/hieudoanm/today.do/refs/heads/master/images/cover.png',
      name: 'today.do',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'uuid',
      href: 'https://hieudoanm.github.io/uuid',
      github: 'https://github.com/hieudoanm/uuid',
      image:
        'https://raw.githubusercontent.com/hieudoanm/uuid/refs/heads/master/images/cover.png',
      name: 'uuid',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'words',
      href: 'https://hieudoanm.github.io/words',
      github: 'https://github.com/hieudoanm/words',
      image:
        'https://raw.githubusercontent.com/hieudoanm/words/refs/heads/master/images/cover.png',
      name: 'words',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'ytb',
      href: 'https://hieudoanm.github.io/ytb',
      github: 'https://github.com/hieudoanm/ytb',
      image:
        'https://raw.githubusercontent.com/hieudoanm/ytb/refs/heads/master/images/cover.png',
      name: 'ytb',
      category: Category.SAAS,
      tags: ['cli', 'extension', 'android', 'macos', 'web'],
    },
    {
      id: 'atomic',
      href: 'https://hieudoanm.github.io/atomic',
      github: 'https://github.com/hieudoanm/atomic',
      image:
        'https://raw.githubusercontent.com/hieudoanm/atomic/refs/heads/master/images/cover.png',
      name: 'Atomic',
      category: Category.TEMPLATE,
      tags: ['web'],
    },
    {
      id: 'micro-saas',
      href: 'https://hieudoanm.github.io/micro-saas',
      github: 'https://github.com/hieudoanm/micro-saas',
      image:
        'https://raw.githubusercontent.com/hieudoanm/micro-saas/refs/heads/master/images/cover.png',
      name: 'Micro SaaS',
      category: Category.TEMPLATE,
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
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
