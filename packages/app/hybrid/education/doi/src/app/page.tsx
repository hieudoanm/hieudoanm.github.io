import { HomeTemplate } from '@/components/templates/HomeTemplate';
import type { NextPage } from 'next';
import { FiBarChart2, FiSearch, FiShare2 } from 'react-icons/fi';

const ITEMS = [
  {
    href: '/graph',
    title: 'Graph',
    description: 'Interactive force-directed citation network',
    icon: <FiShare2 />,
  },
  {
    href: '/overview',
    title: 'Overview',
    description: 'Citation statistics and year distribution',
    icon: <FiBarChart2 />,
  },
  {
    href: '/search',
    title: 'Search',
    description: 'Find works by title, author, abstract, or DOI',
    icon: <FiSearch />,
  },
];

const HomePage: NextPage = () => <HomeTemplate items={ITEMS} />;

export default HomePage;
