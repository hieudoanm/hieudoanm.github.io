import React from 'react';
import Container from '../../atoms/Container';

const Footer: React.FC = () => {
  const year: number = new Date().getFullYear();
  return (
    <footer className="border-t p-8 bg-gray-900 text-white">
      <Container>
        <div className="block md:flex justify-between">
          <p>&copy; {year} Hieu Doan. All rights reserved</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
