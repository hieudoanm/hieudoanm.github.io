import React from 'react';
import Container from '@hieudoanm/components/Container';

const Footer: React.FC = () => {
  const year: number = new Date().getFullYear();
  return (
    <footer className="border-t bg-gray-900 p-8 text-white">
      <Container>
        <div className="block justify-between md:flex">
          <p>&copy; {year} Hieu Doan. All rights reserved</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
