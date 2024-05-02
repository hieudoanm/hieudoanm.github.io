import { Container } from '@hieudoanm/components/Container';
import { Header } from '@hieudoanm/components/Header';
import type React from 'react';

export type Logo = { id: string; href: string; image: string; title: string };

export type LogosCloudSectionProperties = {
  id: string;
  title: string;
  subtitle: string;
  logos: Logo[];
};

export const LogosCloudSection: React.FC<LogosCloudSectionProperties> = ({
  id: sectionId = '',
  title: sectionTitlte = '',
  subtitle = '',
  logos = [],
}) => {
  return (
    <section id={sectionId} className='pb-16'>
      <Container>
        <Header subtitle={subtitle}>{sectionTitlte}</Header>
      </Container>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {logos.map(({ id, href, image, title }: Logo) => {
          return (
            <div key={`logo-${id}`}>
              <div
                className='pb-full relative w-full bg-cover bg-center'
                style={{ backgroundImage: `url(${image})` }}>
                <a href={href} target='_blank' rel='noreferrer'>
                  <div className='absolute h-full w-full bg-gray-900 bg-opacity-80 hover:bg-opacity-90'>
                    <div className='flex h-full w-full items-center justify-center text-3xl text-white transition-all hover:text-4xl'>
                      <h3 className='uppercase'>{title}</h3>
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
