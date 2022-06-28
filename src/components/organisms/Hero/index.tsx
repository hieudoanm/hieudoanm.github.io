import React from 'react';
import Header from '../../molecules/Header';

export type HeroSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
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
      <div className="h-full bg-opacity-80 bg-gray-900 text-white">
        <div className="h-full flex items-center justify-center">
          <Header subtitle={subtitle}>{title}</Header>
        </div>
      </div>
    </div>
  );
};

HeroSection.displayName = 'HeroSection';
HeroSection.defaultProps = {};

export default HeroSection;
