'use client';

import { Avatar } from '@atomic-ui/components/Avatar';
import { Badge } from '@atomic-ui/components/Badge';
import { Breadcrumbs } from '@atomic-ui/components/Breadcrumbs';
import { Accordian } from '@atomic-ui/components/data/Accordian';
import { Card } from '@atomic-ui/components/data/Card';
import { List } from '@atomic-ui/components/data/List';
import { Stats } from '@atomic-ui/components/data/Stats';
import { Table } from '@atomic-ui/components/data/Table';
import { Divider } from '@atomic-ui/components/Divider';
import { Button } from '@atomic-ui/components/form/Button';
import { ButtonGroup } from '@atomic-ui/components/form/ButtonGroup';
import { Checkbox } from '@atomic-ui/components/form/InputCheckbox';
import { FileUpload } from '@atomic-ui/components/form/InputFile';
import { Radio } from '@atomic-ui/components/form/InputRadio';
import { Select } from '@atomic-ui/components/form/InputSelect';
import { Input } from '@atomic-ui/components/form/InputText';
import { Textarea } from '@atomic-ui/components/form/InputTextarea';
import { Toggle } from '@atomic-ui/components/form/InputToggle';
import { Loading } from '@atomic-ui/components/Loading';
import { Pagination } from '@atomic-ui/components/Pagination';
import { Alert } from '@atomic-ui/components/popup/Alert';
import { Modal } from '@atomic-ui/components/popup/Modal';
import { Tooltip } from '@atomic-ui/components/popup/Tooltip';
import { Preview } from '@atomic-ui/components/Preview';
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
} from '@atomic-ui/components/Typography';
import { useDarkMode } from '@atomic-ui/hooks/use-dark-mode';
import { NextPage } from 'next';
import Link from 'next/link';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-okaidia.css';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';

