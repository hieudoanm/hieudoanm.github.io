import React from 'react';
import Button from '../../atoms/Button';
import Container from '../../atoms/Container';
import Header from '../../molecules/Header';

export type CTASectionProps = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  backgroundImage: string;
};

const CTASection: React.FC<CTASectionProps> = ({
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
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-gray-900 bg-opacity-80 pb-16">
          <Container>
            <Header subtitle={subtitle} className="text-white">
              {title}
            </Header>
            <a href="mailto:hieumdoan@gmail.com">
              <Button
                bg="bg-white"
                color="text-gray-900"
                size="xl"
                className="block mx-auto uppercase"
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
