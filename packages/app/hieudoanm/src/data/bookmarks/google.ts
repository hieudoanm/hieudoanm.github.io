import {
  PiCalendar,
  PiChartBar,
  PiCheckCircle,
  PiEnvelope,
  PiFolder,
  PiMapPin,
  PiNotePencil,
  PiPlay,
} from 'react-icons/pi';
import { ItemCardProps } from '@hieudoanm.github.io/components/pages/start/cards/ItemCard';

export const google: ItemCardProps[] = [
  {
    label: 'Calendar',
    href: 'https://calendar.google.com',
    description: 'Calendar',
    icon: PiCalendar,
    //color: '#4285f4',
  },
  {
    label: 'Docs',
    href: 'https://docs.google.com',
    description: 'Word',
    icon: PiNotePencil,
    //color: '#4285f4',
  },
  {
    label: 'Drive',
    href: 'https://drive.google.com',
    description: 'OneDrive',
    icon: PiFolder,
    //color: '#4285f4',
  },
  {
    label: 'Gmail',
    href: 'https://gmail.com',
    description: 'Email',
    icon: PiEnvelope,
    //color: '#d93025',
  },
  {
    label: 'Maps',
    href: 'https://maps.google.com',
    description: 'Maps',
    icon: PiMapPin,
    //color: '#4285f4',
  },
  {
    label: 'Sheets',
    href: 'https://sheets.google.com',
    description: 'Excel',
    icon: PiChartBar,
    //color: '#0a6847',
  },
  {
    label: 'Slides',
    href: 'https://slides.google.com',
    description: 'PowerPoint',
    icon: PiPlay,
    //color: '#c23728',
  },
  {
    label: 'Tasks',
    href: 'https://tasks.google.com',
    description: 'ToDo',
    icon: PiCheckCircle,
    //color: '#4285f4',
  },
];
