import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import content from '../../../content';
import Description from '../../atoms/Description';
import Heading from '../../atoms/Heading';
import Container from '@mui/material/Container';

export const Portfolio: React.FC = () => {
  return (
    <section id="portofolio" className="py-8 md:py-16">
      <Container>
        <Heading>Portofolio</Heading>
        <Description>
          Since the beginning of my journey as a freelance developer, I&apos;ve
          done remote work for
          <span className="text-teal-500"> agencies </span>
          consulted for <span className="text-teal-500">startups </span>
          and collaborated with talanted people to create digital products for
          both business and consumer use.
        </Description>
        <Description>
          I offer from a wide range of services, including programming and
          teaching.
        </Description>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.projects.map(({ id, url, title, image }) => {
            return (
              <div key={id} className="col-span-1">
                <Link
                  href={url}
                  className="block overflow-hidden rounded-lg border shadow-md transition-all hover:shadow-2xl"
                >
                  <Image className="object-cover" src={image} alt={title} />
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Portfolio;
