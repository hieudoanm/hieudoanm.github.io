import React from 'react';
import Container from '../../atoms/Container';

export type BannerProps = {
  children:
    | string
    | number
    | JSX.Element
    | Array<string | number | JSX.Element>;
};

const Banner: React.FC<BannerProps> = ({ children }) => {
  return (
    <div className={`bg-gray-900 text-white py-4`}>
      <Container>{children}</Container>
    </div>
  );
};

export default Banner;
