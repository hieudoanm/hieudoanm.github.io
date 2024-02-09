import { Container } from '@broca/common/components/Container';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="border-b shadow">
      <div className="px-4 py-2 md:px-8 md:py-4">
        <Container>
          <div className="flex justify-between">
            <Link href="/">
              <p className="text-xl font-bold">🧠 Broca</p>
            </Link>
            <Link href="/languages">Languages</Link>
          </div>
        </Container>
      </div>
    </nav>
  );
};