const HomePage: NextPage = () => {
  const { darkMode = false, toggleDarkMode } = useDarkMode();
  const [{ query = '' }, setState] = useState<{
    query: string;
    dark: boolean;
  }>({
    query: '',
    dark: false,
  });

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const components: {
    id: string;
    emoji: string;
    name: string;
    code: string;
    component: ReactNode;
    level: 'data' | 'form' | 'popup' | 'starter';
  }[] = [
    {
      id: 'accordian',
      emoji: '📑',
      name: 'Accordian',
      component: (
        <div className="flex w-full items-center justify-center">
          <Accordian />
        </div>
      ),
      code: '',
      level: 'data',
    },
    {
      id: 'alert',
      emoji: '🚨',
      name: 'Alert',
      component: (
        <div className="flex w-full items-center justify-center">
          <Alert />
        </div>
      ),
      code: '',
      level: 'popup',
    },
    {
      id: 'avatar',
      emoji: '🖼️',
      name: 'Avatar',
      component: (
        <div className="flex w-full items-center justify-center">
          <Avatar />
        </div>
      ),
      code: '',
      level: 'starter',
    },
    {
      id: 'badge',
      emoji: '🏷️',
      name: 'Badge',
      component: (
        <div className="flex w-full items-center justify-center">
          <Badge />
        </div>
      ),
      code: '',
      level: 'starter',
    },
    {
      id: 'breadcrumbs',
      emoji: '🍞',
      name: 'Breadcrumbs',
      component: (
        <div className="flex w-full items-center justify-center">
          <Breadcrumbs />
        </div>
      ),
      code: '',
      level: 'starter',
    },
    {
      id: 'button',
      emoji: '🔘',
      name: 'Button',
      component: (
        <div className="flex w-full items-center justify-center">
          <Button />
        </div>
      ),
      code: '',
      level: 'form',
    },
    {
      id: 'button-group',
      emoji: '🔘🔘',
      name: 'Button Group',
      component: (
        <div className="flex w-full items-center justify-center">
          <ButtonGroup />
        </div>
      ),
      code: '',
      level: 'form',
    },
    {
      id: 'card',
      emoji: '💳',
      name: 'Card',
      code: '',
      component: (
        <div className="flex w-full items-center justify-center">
          <Card />
        </div>
      ),
      level: 'data',
    },
    {
      id: 'divider',
      emoji: '➖',
      name: 'Divider',
      component: (
        <div className="flex w-full items-center justify-center">
          <Divider text="Divider" />
        </div>
      ),
      code: '',
      level: 'starter',
    },
    {
      id: 'input-checkbox',
      emoji: '☑️',
      name: 'Input - Checkbox',
      component: (
        <div className="flex w-full items-center justify-center">
          <Checkbox />
        </div>
      ),
      code: '',
      level: 'form',
    },
    {
      id: 'input-file',
      emoji: '📂',
      name: 'Input - File',
      component: (
        <div className="flex w-full items-center justify-center">
          <FileUpload />
        </div>
      ),
      code: '',
      level: 'form',
    },
    {
      id: 'input-radio',
      emoji: '🔘',
      name: 'Input - Radio',
      component: (
        <div className="flex w-full items-center justify-center">
          <Radio />
        </div>
      ),
      code: '',
      level: 'form',
    },
    {
      id: 'input-select',
      emoji: '📑',
      name: 'Input - Select',
      code: '',
      component: (
        <div className="flex w-full items-center justify-center">
          <Select />
        </div>
      ),
      level: 'form',
    },
    {
      id: 'input-text',
      emoji: '⌨️',
      name: 'Input - Text',
      code: '',
      component: (
        <div className="flex w-full items-center justify-center">
          <Input />
        </div>
      ),
      level: 'form',
    },
    {
      id: 'input-textarea',
      emoji: '📝',
      name: 'Input - Textarea',
      code: '',
      component: (
        <div className="flex w-full items-center justify-center">
          <Textarea />
        </div>
      ),
      level: 'form',
    },
    {
      id: 'input-toggle',
      emoji: '🔄',
      name: 'Input - Toggle',
      component: (
        <div className="flex w-full items-center justify-center">
          <Toggle value={darkMode} onClick={() => toggleDarkMode()} />
        </div>
      ),
      code: '',
      level: 'form',
    },
    {
      id: 'list',
      emoji: '📋',
      name: 'List',
      code: '',
      component: (
        <div className="flex w-full items-center justify-center">
          <List />
        </div>
      ),
      level: 'data',
    },
    {
      id: 'modal',
      emoji: '📦',
      name: 'Modal',
      code: '',
      component: (
        <div className="flex w-full items-center justify-center">
          <Modal />
        </div>
      ),
      level: 'popup',
    },
    {
      id: 'pagination',
      emoji: '📄',
      name: 'Pagination',
      component: (
        <div className="flex w-full items-center justify-center">
          <Pagination />
        </div>
      ),
      code: '',
      level: 'starter',
    },
    {
      id: 'loading',
      emoji: '⏳',
      name: 'Loading',
      component: (
        <div className="flex w-full items-center justify-center">
          <Loading />
        </div>
      ),
      code: '',
      level: 'starter',
    },
    {
      id: 'stats',
      emoji: '📊',
      name: 'Stats',
      component: (
        <div className="flex w-full items-center justify-center">
          <Stats />
        </div>
      ),
      code: '',
      level: 'data',
    },
    {
      id: 'table',
      emoji: '📈',
      name: 'Table',
      component: (
        <div className="flex w-full items-center justify-center">
          <Table />
        </div>
      ),
      code: '',
      level: 'data',
    },
    {
      id: 'tooltip',
      emoji: '💬',
      name: 'Tooltip',
      component: (
        <div className="flex w-full items-center justify-center">
          <Tooltip />
        </div>
      ),
      code: '',
      level: 'popup',
    },
    {
      id: 'typography',
      emoji: '🔤',
      name: 'Typography',
      component: (
        <div className="flex w-full flex-col items-center justify-center">
          <H1 />
          <H2 />
          <H3 />
          <H4 />
          <H5 />
          <H6 />
          <Paragraph />
        </div>
      ),
      code: '',
      level: 'starter',
    },
  ];

  return (
    <div className="flex h-screen flex-col bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <nav className="border-b border-neutral-200 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center gap-x-4">
            <h3 className="text-2xl font-bold">atomic/ui</h3>
            <div className="grow">
              <input
                type="text"
                placeholder="Search Components"
                value={query}
                className="w-full rounded-lg border border-neutral-200 px-4 py-2 shadow focus:outline-none dark:border-neutral-800 dark:shadow-neutral-100/10"
                onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                  setState((previous) => ({
                    ...previous,
                    query: event.target.value,
                  }));
                }}
              />
            </div>
            <Link
              href="https://github.com/hieudoanm/atomic-ui"
              target="_blank"
              className="font-semibold">
              GitHub
            </Link>
            <Toggle
              value={darkMode}
              onClick={() => {
                toggleDarkMode();
              }}
            />
          </div>
        </div>
      </nav>
      <div className="grow overflow-auto">
        <main className="flex flex-col gap-y-8">
          <section className="border-b border-neutral-200 py-8 dark:border-neutral-800">
            <div className="container mx-auto flex flex-col items-center justify-center gap-y-4 px-8">
              <div className="flex flex-col gap-y-4 text-center">
                <h1 className="text-4xl font-black">atomic/ui</h1>
                <p className="text-neutral-800 dark:text-neutral-200">
                  Free and Open Source TailwindCSS v4 Components
                </p>
                <div className="flex justify-center gap-x-2">
                  <p>
                    <strong>✅ TailwindCSS</strong>
                  </p>
                  <p>
                    <strong>✅ No JS</strong>
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="container mx-auto flex flex-col gap-y-8 p-8">
            <h2 className="text-2xl font-bold">
              <span className="capitalize">Components</span> (
              {components.length})
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {components.map(({ id = '', emoji = '', name = '' }) => {
                return (
                  <Link href={`#${id}`} key={id}>
                    <div className="col-span-1">
                      <div className="flex items-center gap-x-2 rounded-lg border border-neutral-200 p-4 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
                        <p className="text-2xl">{emoji}</p>
                        <p className="font-semibold">{name}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-col gap-y-8">
              {components.map(
                ({ id, name, code, component }, index: number) => {
                  return (
                    <div key={id} className="flex flex-col gap-y-4">
                      <Preview
                        id={id}
                        name={`${index + 1}. ${name}`}
                        code={code}
                        component={component}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </section>
          <section className="border-t border-neutral-200 py-8 dark:border-neutral-800">
            <div className="container mx-auto flex flex-col gap-y-8 px-8">
              <h2 className="text-2xl font-bold">
                <span className="capitalize">Classes</span>
              </h2>
              <div className="overflow-x-auto rounded-lg border border-neutral-200 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
                <table className="min-w-full divide-y-2 divide-neutral-200 dark:divide-neutral-800">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 whitespace-nowrap">#</th>
                      <th className="px-3 py-2 whitespace-nowrap">Class</th>
                      <th className="px-3 py-2 whitespace-nowrap">Light</th>
                      <th className="px-3 py-2 whitespace-nowrap">Dark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {[
                      {
                        id: 'bg-primary',
                        name: 'bg-primary',
                        lightClass: 'bg-white',
                        darkClass: 'dark:bg-neutral-900',
                      },
                      {
                        id: 'bg-secondary',
                        name: 'bg-secondary',
                        lightClass: 'bg-red-500',
                        darkClass: 'dark:bg-red-700',
                      },

                      {
                        id: 'text-primary',
                        name: 'text-primary',
                        lightClass: 'text-neutral-900',
                        darkClass: 'dark:text-neutral-100',
                      },
                      {
                        id: 'text-secondary',
                        name: 'text-secondary',
                        lightClass: 'text-neutral-700',
                        darkClass: 'dark:text-neutral-300',
                      },
                      {
                        id: 'border',
                        name: 'border',
                        lightClass: 'border-neutral-200',
                        darkClass: 'dark:border-neutral-800',
                      },
                      {
                        id: 'divide',
                        name: 'divide',
                        lightClass: 'divide-neutral-200',
                        darkClass: 'dark:divide-neutral-800',
                      },
                      {
                        id: 'shadow',
                        name: 'shadow',
                        lightClass: 'shadow',
                        darkClass: 'dark:shadow-neutral-100/10',
                      },
                    ].map(
                      (
                        { id = '', name = '', lightClass = '', darkClass = '' },
                        index: number
                      ) => {
                        return (
                          <tr key={id}>
                            <td
                              align="center"
                              className="px-3 py-2 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td
                              align="center"
                              className="px-3 py-2 whitespace-nowrap">
                              {name}
                            </td>
                            <td
                              align="center"
                              className="px-3 py-2 whitespace-nowrap">
                              <code>{lightClass}</code>
                            </td>
                            <td
                              align="center"
                              className="px-3 py-2 whitespace-nowrap">
                              <code>{darkClass}</code>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t border-neutral-200 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
          <div className="container mx-auto px-8 py-4">
            &copy; {new Date().getFullYear()} <strong>atomic/ui</strong>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
