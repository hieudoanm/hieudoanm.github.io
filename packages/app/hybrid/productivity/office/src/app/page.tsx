'use client';

import {
  HomeTemplate,
  type CourseItem,
} from '@/components/shared/templates/HomeTemplate';
import { NextPage } from 'next';
import { PiCalendarBlank, PiMarkdownLogo, PiTable } from 'react-icons/pi';

const ITEMS: CourseItem[] = [
  {
    label: 'Calendar',
    description: 'A calendar productivity app with multiple calendar views',
    icon: PiCalendarBlank,
    href: '/calendar/',
  },
  {
    label: 'CSV',
    description: 'A minimal spreadsheet editor for CSV files',
    icon: PiTable,
    href: '/csv/',
  },
  {
    label: 'Markdown',
    description: 'A minimal Obsidian-style markdown knowledge base',
    icon: PiMarkdownLogo,
    href: '/md/',
  },
];

const HomePage: NextPage = () => {
  return (
    <HomeTemplate
      title="Office"
      description="A suite of productivity tools for planning your work"
      items={ITEMS}
    />
  );
};

export default HomePage;
