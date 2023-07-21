import React from 'react';
import Container from '../../atoms/Container';

export type BannerProperties = {
  children: React.ReactNode;
};

const Banner: React.FC<BannerProperties> = ({ children }) => {
  return (
    <div className={`bg-gray-900 text-white py-4`}>
      <Container>{children}</Container>
    </div>
  );
};

export default Banner;
