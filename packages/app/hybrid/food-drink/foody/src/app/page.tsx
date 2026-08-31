'use client';

import {
  HomeTemplate,
  type CourseItem,
} from '@/components/templates/HomeTemplate';
import { NextPage } from 'next';
import {
  PiCalendarDots,
  PiCircleNotch,
  PiHamburger,
  PiListDashes,
} from 'react-icons/pi';

const ITEMS: CourseItem[] = [
  {
    label: 'Wheel of Cuisine',
    description: 'Spin a wheel to choose a country to eat from',
    icon: PiCircleNotch,
    href: '/wheel/',
  },
  {
    label: 'Food Randomizer',
    description: 'Spin the reel to pick what to eat today',
    icon: PiHamburger,
    href: '/randomizer/',
  },
  {
    label: "Sheldon's Food Schedule",
    description: 'A week of meals dictated by a rigorous schedule',
    icon: PiCalendarDots,
    href: '/schedule/',
  },
  {
    label: 'Cuisine List',
    description: 'Browse and search dishes across world cuisines',
    icon: PiListDashes,
    href: '/list/',
  },
];

const HomePage: NextPage = () => {
  return (
    <HomeTemplate
      title="Foody"
      description="Can't decide what to eat? Spin the reel and let fate choose."
      items={ITEMS}
    />
  );
};

export default HomePage;
