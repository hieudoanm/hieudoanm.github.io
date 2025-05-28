'use client';

import { Button } from '@atomic-ui/components/button/Button';
import { ButtonGroup } from '@atomic-ui/components/button/ButtonGroup';
import { List } from '@atomic-ui/components/data/List';
import { Stats } from '@atomic-ui/components/data/Stats';
import { Table } from '@atomic-ui/components/data/Table';
import { Tooltip } from '@atomic-ui/components/data/Tooltip';
import { Alert } from '@atomic-ui/components/feedback/Alert';
import { Badge } from '@atomic-ui/components/feedback/Badge';
import { Loading } from '@atomic-ui/components/feedback/Loading';
import { Toast } from '@atomic-ui/components/feedback/Toast';
import { Checkbox } from '@atomic-ui/components/form/InputCheckbox';
import { Radio } from '@atomic-ui/components/form/InputRadio';
import { Select } from '@atomic-ui/components/form/InputSelect';
import { Input } from '@atomic-ui/components/form/InputText';
import { Textarea } from '@atomic-ui/components/form/InputTextarea';
import { Toggle } from '@atomic-ui/components/form/InputToggle';
import { Accordian } from '@atomic-ui/components/layout/Accordian';
import { Card } from '@atomic-ui/components/layout/Card';
import { Divider } from '@atomic-ui/components/layout/Divider';
import { Modal } from '@atomic-ui/components/layout/Modal';
import { Avatar } from '@atomic-ui/components/media/Avatar';
import { FileUpload } from '@atomic-ui/components/media/File';
import { Breadcrumbs } from '@atomic-ui/components/navigation/Breadcrumbs';
import { Menu } from '@atomic-ui/components/navigation/Menu';
import { Pagination } from '@atomic-ui/components/navigation/Pagination';
import { Steps } from '@atomic-ui/components/navigation/Steps';
import { Preview } from '@atomic-ui/components/Preview';
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
} from '@atomic-ui/components/typography/Heading';
import { Paragraph } from '@atomic-ui/components/typography/Paragraph';
import { useDarkMode } from '@atomic-ui/hooks/use-dark-mode';
import { NextPage } from 'next';
import Link from 'next/link';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-okaidia.css';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';

