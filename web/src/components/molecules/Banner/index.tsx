import React from 'react';
import Container from '../../atoms/Container';

export type BannerProperties = {
  children: React.ReactNode;
};

const Banner: React.FC<BannerProperties> = ({ children }) => {
  return (
    <div className={`bg-gray-900 py-4 text-white`}>
      <Container>{children}</Container>
    </div>
  );
};

export default Banner;
