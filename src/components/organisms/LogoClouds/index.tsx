import React from 'react';
import uuid from '../../../utils/uuid';
import Container from '../../atoms/Container';
import Header from '../../molecules/Header';

export type Logo = { href: string; image: string; title: string };

export type LogosCloudSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  logos: Array<Logo>;
};

const LogosCloudSection: React.FC<LogosCloudSectionProps> = ({
  id = '',
  title = '',
  subtitle = '',
  logos = [],
}) => {
  return (
    <section id={id} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{title}</Header>
      </Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {logos.map(({ href, image, title }) => {
          return (
            <div key={uuid()}>
              <div
                className="w-full pb-full relative bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              >
                <a href={href} target="_blank" rel="noreferrer">
                  <div className="absolute w-full h-full bg-gray-900 bg-opacity-80 hover:bg-opacity-90">
                    <div className="h-full w-full text-white flex items-center justify-center transition-all text-3xl hover:text-4xl">
                      <h3 className="uppercase">{title}</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

LogosCloudSection.displayName = 'LogosCloudSection';

export default LogosCloudSection;
