import { Container } from '@hieudoanm/components/Container';
import { Header } from '@hieudoanm/components/Header';
import type React from 'react';

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

export const FeaturesSection: React.FC<FeaturesSectionProperties> = ({
  id: sectionId,
  title: sectionTitle,
  subtitle,
  features,
}) => {
  return (
    <div id={sectionId} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{sectionTitle}</Header>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ id, placeholder, title, description }: Feature) => {
            return (
              <div key={`feature-${id}`}>
                <div className="relative mx-auto mb-8 h-32 w-32">
                  <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-gray-900 text-4xl text-white">
                    {placeholder}
                  </div>
                </div>
                <h3 className="mb-8 text-center text-xl uppercase">{title}</h3>
                <p className="text-justify">{description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

FeaturesSection.displayName = 'FeaturesSection';
