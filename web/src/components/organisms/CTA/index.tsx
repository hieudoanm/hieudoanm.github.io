import { Button } from '@chakra-ui/react';
import React from 'react';
import Container from '../../atoms/Container';
import Header from '../../molecules/Header';

export type CTASectionProperties = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  backgroundImage: string;
};

const CTASection: React.FC<CTASectionProperties> = (
  { id, title, subtitle, cta, backgroundImage }
) => {
  return (
    <div className="py-16">
      <div
        id={id}
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-gray-900 bg-opacity-80 pb-16">
          <Container>
            <Header subtitle={subtitle} className="text-white">
              {title}
            </Header>
            <a href="mailto:hieumdoan@gmail.com">
              <Button
                size="xl"
                className="mx-auto block bg-white uppercase text-gray-900"
              >
                {cta}
              </Button>
            </a>
          </Container>
        </div>
      </div>
    </div>
  );
};

CTASection.displayName = 'CTASection';

export default CTASection;
