import { Dashboard } from '@mui/icons-material';
import { Container } from '@mui/material';
import Link from 'next/link';

export const Navbar: React.FC = () => (
  <nav className="py-8">
    <Container>
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Dashboard fontSize="large" className="text-primary-500" />
          <span className="text-2xl uppercase text-primary-500">App</span>
        </Link>
      </div>
    </Container>
  </nav>
);

export default Navbar;
