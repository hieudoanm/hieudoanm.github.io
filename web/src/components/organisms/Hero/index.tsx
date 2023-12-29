import React from 'react';
import Header from '../../molecules/Header';

export type HeroSectionProperties = {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
};

const HeroSection: React.FC<HeroSectionProperties> = ({
  id,
  title,
  subtitle,
  backgroundImage,
}) => {
  return (
    <div
      id={id}
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="h-full bg-gray-900/80 text-white">
        <div className="flex h-full items-center justify-center">
          <Header subtitle={subtitle}>{title}</Header>
        </div>
      </div>
    </div>
  );
};

HeroSection.displayName = 'HeroSection';
HeroSection.defaultProps = {};

export default HeroSection;
