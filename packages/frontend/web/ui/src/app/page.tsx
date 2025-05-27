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
          <Button>Button</Button>
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
          <Checkbox label="Option 1" name={'checkbox'} />
          <Checkbox label="Option 2" name={'checkbox'} />
          <Checkbox label="Option 3" name={'checkbox'} />
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
          <FileUpload id="file" name="file" />
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
          <Input
            type="text"
            placeholder="Input Field"
            value=""
            disabled={false}
            readOnly={false}
            onChange={function (event: ChangeEvent<HTMLInputElement>): void {
              console.log(event.target.value);
            }}
          />
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
          <Select
            placeholder={'Select Field'}
            value={''}
            disabled={false}
            onChange={function (event: ChangeEvent<HTMLSelectElement>): void {
              console.log(event.target.value);
            }}></Select>
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
          <TextArea
            rows={0}
            placeholder={'Textarea Field'}
            value={'Textarea Field'}
            disabled={false}
            readOnly={false}
            onChange={function (event: ChangeEvent<HTMLTextAreaElement>): void {
              console.log(event.target.value);
            }}
          />
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
          <Radio label="Option 1" name={'radio'} />
          <Radio label="Option 2" name={'radio'} />
          <Radio label="Option 3" name={'radio'} />
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
    <div className="bg-white text-black dark:bg-neutral-900 dark:text-neutral-100">
      <nav className="border-b border-neutral-200 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center gap-x-4">
            <H3>atomic/ui</H3>
            <div className="grow">
              <Input
                type="text"
                placeholder="Search Components"
                value={query}
                disabled={false}
                readOnly={false}
                onChange={function (
                  event: ChangeEvent<HTMLInputElement>
                ): void {
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
      <main className="flex flex-col gap-y-8">
        <div className="flex flex-col justify-center gap-y-4 border-b border-neutral-200 py-8 text-center dark:border-neutral-800">
          <div className="flex flex-col gap-y-4">
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
        <div className="container mx-auto flex flex-col gap-y-8 px-8 pb-8">
          <H2>
            <span className="capitalize">Components</span> ({components.length})
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
        </div>
      </main>
      <footer className="border-t border-neutral-200 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
        <div className="container mx-auto px-8 py-4">
          &copy; {new Date().getFullYear()} <strong>atomic/ui</strong>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
