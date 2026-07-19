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
    description: 'A lite calendar with essential monthly views',
    icon: PiCalendarBlank,
    href: '/lite/calendar',
  },
  {
    label: 'CSV',
    description: 'A lite spreadsheet editor for CSV files',
    icon: PiTable,
    href: '/lite/csv',
  },
  {
    label: 'Markdown',
    description: 'A lite markdown editor with live preview',
    icon: PiMarkdownLogo,
    href: '/lite/md',
  },
];

const LiteHomePage: NextPage = () => {
  return (
    <HomeTemplate
      title="Lite"
      description="Lightweight versions of your favorite productivity tools"
      items={ITEMS}
    />
  );
};

export default LiteHomePage;
