import { PiGlobe, PiHorse, PiUpload } from 'react-icons/pi';
import { Download } from './types';

export const packages: Download[] = [
  {
    id: 'frontend-native',
    label: '@frontend/native',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/frontend/native',
    icon: PiGlobe,
    color: '#3b82f6',
    description: 'Native',
    downloads: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/frontend/native',
      },
    ],
  },
  {
    id: 'frontend-react',
    label: '@frontend/react',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/frontend/react',
    icon: PiGlobe,
    color: '#3b82f6',
    description: 'React',
    downloads: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/frontend/react',
      },
    ],
  },
  {
    id: 'frontend-solid',
    label: '@frontend/solid',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/frontend/solid',
    icon: PiGlobe,
    color: '#3b82f6',
    description: 'Solid',
    downloads: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/frontend/solid',
      },
    ],
  },
  {
    id: 'chess-ts',
    label: '@chess/ts',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/chess/ts',
    icon: PiHorse,
    color: '#1f2937',
    description: 'Chess',
    downloads: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/chess/ts',
      },
    ],
  },
  {
    id: 'simple-upload-react',
    label: 'SUS3 React',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/frontend/react',
    icon: PiUpload,
    color: '#3b82f6',
    description: '@simple-upload/react',
    downloads: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/frontend/react',
      },
    ],
  },
  {
    id: 'simple-upload-solid',
    label: 'SUS3 Solid',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/frontend/solid',
    icon: PiUpload,
    color: '#3b82f6',
    description: '@simple-upload/solid',
    downloads: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/frontend/solid',
      },
    ],
  },
  {
    id: 'simple-upload-server',
    label: 'SUS3 Server',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/server',
    icon: PiUpload,
    color: '#3b82f6',
    description: '@simple-upload/server',
    downloads: [
      {
        label: 'Download NPM',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/server',
      },
    ],
  },
];
