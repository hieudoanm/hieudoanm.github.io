import { Container } from '@mui/material';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="fade-in w-full py-8 text-center md:text-left">
      <Container>
        <Link className="text-sm text-gray-500" href="#">
          &copy; App {year}
        </Link>
      </Container>
    </footer>
  );
};

export default Footer;
