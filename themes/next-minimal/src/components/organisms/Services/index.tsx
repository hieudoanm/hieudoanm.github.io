import Container from '@mui/material/Container';
import React from 'react';
import content from '../../../content';
import Description from '../../atoms/Description';
import Heading from '../../atoms/Heading';
import Service from '../../molecules/Service';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-8 md:py-16">
      <Container>
        <Heading>Services I offer</Heading>
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {content.services.map(
            ({ id, image, title, description, tools = [] }) => {
              return (
                <Service
                  key={id}
                  image={image}
                  title={title}
                  description={description}
                  tools={tools}
                />
              );
            }
          )}
        </div>
      </Container>
    </section>
  );
};

export default Services;
