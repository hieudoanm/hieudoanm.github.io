'use client';

import { Container } from '@mini/common/components/Container';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <nav className="border-b shadow">
      <Container>
        <div className="px-4 md:px-8 py-2 md:py-4">
          <Link href="/">
            <p className="uppercase">Mini</p>
          </Link>
        </div>
      </Container>
    </nav>
  );
};

Navbar.displayName = 'Navbar';

export default Navbar;
