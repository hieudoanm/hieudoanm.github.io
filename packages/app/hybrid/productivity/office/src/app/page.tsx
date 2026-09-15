'use client';

import {
  HomeTemplate,
  type CourseItem,
} from '@/components/templates/HomeTemplate';
import { NextPage } from 'next';
import { PiCalendarBlank, PiTable } from 'react-icons/pi';

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
