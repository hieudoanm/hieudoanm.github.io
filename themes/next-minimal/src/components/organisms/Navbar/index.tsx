import { DarkMode, LightMode } from '@mui/icons-material';
import { Container } from '@mui/material';
import React from 'react';
import content from '../../../content';
import { useTheme } from '../../../context/ThemeProvider';

export const Navbar: React.FC = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav className="dark:text-white">
      <Container>
        <div className="flex items-center justify-between py-8">
          <h1 className="text-xl uppercase">{content.seo.title}</h1>
          <ul className="flex items-center">
            <li>
              {!darkMode && (
                <DarkMode
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer text-4xl"
                />
              )}
              {darkMode && (
                <LightMode
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer text-4xl"
                />
              )}
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
