import { Button } from '@chakra-ui/react';
import Container from '@hieudoanm/components/Container';
import Header from '@hieudoanm/components/Header';
import React from 'react';

export type CallToActionSectionProperties = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  backgroundImage: string;
};

const CallToActionSection: React.FC<CallToActionSectionProperties> = ({
  id,
  title,
  subtitle,
  cta,
  backgroundImage,
}) => {
  return (
    <div className="py-16">
      <div
        id={id}
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="bg-gray-900/80 pb-16">
          <Container>
            <Header subtitle={subtitle} className="text-white">
              {title}
            </Header>
            <a href="mailto:hieumdoan@gmail.com">
              <Button
                size="xl"
                className="mx-auto block bg-white uppercase text-gray-900">
                {cta}
              </Button>
            </a>
          </Container>
        </div>
      </div>
    </div>
  );
};

CallToActionSection.displayName = 'CallToActionSection';

export default CallToActionSection;
