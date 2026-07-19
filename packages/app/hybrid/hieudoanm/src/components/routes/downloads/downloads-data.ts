import { Tool } from '@hieudoanm.github.io/components/atoms';
import {
  PiCodeSimple,
  PiGlobe,
  PiHorse,
  PiProhibit,
  PiTerminal,
  PiUpload,
} from 'react-icons/pi';

export const clis: Tool[] = [
  {
    label: 'bash',
    description: 'Aliases',
    icon: PiTerminal,
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/bash',
    actions: [
      {
        label: 'Download bash',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/bash/download/bash/dist',
      },
    ],
  },
  {
    label: 'hieudoanm',
    description: 'CLI',
    icon: PiCodeSimple,
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/hieudoanm',
    actions: [
      {
        label: 'Download bin.go',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/tag/cli-latest',
      },
      {
        label: 'Download bin.rs',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/tag/cli-latest',
      },
      {
        label: 'Download bin.swift',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/tag/cli-latest',
      },
    ],
  },
];

export const extensions: Tool[] = [
  {
    label: '@hieudoanm/ext',
    description: 'AdsBlocker',
    icon: PiProhibit,
    href: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/tag/extensions-browser-latest',
    actions: [
      {
        label: 'Download CRX',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-latest/hieudoanm-extension.crx',
      },
      {
        label: 'Download XPI',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-latest/hieudoanm-extension.xpi',
      },
      {
        label: 'Download ZIP',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-latest/hieudoanm-extension.zip',
      },
    ],
  },
];

export const packages: Tool[] = [
  {
    label: '@frontend/native',
    description: 'Native',
    icon: PiGlobe,
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/frontend/native',
    actions: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/frontend/native',
      },
    ],
  },
  {
    label: '@frontend/react',
    description: 'React',
    icon: PiGlobe,
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/frontend/react',
    actions: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/frontend/react',
      },
    ],
  },
  {
    label: '@frontend/solid',
    description: 'Solid',
    icon: PiGlobe,
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/frontend/solid',
    actions: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/frontend/solid',
      },
    ],
  },
  {
    label: '@chess/ts',
    description: 'Chess',
    icon: PiHorse,
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/chess/ts',
    actions: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/chess/ts',
      },
    ],
  },
  {
    label: 'SUS3 React',
    description: '@simple-upload/react',
    icon: PiUpload,
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/frontend/react',
    actions: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/frontend/react',
      },
    ],
  },
  {
    label: 'SUS3 Solid',
    description: '@simple-upload/solid',
    icon: PiUpload,
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/frontend/solid',
    actions: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/frontend/solid',
      },
    ],
  },
  {
    label: 'SUS3 Server',
    description: '@simple-upload/server',
    icon: PiUpload,
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/server',
    actions: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/server',
      },
    ],
  },
];
