import Container from '@mui/material/Container';
import React from 'react';
import background from '../../../assets/images/background/quote.jpg';

const Quote: React.FC = () => {
  return (
    <div
      className="bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="bg-gray-900/75 py-32">
        <Container className="font-spirax text-center text-white">
          <h1 className="mb-8 text-4xl">
            Shoot for the moon. Even if you miss, you&apos;ll land among the
            stars
          </h1>
          <p className="text-xl">- Internet -</p>
        </Container>
      </div>
    </div>
  );
};

export default Quote;
