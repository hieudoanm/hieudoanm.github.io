import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import background from '../../assets/background.jpeg';
import profile from '../../assets/profile.jpeg';
import Profile from '../organisms/Profile';
import Social from '../organisms/Social';

const HomeTemplate: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main
      className={`bg-cover bg-center leading-normal tracking-wider text-gray-900 antialiased ${
        darkMode ? 'dark' : ''
      }`}
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="mx-auto flex h-auto max-w-4xl flex-wrap items-center py-32 lg:h-screen lg:py-0">
        <div
          id="profile"
          className="mx-6 w-full rounded-lg bg-white opacity-75 shadow-2xl dark:bg-gray-900 lg:mx-0 lg:w-3/5 lg:rounded-l-lg lg:rounded-r-none"
        >
          <div className="p-4 text-center md:p-12 lg:text-left">
            <div
              className="mx-auto -mt-16 block h-48 w-48 rounded-full bg-cover bg-center shadow-xl lg:hidden"
              style={{
                backgroundImage: `url(${profile.src})`,
              }}
            />
            <Profile />
            <div className="pt-12 pb-8">
              <Link href="mailto:hieumdoan@gmail.com">
                <Button variant="outlined">Get In Touch</Button>
              </Link>
            </div>
            <Social />
          </div>
        </div>
        <div className="w-full lg:w-2/5">
          <Image
            src={profile}
            className="hidden rounded-none shadow-2xl lg:block lg:rounded-lg"
            alt="profile"
          />
        </div>
        <div className="w-18 absolute top-0 right-0 h-12 p-4">
          <div onClick={() => setDarkMode(!darkMode)}>
            {!darkMode && (
              <DarkModeIcon
                onClick={() => setDarkMode(!darkMode)}
                className="cursor-pointer text-yellow-500"
              />
            )}
            {darkMode && (
              <LightModeIcon
                onClick={() => setDarkMode(!darkMode)}
                className="cursor-pointer text-yellow-500"
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeTemplate;