type Group =
  | 'button'
  | 'data'
  | 'feedback'
  | 'form'
  | 'layout'
  | 'media'
  | 'navigation'
  | 'typography';

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
    group: Group;
  }[] = [
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
      group: 'button' as Group,
    },
    {
      id: 'button-group',
      emoji: '👆',
      name: 'Button Group',
      component: (
        <div className="flex w-full items-center justify-center">
          <ButtonGroup />
        </div>
      ),
      code: '',
      group: 'button' as Group,
    },
    {
      id: 'media-avatar',
      emoji: '🖼️',
      name: 'Avatar',
      component: (
        <div className="flex w-full items-center justify-center">
          <Avatar />
        </div>
      ),
      code: '',
      group: 'media' as Group,
    },
    {
      id: 'feedback-badge',
      emoji: '🏷️',
      name: 'Badge',
      component: (
        <div className="flex w-full items-center justify-center">
          <Badge />
        </div>
      ),
      code: '',
      group: 'feedback' as Group,
    },
    {
      id: 'navigation-breadcrumbs',
      emoji: '🥑',
      name: 'Breadcrumbs',
      component: (
        <div className="flex w-full items-center justify-center">
          <Breadcrumbs />
        </div>
      ),
      code: '',
      group: 'navigation' as Group,
    },
    {
      id: 'navigation-tabs',
      emoji: '📁',
      name: 'Menu',
      component: (
        <div className="flex w-full items-center justify-center">
          <Menu />
        </div>
      ),
      code: '',
      group: 'navigation' as Group,
    },
    {
      id: 'layout-card',
      emoji: '💳',
      name: 'Card',
      code: '',
      component: (
        <div className="flex w-full items-center justify-center">
          <Card />
        </div>
      ),
      group: 'layout' as Group,
    },
    {
      id: 'layout-divider',
      emoji: '➖',
      name: 'Divider',
      component: (
        <div className="flex w-full items-center justify-center">
          <Divider text="Divider" />
        </div>
      ),
      code: '',
      group: 'layout' as Group,
    },
    {
      id: 'input-checkbox',
      emoji: '☑️',
      name: 'Checkbox',
      component: (
        <div className="flex w-full items-center justify-center">
          <Checkbox />
        </div>
      ),
      code: '',
      group: 'form' as Group,
    },
    {
      id: 'media-file',
      emoji: '📂',
      name: 'File',
      component: (
        <div className="flex w-full items-center justify-center">
          <FileUpload />
        </div>
      ),
      code: '',
      group: 'media' as Group,
    },
    {
      id: 'input-radio',
      emoji: '🔘',
      name: 'Radio',
      component: (
        <div className="flex w-full items-center justify-center">
          <Radio />
        </div>
      ),
      code: '',
      group: 'form' as Group,
    },
    {
      id: 'input-select',
      emoji: '📑',
      name: 'Select',
      code: '',
      component: (
        <div className="flex w-full items-center justify-center">
          <Select />
        </div>
      ),
      group: 'form' as Group,
    },
    {
      id: 'input-text',
      emoji: '⌨️',
      name: 'Text',
      code: '',
      component: (
        <div className="flex w-full items-center justify-center">
          <Input />
        </div>
      ),
      group: 'form' as Group,
    },
    {
      id: 'input-textarea',
      emoji: '📝',
      name: 'Textarea',
      code: '',
      component: (
        <div className="flex w-full items-center justify-center">
          <Textarea />
        </div>
      ),
      group: 'form' as Group,
    },
    {
      id: 'input-toggle',
      emoji: '🔄',
      name: 'Toggle',
      component: (
        <div className="flex w-full items-center justify-center">
          <Toggle />
        </div>
      ),
      code: '',
      group: 'form' as Group,
    },
    {
      id: 'data-list',
      emoji: '📋',
      name: 'List',
      code: '',
      component: (
        <div className="flex w-full items-center justify-center">
          <List />
        </div>
      ),
      group: 'data' as Group,
    },
    {
      id: 'layout-accordian',
      emoji: '📑',
      name: 'Accordian',
      component: (
        <div className="flex w-full items-center justify-center">
          <Accordian />
        </div>
      ),
      code: '',
      group: 'layout' as Group,
    },
    {
      id: 'layout-modal',
      emoji: '📦',
      name: 'Modal',
      code: '',
      component: (
        <div className="flex w-full items-center justify-center">
          <Modal />
        </div>
      ),
      group: 'layout' as Group,
    },
    {
      id: 'feedback-alert',
      emoji: '🚨',
      name: 'Alert',
      component: (
        <div className="flex w-full items-center justify-center">
          <Alert />
        </div>
      ),
      code: '',
      group: 'feedback' as Group,
    },
    {
      id: 'feedback-toast',
      emoji: '🍞',
      name: 'Toast',
      component: (
        <div className="flex w-full items-center justify-center">
          <Toast />
        </div>
      ),
      code: '',
      group: 'feedback' as Group,
    },
    {
      id: 'feedback-loading',
      emoji: '⏳',
      name: 'Loading',
      component: (
        <div className="flex w-full items-center justify-center">
          <Loading />
        </div>
      ),
      code: '',
      group: 'feedback' as Group,
    },
    {
      id: 'navigation-pagination',
      emoji: '📄',
      name: 'Pagination',
      component: (
        <div className="flex w-full items-center justify-center">
          <Pagination />
        </div>
      ),
      code: '',
      group: 'navigation' as Group,
    },
    {
      id: 'data-stats',
      emoji: '📊',
      name: 'Stats',
      component: (
        <div className="flex w-full items-center justify-center">
          <Stats />
        </div>
      ),
      code: '',
      group: 'data' as Group,
    },
    {
      id: 'navigation-steps',
      emoji: '🪜',
      name: 'Steps',
      component: (
        <div className="flex w-full items-center justify-center">
          <Steps />
        </div>
      ),
      code: '',
      group: 'navigation' as Group,
    },
    {
      id: 'data-table',
      emoji: '📈',
      name: 'Table',
      component: (
        <div className="mx-auto flex w-full max-w-md items-center justify-center">
          <Table />
        </div>
      ),
      code: '',
      group: 'data' as Group,
    },
    {
      id: 'data-tooltip',
      emoji: '💬',
      name: 'Tooltip',
      component: (
        <div className="flex w-full items-center justify-center">
          <Tooltip />
        </div>
      ),
      code: '',
      group: 'data' as Group,
    },
    {
      id: 'typography-heading',
      emoji: '🔤',
      name: 'Heading',
      component: (
        <div className="flex w-full flex-col items-start justify-center">
          <H1 />
          <H2 />
          <H3 />
          <H4 />
          <H5 />
          <H6 />
        </div>
      ),
      code: '',
      group: 'typography' as Group,
    },
    {
      id: 'typography-paragraph',
      emoji: '🔤',
      name: 'Paragraph',
      component: (
        <div className="flex w-full flex-col items-center justify-center">
          <Paragraph />
        </div>
      ),
      code: '',
      group: 'typography' as Group,
    },
  ].sort((a, b) => {
    if (a.group === b.group) {
      return a.id > b.id ? 1 : -1;
    }
    return a.group > b.group ? 1 : -1;
  });

  const filteredComponent = components.filter(({ id, name }) => {
    return (
      id.toLowerCase().includes(query.toLowerCase()) ||
      name.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen flex-col bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <nav className="border-b border-neutral-200 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
        <div className="container mx-auto flex flex-col gap-y-2 px-8 py-4">
          <div className="flex items-center justify-between gap-x-4">
            <h3 className="text-2xl font-bold">atomic/ui</h3>
            <div className="flex items-center gap-x-4">
              <div className="hidden grow md:block">
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
              <label
                className="relative block h-8 w-14 rounded-full bg-neutral-200 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-red-500 dark:bg-neutral-800 dark:has-checked:bg-red-700"
                aria-label="Toggle dark mode">
                <input
                  type="checkbox"
                  checked={darkMode}
                  className="peer sr-only"
                  onChange={() => {
                    toggleDarkMode();
                  }}
                />
                <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6 dark:bg-neutral-900"></span>
              </label>
            </div>
          </div>
          <div className="block md:hidden">
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
        </div>
      </nav>
      <div className="grow overflow-auto">
        <main className="divide-y divide-neutral-200 dark:divide-neutral-800">
          <section className="py-8 md:py-16">
            <div className="container mx-auto flex flex-col items-center justify-center gap-y-4 px-8">
              <div className="flex w-full max-w-md flex-col gap-y-4 text-center md:gap-y-8">
                <header className="flex flex-col gap-y-2">
                  <h1 className="text-6xl font-black whitespace-nowrap md:text-7xl">
                    atomic/ui
                  </h1>
                  <h5 className="text-base font-medium text-neutral-700 md:text-lg dark:text-neutral-300">
                    Free and Open Source TailwindCSS v4 Components
                  </h5>
                </header>
                <p className="text-neutral-900 dark:text-neutral-100">
                  <code>atomic/ui</code> is a free collection of Tailwind CSS
                  components designed with atomic design principles in mind. It
                  offers a flexible set of building blocks to help you quickly
                  build modern, responsive UIs for your next project.
                </p>
                <div className="flex justify-center gap-x-6 text-sm font-black text-neutral-900 dark:text-neutral-100">
                  <p className="whitespace-nowrap">✅ No Install</p>
                  <p className="whitespace-nowrap">✅ No Config</p>
                  <p className="whitespace-nowrap">✅ No Setup</p>
                </div>
              </div>
            </div>
          </section>
          <section className="py-4 md:py-8">
            <div className="container mx-auto px-8">
              <div className="flex flex-col gap-y-4 md:gap-y-8">
                <h2 className="text-2xl font-bold">
                  <span className="capitalize">Components</span> (
                  {filteredComponent.length})
                </h2>
                {filteredComponent.length > 0 && (
                  <>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                      {filteredComponent.map(
                        ({ id = '', emoji = '', name = '', group = '' }) => {
                          return (
                            <Link href={`#${id}`} key={id}>
                              <div className="col-span-1">
                                <div className="flex items-center gap-x-2 rounded-lg border border-neutral-200 p-4 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
                                  <p className="text-2xl">{emoji}</p>
                                  <p className="font-semibold capitalize">
                                    {group} - {name}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          );
                        }
                      )}
                    </div>
                    <div className="flex flex-col gap-y-8">
                      {filteredComponent.map(
                        ({
                          id = '',
                          emoji = '',
                          name = '',
                          code = '',
                          component,
                        }) => {
                          return (
                            <div key={id} className="flex flex-col gap-y-4">
                              <Preview
                                id={id}
                                name={`${emoji} ${name}`}
                                code={code}
                                component={component}
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
          <section className="py-4 md:py-8">
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
