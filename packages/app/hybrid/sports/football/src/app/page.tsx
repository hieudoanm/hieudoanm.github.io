import Link from 'next/link';
import { NextPage } from 'next';
import { FiUsers, FiTrendingUp } from 'react-icons/fi';

const APPS = [
  {
    label: 'Manager',
    description: 'Build squads, pick formations and track matches.',
    href: '/manager',
    icon: <FiUsers className="h-6 w-6" />,
  },
  {
    label: 'Touraments',
    description: 'Browse tournament history, group stages and brackets.',
    href: '/touraments',
    icon: <FiTrendingUp className="h-6 w-6" />,
  },
];

const HomePage: NextPage = () => (
  <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4">
    <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
      {APPS.map(({ label, description, href, icon }) => (
        <Link
          key={href}
          href={href}
          className="card border-base-300 bg-base-100 border transition-shadow hover:shadow-lg">
          <div className="card-body gap-2 p-6">
            {icon}
            <h2 className="card-title text-base">{label}</h2>
            <p className="text-base-content/70 text-sm">{description}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default HomePage;
