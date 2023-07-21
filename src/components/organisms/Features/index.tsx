import React from 'react';
import Container from '../../atoms/Container';
import Header from '../../molecules/Header';

export type Feature = {
  id: string;
  image: string;
  placeholder: string;
  title: string;
  description: string;
};

export type FeaturesSectionProperties = {
  id: string;
  title: string;
  subtitle: string;
  features: Feature[];
};

const FeaturesSection: React.FC<FeaturesSectionProperties> = ({
  id: sectionId,
  title: sectionTitle,
  subtitle,
  features,
}) => {
  return (
    <div id={sectionId} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{sectionTitle}</Header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ id, placeholder, title, description }: Feature) => {
            return (
              <div key={`feature-${id}`}>
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
