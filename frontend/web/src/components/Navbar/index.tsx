import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import Banner from '@hieudoanm/components/Banner';
import Container from '@hieudoanm/components/Container';
import scrollTo from '@hieudoanm/utils/scroll-to';
import Link from 'next/link';
import React from 'react';
import {
  FaBlog,
  FaBullhorn,
  FaEnvelope,
  FaTimes,
  FaUser,
} from 'react-icons/fa';

export type Section = {
  id: string;
};

export type NavbarProperties = { fixed?: boolean; sections?: Section[] };

const Navbar: React.FC<NavbarProperties> = ({
  fixed = false,
  sections = [],
}) => {
  const fixedTop: string = fixed ? 'fixed z-10 top-0' : '';

  const options = sections.map(({ id }) => {
    return { onClick: () => scrollTo(id), text: id };
  });

  return (
    <nav className={`${fixedTop} w-full border-b bg-white`}>
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
                className="uppercase underline"
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
          <Link href="/">
            <div className="cursor-pointer text-2xl uppercase">Hieu Doan</div>
          </Link>
          <div className="hidden md:block">
            <div className="ml-8 mr-auto flex items-center gap-8">
              <Link href="/about">
                <div className="flex items-center gap-2">
                  <FaUser />
                  <span>About</span>
                </div>
              </Link>
              <Link href="/blogs">
                <div className="flex items-center gap-2">
                  <FaBlog />
                  <span>Blogs</span>
                </div>
              </Link>
              <Link href="/contact">
                <div className="flex items-center gap-2">
                  <FaEnvelope />
                  <span>Contact</span>
                </div>
              </Link>
            </div>
          </div>
          {options.length > 0 && (
            <div className="ml-auto">
              <Menu colorScheme="teal">
                <MenuButton
                  as={Button}
                  colorScheme="teal"
                  rightIcon={<ChevronDownIcon />}
                >
                  Actions
                </MenuButton>
                <MenuList>
                  {options.map(({ text, onClick }) => {
                    return (
                      <MenuItem
                        key={text}
                        onClick={onClick}
                        className="capitalize"
                      >
                        {text}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
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
