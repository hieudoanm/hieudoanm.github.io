import { Link, navigate } from 'gatsby';
import React from 'react';
import {
  FaBlog,
  FaBullhorn,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import scrollTo from '../../../utils/scroll-to';
import Container from '../../atoms/Container';
import Banner from '../../molecules/Banner';
import Dropdown from '../../molecules/Dropdown';

export type Section = {
  id: string;
};

export type NavbarProps = { fixed?: boolean; sections?: Section[] };

const Navbar: React.FC<NavbarProps> = ({ fixed = false, sections = [] }) => {
  const fixedTop: string = fixed ? 'fixed z-10 top-0' : '';

  const options = sections.map(({ id }) => {
    return { onClick: () => scrollTo(id), text: id };
  });

  return (
    <nav className={`${fixedTop} bg-white w-full border-b`}>
      <Banner>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaBullhorn className="mr-2" />
            <span>
              This is my{' '}
              <a
                href="https://bradfrost.com/blog/post/atomic-web-design/"
                target="_blank"
                rel="noreferrer"
                className="underline uppercase"
              >
                atomic design
              </a>{' '}
              masterpiece
            </span>
          </div>
          <div>
            <FaTimes />
          </div>
        </div>
      </Banner>
      <Container>
        <div className="flex items-center py-4">
          <div className="block md:hidden mr-8">
            <Dropdown
              align="left"
              icon={<FaBars />}
              options={[
                {
                  onClick: () => {
                    navigate('/about');
                  },
                  text: 'About',
                },
                {
                  onClick: () => {
                    navigate('/blogs');
                  },
                  text: 'Blogs',
                },
                {
                  onClick: () => {
                    navigate('/contact');
                  },
                  text: 'Contact',
                },
              ]}
            />
          </div>
          <Link to="/">
            <div className="text-2xl cursor-pointer uppercase">Hieu Doan</div>
          </Link>
          <div className="hidden md:block">
            <div className="ml-8 mr-auto flex items-center gap-8">
              <Link to="/about">
                <div className="flex items-center gap-2">
                  <FaUser />
                  <span>About</span>
                </div>
              </Link>
              <Link to="/blogs">
                <div className="flex items-center gap-2">
                  <FaBlog />
                  <span>Blogs</span>
                </div>
              </Link>
              <Link to="/contact">
                <div className="flex items-center gap-2">
                  <FaEnvelope />
                  <span>Contact</span>
                </div>
              </Link>
            </div>
          </div>
          {options.length > 0 && (
            <div className="ml-auto">
              <Dropdown options={options} label={'Options'} />
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
};

Navbar.displayName = 'Navbar';
Navbar.defaultProps = { fixed: false, sections: [] };

export default Navbar;
