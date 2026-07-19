'use client';

import {
  AppsHub,
  type CourseItem,
} from '@/components/shared/organisms/AppsHub';
import { AppsComparison } from '@/components/shared/organisms/AppsComparison';
import { NextPage } from 'next';
import {
  PiCalendarBlank,
  PiListChecks,
  PiMarkdownLogo,
  PiTable,
} from 'react-icons/pi';

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
  {
    label: 'Tasks',
    description: 'A full kanban board for planning and tracking work',
    icon: PiListChecks,
    href: '/tasks/',
  },
];

const HomePage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <AppsHub
        title="Office"
        description="A suite of productivity tools for planning your work"
        items={ITEMS}
      />
      <AppsComparison />
    </div>
  );
};

export default HomePage;
