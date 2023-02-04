import content from '@/content';
import { Container } from '@mui/material';
import React, { useState } from 'react';
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
      className={`fixed z-50 w-full py-8 text-white transition-all duration-200 ${
        top > 80 ? 'bg-gray-900 shadow-2xl' : ''
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <ScrollLink
            to="hero"
            spy={true}
            offset={0}
            smooth={true}
            duration={500}
          >
            <h1 className="cursor-pointer text-4xl font-semibold uppercase">
              {content.seo.title}
            </h1>
          </ScrollLink>
          <div className="flex items-center gap-8">
            {[{ to: 'skills' }, { to: 'projects' }, { to: 'contact' }].map(
              ({ to }) => {
                return (
                  <ScrollLink
                    key={to}
                    to={to}
                    spy={true}
                    offset={0}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer text-xl capitalize transition-all hover:text-2xl"
                  >
                    {to}
                  </ScrollLink>
                );
              }
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
