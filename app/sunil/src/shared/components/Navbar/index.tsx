'use client';

import { APP_NAME } from '@sunil/common/constants/app.constants';
import { Container } from '@sunil/shared/components/Container';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <nav className="border-b shadow">
      <Container>
        <div className="px-4 py-2 md:px-8 md:py-4">
          <Link href="/">
            <p className="uppercase">{APP_NAME}</p>
          </Link>
        </div>
      </Container>
    </nav>
  );
};

Navbar.displayName = 'Navbar';
