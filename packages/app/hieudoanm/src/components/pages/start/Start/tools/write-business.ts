import { PiPencilLine } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Bill of Sale',
    description: 'Write',
    tags: ['business', 'document', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-bill-of-sale'),
  },
  {
    label: 'Business Name',
    description: 'Write',
    tags: ['document', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-business-name'),
  },
  {
    label: 'Business Plan',
    description: 'Write',
    tags: ['document', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-business-plan'),
  },
  {
    label: 'Cold Email',
    description: 'Write',
    tags: ['business', 'document', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-cold-email'),
  },
  {
    label: 'Landing Page',
    description: 'Write',
    tags: ['business', 'document', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-landing-page'),
  },
  {
    label: 'NDA',
    description: 'Write',
    tags: ['business', 'document', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-nda'),
  },
  {
    label: 'Podcast Script',
    description: 'Write',
    tags: ['business', 'document', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-podcast-script'),
  },
  {
    label: 'Press Release',
    description: 'Write',
    tags: ['business', 'document', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-press-release'),
  },
  {
    label: 'Privacy Policy',
    description: 'Write',
    tags: ['business', 'document', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-privacy-policy'),
  },
  {
    label: 'Purchase Agreement',
    description: 'Write',
    tags: ['business', 'document', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-purchase-agreement'),
  },
  {
    label: 'Slogan',
    description: 'Write',
    tags: ['business', 'document', 'writing'],
    icon: PiPencilLine,
    onClick: open('write-business-slogan'),
  },
];
