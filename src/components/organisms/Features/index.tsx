import React from 'react';
import uuid from '../../../utils/uuid';
import Container from '../../atoms/Container';
import Header from '../../molecules/Header';

export type Feature = {
  image: string;
  placeholder: string;
  title: string;
  description: string;
};

export type FeaturesSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  features: Array<Feature>;
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  id,
  title,
  subtitle,
  features,
}) => {
  return (
    <div id={id} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{title}</Header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ placeholder, title, description }: Feature) => {
            return (
              <div key={uuid()}>
                <div className="w-32 h-32 mx-auto relative mb-8">
                  <div className="absolute w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-white text-4xl">
                    {placeholder}
                  </div>
                </div>
                <h3 className="text-center text-xl uppercase mb-8">{title}</h3>
                <p className="text-justify">{description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default FeaturesSection;
