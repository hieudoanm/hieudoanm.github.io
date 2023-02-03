import { Container } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../../../assets/images/astronout.png';
import background from '../../../assets/images/background/hero.jpg';
import content from '../../../content';

export const Header: React.FC = () => {
  return (
    <div
      id="hero"
      style={{ backgroundImage: `url(${background.src})` }}
      className="h-screen bg-cover bg-fixed bg-center bg-no-repeat"
    >
      <div className="h-full bg-gray-900/25">
        <Container className="h-full">
          <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2">
            <div className="col-span-1">
              <div className="flex h-full items-center justify-center">
                <div className="text-white">
                  <h1 className="text-4xl font-bold">
                    Hi! I&apos;m {content.seo.title}
                  </h1>
                  <p className="my-4 max-w-lg">{content.seo.description}</p>
                  <div className="flex items-center gap-4">
                    {content.social.map(({ id, url, icon }) => {
                      return (
                        <Link key={id} href={url} target="_blank">
                          {icon}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative col-span-1">
              <div className="astronout absolute right-28 hidden w-[400px] md:block">
                <Image
                  className="w-96"
                  src={logo}
                  alt="astronout"
                  priority={true}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Header;
