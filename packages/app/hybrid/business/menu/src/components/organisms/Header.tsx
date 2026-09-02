import Link from 'next/link';
import { FC } from 'react';
import { FiCoffee, FiHome } from 'react-icons/fi';

const Header: FC = () => (
  <header className="navbar border-b border-base-300 bg-base-200 px-4">
    <div className="navbar-start">
      <Link href="/" className="btn btn-ghost text-xl normal-case">
        <FiCoffee className="text-xl" />
        Menu
      </Link>
    </div>
    <div className="navbar-end">
      <Link href="/" className="btn btn-ghost btn-sm" aria-label="Home">
        <FiHome className="text-lg" />
      </Link>
    </div>
  </header>
);

export default Header;