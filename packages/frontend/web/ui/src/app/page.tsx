'use client';

import { Badge } from '@nothing-ui/components/Badge';
import { Button } from '@nothing-ui/components/Button';
import { ButtonGroup } from '@nothing-ui/components/ButtonGroup';
import { Input } from '@nothing-ui/components/fields/Input';
import { Preview } from '@nothing-ui/components/Preview';
import { Select } from '@nothing-ui/components/fields/Select';
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
} from '@nothing-ui/components/Typography';
import { NextPage } from 'next';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-okaidia.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { TextArea } from '@nothing-ui/components/fields/TextArea';
import { Checkbox } from '@nothing-ui/components/fields/Checkbox';
import { Radio } from '@nothing-ui/components/fields/Radio';
import { FileUpload } from '@nothing-ui/components/fields/FileUpload';
import { Toggle } from '@nothing-ui/components/fields/Toggle';
import { Divider } from '@nothing-ui/components/Divider';

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

  return (
    <>
      <nav className="border-b border-gray-900">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center gap-x-4">
            <H3>Nothing UI</H3>
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
        <div className="flex flex-col gap-y-4 text-center">
          <H1>Nothing UI</H1>
          <p>Free Open Source TailwindCSS v4 Components</p>
        </div>
        <div className="container mx-auto px-8 pb-8">
          <div className="flex flex-col gap-y-8">
            {[
              {
                id: 'badge',
                name: 'Badge',
                component: <Badge>Badge</Badge>,
                code: '',
              },
              {
                id: 'button',
                name: 'Button',
                component: <Button>Button</Button>,
                code: '',
              },
              {
                id: 'button-group',
                name: 'Button Group',
                component: <ButtonGroup />,
                code: '',
              },
              {
                id: 'checkbox',
                name: 'Checkbox',
                component: (
                  <div>
                    <Checkbox label="Option 1" name={'checkbox'} />
                    <Checkbox label="Option 2" name={'checkbox'} />
                    <Checkbox label="Option 3" name={'checkbox'} />
                  </div>
                ),
                code: '',
              },
              {
                id: 'divider',
                name: 'Divider',
                component: <Divider text="Divider" />,
                code: '',
              },
              {
                id: 'file-upload',
                name: 'File Upload',
                component: <FileUpload id={'file'} name={'file'} />,
                code: '',
              },
              {
                id: 'input',
                name: 'Input',
                component: (
                  <Input
                    type={'text'}
                    placeholder={'Input Field'}
                    value={'Input Field'}
                    disabled={false}
                    readOnly={false}
                    onChange={function (
                      event: ChangeEvent<HTMLInputElement>
                    ): void {
                      console.log(event.target.value);
                    }}
                  />
                ),
                code: '',
              },
              {
                id: 'select',
                name: 'Select',
                component: (
                  <Select
                    placeholder={'Select Field'}
                    value={''}
                    disabled={false}
                    onChange={function (
                      event: ChangeEvent<HTMLSelectElement>
                    ): void {
                      console.log(event.target.value);
                    }}></Select>
                ),
                code: '',
              },
              {
                id: 'textarea',
                name: 'Textarea',
                component: (
                  <TextArea
                    rows={0}
                    placeholder={'Textarea Field'}
                    value={'Textarea Field'}
                    disabled={false}
                    readOnly={false}
                    onChange={function (
                      event: ChangeEvent<HTMLTextAreaElement>
                    ): void {
                      console.log(event.target.value);
                    }}
                  />
                ),
                code: '',
              },
              {
                id: 'radio',
                name: 'Radio',
                component: (
                  <div>
                    <Radio label="Option 1" name={'radio'} />
                    <Radio label="Option 2" name={'radio'} />
                    <Radio label="Option 3" name={'radio'} />
                  </div>
                ),
                code: '',
              },
              {
                id: 'toggle',
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
              },
              {
                id: 'typography',
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
              },
            ].map(({ id, name, code, component = <></> }, index: number) => {
              return (
                <div key={id} className="flex flex-col gap-y-4">
                  <Preview
                    name={`${index + 1}. ${name}`}
                    code={code}
                    component={component}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <footer className="border border-t-gray-900">
        <div className="container mx-auto px-8 py-4">
          &copy; 2025 Nothing UI
        </div>
      </footer>
    </>
  );
};

export default HomePage;
