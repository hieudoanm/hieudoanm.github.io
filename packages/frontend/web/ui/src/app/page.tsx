'use client';

import { Avatar } from '@atomic-ui/components/Avatar';
import { Badge } from '@atomic-ui/components/Badge';
import { Breadcrumbs } from '@atomic-ui/components/Breadcrumbs';
import { Card } from '@atomic-ui/components/data/Card';
import { List } from '@atomic-ui/components/data/List';
import { Stats } from '@atomic-ui/components/data/Stats';
import { Table } from '@atomic-ui/components/data/Table';
import { Accordian } from '@atomic-ui/components/data/Accordian';
import { Divider } from '@atomic-ui/components/Divider';
import { Button } from '@atomic-ui/components/form/Button';
import { ButtonGroup } from '@atomic-ui/components/form/ButtonGroup';
import { Checkbox } from '@atomic-ui/components/form/InputCheckbox';
import { FileUpload } from '@atomic-ui/components/form/InputFile';
import { Input } from '@atomic-ui/components/form/InputText';
import { Radio } from '@atomic-ui/components/form/InputRadio';
import { Select } from '@atomic-ui/components/form/InputSelect';
import { TextArea } from '@atomic-ui/components/form/TextArea';
import { Toggle } from '@atomic-ui/components/form/Toggle';
import { Alert } from '@atomic-ui/components/popup/Alert';
import { Tooltip } from '@atomic-ui/components/popup/Tooltip';
import { Loading } from '@atomic-ui/components/Loading';
import { Modal } from '@atomic-ui/components/popup/Modal';
import { Pagination } from '@atomic-ui/components/Pagination';
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
import { NextPage } from 'next';
import Link from 'next/link';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-okaidia.css';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { useDarkMode } from '@atomic-ui/hooks/use-dark-mode';

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
      component: <Accordian />,
      code: '',
      level: 'data',
    },
    {
      id: 'alert',
      emoji: '🚨',
      name: 'Alert',
      component: <Alert />,
      code: '',
      level: 'popup',
    },
    {
      id: 'avatar',
      emoji: '🖼️',
      name: 'Avatar',
      component: <Avatar />,
      code: '',
      level: 'starter',
    },
    {
      id: 'badge',
      emoji: '🏷️',
      name: 'Badge',
      component: <Badge type="neutral">Badge</Badge>,
      code: '',
      level: 'starter',
    },
    {
      id: 'breadcrumbs',
      emoji: '🍞',
      name: 'Breadcrumbs',
      component: <Breadcrumbs />,
      code: '',
      level: 'starter',
    },
    {
      id: 'button',
      emoji: '🔘',
      name: 'Button',
      component: (
        <div className="flex w-full max-w-md items-center justify-center">
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
        <div className="flex w-full max-w-md items-center justify-center">
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
        <div className="flex w-full max-w-md items-center justify-center">
          <Card />
        </div>
      ),
      level: 'data',
    },
    {
      id: 'checkbox',
      emoji: '☑️',
      name: 'Checkbox',
      component: (
        <div className="w-full max-w-md">
          <Checkbox />
        </div>
      ),
      code: '',
      level: 'form',
    },
    {
      id: 'divider',
      emoji: '➖',
      name: 'Divider',
      component: (
        <div className="flex w-full max-w-md items-center justify-center">
          <Divider text="Divider" />
        </div>
      ),
      code: '',
      level: 'starter',
    },
    {
      id: 'file-upload',
      emoji: '📂',
      name: 'File Upload',
      component: (
        <div className="w-full max-w-md">
          <FileUpload />
        </div>
      ),
      code: '',
      level: 'form',
    },
    {
      id: 'input',
      emoji: '⌨️',
      name: 'Input',
      code: '',
      component: (
        <div className="flex w-full max-w-md items-center justify-center">
          <Input />
        </div>
      ),
      level: 'form',
    },
    {
      id: 'list',
      emoji: '📋',
      name: 'List',
      code: '',
      component: (
        <div className="flex w-full max-w-md items-center justify-center">
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
        <div className="flex w-full max-w-md items-center justify-center">
          <Modal />
        </div>
      ),
      level: 'popup',
    },
    {
      id: 'select',
      emoji: '📑',
      name: 'Select',
      code: '',
      component: (
        <div className="w-full max-w-md">
          <Select />
        </div>
      ),
      level: 'form',
    },
    {
      id: 'textarea',
      emoji: '📝',
      name: 'Textarea',
      code: '',
      component: (
        <div className="w-full max-w-md">
          <TextArea />
        </div>
      ),
      level: 'form',
    },
    {
      id: 'pagination',
      emoji: '📄',
      name: 'Pagination',
      component: (
        <div className="flex w-full max-w-md items-center justify-center">
          <Pagination />
        </div>
      ),
      code: '',
      level: 'starter',
    },
    {
      id: 'radio',
      emoji: '🔘',
      name: 'Radio',
      component: (
        <div className="w-full max-w-md">
          <Radio />
        </div>
      ),
      code: '',
      level: 'form',
    },
    {
      id: 'loading',
      emoji: '⏳',
      name: 'Loading',
      component: (
        <div className="flex w-full max-w-md items-center justify-center">
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
        <div className="w-full max-w-md">
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
        <div className="w-full max-w-md">
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
        <div className="flex w-full max-w-md items-center justify-center">
          <Tooltip />
        </div>
      ),
      code: '',
      level: 'popup',
    },
    {
      id: 'toggle',
      emoji: '🔄',
      name: 'Toggle',
      component: (
        <div className="flex w-full max-w-md items-center justify-center">
          <Toggle value={darkMode} onClick={() => toggleDarkMode()} />
        </div>
      ),
      code: '',
      level: 'form',
    },
    {
      id: 'typography',
      emoji: '🔤',
      name: 'Typography',
      component: (
        <div className="w-full max-w-md">
          <H1>Heading 1</H1>
          <H2>Heading 2</H2>
          <H3>Heading 3</H3>
          <H4>Heading 4</H4>
          <H5>Heading 3</H5>
          <H6>Heading 4</H6>
          <Paragraph>Paragraph</Paragraph>
        </div>
      ),
      code: '',
      level: 'starter',
    },
  ];

  const levels: string[] = [
    ...new Set(components.map((component) => component.level)),
  ].sort((a, b) => a.localeCompare(b));
  const componentsByLevels = levels.map((level) => {
    return {
      level,
      components: components.filter((component) => component.level === level),
    };
  });

  return (
    <div className="flex h-screen flex-col bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <nav className="border-b border-neutral-200 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center gap-x-4">
            <H3>atomic/ui</H3>
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
                <H1>atomic/ui</H1>
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
            <H2>
              <span className="capitalize">Components</span> (
              {components.length})
            </H2>
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
              {componentsByLevels.map(({ level = '', components = [] }) => {
                return (
                  <div key={level} className="flex flex-col gap-y-8">
                    <H2>
                      <span className="capitalize">{level}</span> (
                      {components.length})
                    </H2>
                    {components.map(({ id, name, code, component = <>

                        </> }, index: number) => {
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
                    })}
                  </div>
                );
              })}
            </div>
          </section>
          <section className="border-t border-neutral-200 py-8 dark:border-neutral-800">
            <div className="container mx-auto flex flex-col gap-y-8 px-8">
              <H2>
                <span className="capitalize">Classes</span>
              </H2>
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
                        id: 'accent',
                        name: 'accent',
                        lightClass: 'bg-red-500',
                        darkClass: 'dark:bg-red-700',
                      },
                      {
                        id: 'bg',
                        name: 'bg (background)',
                        lightClass: 'bg-neutral-100',
                        darkClass: 'dark:bg-neutral-900',
                      },
                      {
                        id: 'text',
                        name: 'text',
                        lightClass: 'text-neutral-900',
                        darkClass: 'dark:text-neutral-100',
                      },
                      {
                        id: 'border',
                        name: 'border',
                        lightClass: 'border-neutral-200',
                        darkClass: 'dark:border-neutral-800',
                      },
                      {
                        id: 'shadow',
                        name: 'shadow',
                        lightClass: 'shadow',
                        darkClass: 'dark:shadow-neutral-100/10',
                      },
                    ].map(
                      (
                        {
                          id = '',
                          name = 'Border',
                          lightClass = '',
                          darkClass = '',
                        },
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
