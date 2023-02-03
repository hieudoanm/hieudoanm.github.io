import Container from '@mui/material/Container';
import Link from 'next/link';
import React from 'react';
import deved from '../../../assets/images/dev-ed-wave.png';
import content from '../../../content';
import Description from '../../atoms/Description';
import Heading from '../../atoms/Heading';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen py-8 md:py-16">
      <Container>
        <div>
          <h2 className="mb-8 text-center text-4xl font-medium text-teal-600 dark:text-teal-400 md:text-5xl lg:text-6xl">
            {content.seo.title}
          </h2>
          <Heading>Full-stack Developer</Heading>
          <Description>
            Freelancer providing services for programming and design content
            needs. Join me down below and let&apos;s get cracking!
          </Description>
          <div className="mb-16 flex justify-center gap-16 text-gray-600 dark:text-gray-400">
            {content.social.map(({ id, url, icon }) => {
              return (
                <Link key={id} href={url}>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 dark:bg-teal-400">
                    {icon}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mx-auto h-80 w-80 overflow-hidden rounded-full bg-gradient-to-b from-teal-500 md:h-96 md:w-96">
            <div
              style={{ backgroundImage: `url(${deved.src})` }}
              className="h-full w-full bg-cover bg-center"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
