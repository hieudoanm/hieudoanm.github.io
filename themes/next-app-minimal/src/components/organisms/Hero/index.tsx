import Navbar from '@/components/molecules/Navbar';
import { Button, Container } from '@mui/material';
import Link from 'next/link';

type HeroProps = {
  title: string;
  subtitle: string;
  description: string;
};

export const Hero: React.FC<HeroProps> = ({
  title = '',
  subtitle = '',
  description = '',
}) => (
  <div className="bg-gray-100">
    <Navbar />
    <Container>
      <div className="py-16 md:py-32">
        <header className="flex flex-col gap-8 text-center">
          <h1 className="whitespace-pre-line text-5xl font-bold leading-hero text-gray-900">
            {title}
            <br />
            <span className="text-primary-500">{subtitle}</span>
          </h1>
          <div className="text-2xl">{description}</div>
          <Link href="#">
            <Button
              type="button"
              variant="contained"
              className="px-6 py-4 font-extrabold"
              sx={{ backgroundColor: 'rgb(3, 169, 244)' }}
            >
              Download App
            </Button>
          </Link>
        </header>
      </div>
    </Container>
  </div>
);

export default Hero;
