import { SquadManager } from '@/components/organisms/SquadManager';
import Link from 'next/link';
import { NextPage } from 'next';
import { FiInfo, FiDownload, FiClock } from 'react-icons/fi';

const NAV_ITEMS = [
  { label: 'About', href: '/about', icon: <FiInfo className="h-3.5 w-3.5" /> },
  {
    label: 'Downloads',
    href: '/downloads',
    icon: <FiDownload className="h-3.5 w-3.5" />,
  },
  {
    label: 'Version',
    href: '/version',
    icon: <FiClock className="h-3.5 w-3.5" />,
  },
];

const HomePage: NextPage = () => (
  <div className="flex h-screen flex-col">
    <header className="border-base-300 flex items-center justify-between gap-4 border-b px-4 py-2 print:hidden">
      <h1 className="text-sm font-bold">Football Squad Manager</h1>
      <div className="flex items-center gap-1">
        {NAV_ITEMS.map(({ label, href, icon }) => (
          <Link key={href} href={href} className="btn btn-ghost btn-xs gap-1.5">
            {icon}
            {label}
          </Link>
        ))}
      </div>
    </header>
    <main className="min-h-0 flex-1 p-4">
      <SquadManager />
    </main>
  </div>
);

export default HomePage;
