'use client';

import { APP_NAME } from '@chess/common/constants/app.constants';
import { Container } from '@chess/shared/components/Container';
import Link from 'next/link';
import { FaBars, FaGithub } from 'react-icons/fa';

const GitHubButton: React.FC<{ size: string }> = ({ size = 'md' }) => {
  return (
    <Link
      href="https://github.com/hieudoanm"
      className="font-bold"
      target="_blank">
      <button
        type="button"
        className="btn btn-xs flex w-full items-center gap-x-2 bg-teal-500 text-white">
        <FaGithub />
        <p>GitHub</p>
      </button>
    </Link>
  );
};

export const Navbar: React.FC = () => {
  return (
    <nav className="border-b shadow">
      <Container>
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <Link href="/">
                <p className="font-bold uppercase">{APP_NAME}</p>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-x-4">
                <GitHubButton size="sm" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};
