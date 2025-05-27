'use client';

import { Avatar } from '@atom-ui/components/Avatar';
import { Badge } from '@atom-ui/components/Badge';
import { Breadcrumbs } from '@atom-ui/components/Breadcrumbs';
import { Card } from '@atom-ui/components/Card';
import { List } from '@atom-ui/components/data/List';
import { Stats } from '@atom-ui/components/data/Stats';
import { Table } from '@atom-ui/components/data/Table';
import { Timeline } from '@atom-ui/components/data/Timeline';
import { Divider } from '@atom-ui/components/Divider';
import { Button } from '@atom-ui/components/form/Button';
import { ButtonGroup } from '@atom-ui/components/form/ButtonGroup';
import { Checkbox } from '@atom-ui/components/form/Checkbox';
import { FileUpload } from '@atom-ui/components/form/FileUpload';
import { Input } from '@atom-ui/components/form/Input';
import { Radio } from '@atom-ui/components/form/Radio';
import { Select } from '@atom-ui/components/form/Select';
import { TextArea } from '@atom-ui/components/form/TextArea';
import { Toggle } from '@atom-ui/components/form/Toggle';
import { Alert } from '@atom-ui/components/info/Alert';
import { Tooltip } from '@atom-ui/components/info/Tooltip';
import { Loading } from '@atom-ui/components/Loading';
import { Modal } from '@atom-ui/components/Modal';
import { Pagination } from '@atom-ui/components/Pagination';
import { Preview } from '@atom-ui/components/Preview';
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
} from '@atom-ui/components/Typography';
import { NextPage } from 'next';
import Link from 'next/link';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-okaidia.css';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa6';

const HomePage: NextPage = () => {
  const [{ query = '', toggle = false }, setState] = useState<{
    query: string;
    toggle: boolean;
  }>({
    query: '',
    toggle: false,
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
    level: 'data' | 'form' | 'info' | 'starter';
  }[] = [
    {
      id: 'alert',
      emoji: '🚨',
      name: 'Alert',
      component: <Alert />,
      code: '',
      level: 'info',
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
      component: <Button>Button</Button>,
      code: '',
      level: 'form',
    },
    {
      id: 'button-group',
      emoji: '🔘🔘',
      name: 'Button Group',
      component: <ButtonGroup />,
      code: '',
      level: 'form',
    },
    {
      id: 'card',
      emoji: '💳',
      name: 'Card',
      code: '',
      component: <Card />,
      level: 'data',
    },
    {
      id: 'checkbox',
      emoji: '☑️',
      name: 'Checkbox',
      component: (
        <div>
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
      component: <Divider text="Divider" />,
      code: '',
      level: 'starter',
    },
    {
      id: 'file-upload',
      emoji: '📂',
      name: 'File Upload',
      component: (
        <div className="w-full">
          <FileUpload id={'file'} name={'file'} />
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
        <Input
          type={'text'}
          placeholder={'Input Field'}
          value={'Input Field'}
          disabled={false}
          readOnly={false}
          onChange={function (event: ChangeEvent<HTMLInputElement>): void {
            console.log(event.target.value);
          }}
        />
      ),
      level: 'form',
    },
    {
      id: 'list',
      emoji: '📋',
      name: 'List',
      code: '',
      component: <List />,
      level: 'data',
    },
    {
      id: 'modal',
      emoji: '📦',
      name: 'Modal',
      code: '',
      component: <Modal />,
      level: 'data',
    },
    {
      id: 'select',
      emoji: '📑',
      name: 'Select',
      code: '',
      component: (
        <Select
          placeholder={'Select Field'}
          value={''}
          disabled={false}
          onChange={function (event: ChangeEvent<HTMLSelectElement>): void {
            console.log(event.target.value);
          }}></Select>
      ),
      level: 'form',
    },
    {
      id: 'textarea',
      emoji: '📝',
      name: 'Textarea',
      code: '',
      component: (
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
      ),
      level: 'form',
    },
    {
      id: 'pagination',
      emoji: '📄',
      name: 'Pagination',
      component: <Pagination />,
      code: '',
      level: 'starter',
    },
    {
      id: 'radio',
      emoji: '🔘',
      name: 'Radio',
      component: (
        <div>
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
      component: <Loading />,
      code: '',
      level: 'starter',
    },
    {
      id: 'stats',
      emoji: '📊',
      name: 'Stats',
      component: <Stats />,
      code: '',
      level: 'data',
    },
    {
      id: 'table',
      emoji: '📈',
      name: 'Table',
      component: <Table />,
      code: '',
      level: 'data',
    },
    {
      id: 'timeline',
      emoji: '⏱️',
      name: 'Timeline',
      component: <Timeline />,
      code: '',
      level: 'data',
    },
    {
      id: 'tooltip',
      emoji: '💬',
      name: 'Tooltip',
      component: <Tooltip />,
      code: '',
      level: 'info',
    },
    {
      id: 'toggle',
      emoji: '🔄',
      name: 'Toggle',
      component: (
        <Toggle
          value={toggle}
          onClick={() => {
            setState((previous) => ({
              ...previous,
              toggle: !previous.toggle,
            }));
          }}
        />
      ),
      code: '',
      level: 'form',
    },
    {
      id: 'typography',
      emoji: '🔤',
      name: 'Typography',
      component: (
        <div className="text-center">
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
    <>
      <nav className="border-b border-neutral-200">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center gap-x-4">
            <H3>Atom UI</H3>
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
            <FaGithub className="text-3xl" />
          </div>
        </div>
      </nav>
      <main className="flex flex-col gap-y-8 py-8">
        <div className="flex h-screen flex-col justify-center gap-y-4 border-b border-neutral-200 text-center">
          <div className="flex flex-col gap-y-4">
            <H1>Atom UI</H1>
            <p>Free Open Source TailwindCSS v4 Components</p>
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
                    <div className="flex items-center gap-x-2 rounded border border-neutral-200 p-4 shadow">
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
      <footer className="border-t border-neutral-200">
        <div className="container mx-auto px-8 py-4">&copy; 2025 Atom UI</div>
      </footer>
    </>
  );
};

export default HomePage;
