import { Container } from '@hieudoanm/components/Container';
import type React from 'react';

export type BannerProperties = {
  children: React.ReactNode;
};

export const Banner: React.FC<BannerProperties> = ({ children }) => {
  return (
    <div className='bg-gray-900 py-4 text-white'>
      <Container>{children}</Container>
    </div>
  );
};
