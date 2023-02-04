import waveTop from '@/assets/svg/wave-top.svg';
import Heading from '@/components/atoms/Heading';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Image from 'next/image';

const CTA: React.FC = () => {
  return (
    <section id="cta">
      <Image src={waveTop} alt="wave-top" className="w-full" />
      <Container>
        <div className="pb-16 md:pb-32">
          <Heading className="text-white">Call To Action</Heading>
          <h2 className="mb-8 text-center text-3xl leading-tight">
            Main Hero Message to sell yourself!
          </h2>
          <div className="flex">
            <Button
              variant="contained"
              size="large"
              className="mx-auto"
              sx={{
                backgroundColor: '#ffffff',
                color: '#000000',
                '&:hover': {
                  backgroundColor: '#ffffff',
                  color: '#000000',
                },
              }}
            >
              Download
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
