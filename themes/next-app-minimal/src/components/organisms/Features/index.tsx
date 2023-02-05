import Feature, { FeatureProps } from '@/components/molecules/Feature';
import Container from '@mui/material/Container';
import React from 'react';

type FeaturesProps = {
  title: string;
  description: string;
  features: FeatureProps[];
};

export const Features: React.FC<FeaturesProps> = ({
  title = '',
  description = '',
  features = [],
}) => (
  <section id="features" className="py-8 md:py-16">
    <Container>
      <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        <p className="text-xl md:px-20">{description}</p>
      </div>
      <div className="pt-8">
        {features.map((feature, index) => {
          return (
            <Feature
              id={feature.id}
              key={feature.id}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              imageAlt={feature.imageAlt}
              reverse={index % 2 === 1}
            />
          );
        })}
      </div>
    </Container>
  </section>
);

export default Features;
