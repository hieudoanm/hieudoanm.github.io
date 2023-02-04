import DesktopMenu from '@/components/molecules/DesktopMenu';
import MobileMenu from '@/components/molecules/MobileMenu';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

export const Navbar: React.FC = () => {
  const [top, setTop] = useState<number>(0);

  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      if (!document || !document.body || !document.documentElement) {
        return;
      }

      const top: number =
        document.body.scrollTop || document.documentElement.scrollTop || 0;

      setTop(top);
    };
  }

  return (
    <nav
      id="header"
      className={`fixed top-0 z-50 w-full ${
        top > 10 ? 'border-b bg-white shadow' : ''
      }`}
    >
      <Container>
        <div className="py-8">
          <div className="flex w-full items-center justify-between">
            <ScrollLink
              className={`flex items-center gap-2 ${
                top > 10 ? 'text-gray-900' : 'text-white'
              }`}
              to="hero"
              spy={true}
              offset={0}
              smooth={true}
              duration={500}
            >
              <FlightTakeoffIcon fontSize="large" className="fill-current" />
              <span className="text-xl font-bold md:text-2xl">LANDING</span>
            </ScrollLink>
            <div
              className={`hidden md:block ${
                top > 10 ? 'text-gray-900' : 'text-white'
              }`}
            >
              <DesktopMenu scrolled={top > 10} />
            </div>
            <div className="block md:hidden">
              <MobileMenu
                textColor={top > 10 ? 'text-gray-900' : 'text-white'}
              />
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
