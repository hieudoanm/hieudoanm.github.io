import hero from '@/assets/hero.png';
import wave from '@/assets/svg/wave.svg';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Image from 'next/image';

export const Hero: React.FC = () => {
  return (
    <section id="hero">
      <div className="pt-32">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="col-span-1">
              <div className="flex h-full items-center">
                <div className="flex w-full flex-col text-center md:text-left">
                  <p className="tracking-loose w-full uppercase">
                    What business are you?
                  </p>
                  <h1 className="my-4 text-5xl font-bold leading-tight">
                    Main Hero Message to sell yourself!
                  </h1>
                  <p className="mb-8 text-2xl leading-normal">
                    Sub-hero message, not too long and not too short. Make it
                    just right!
                  </p>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      '&:hover': {
                        backgroundColor: '#ffffff',
                        color: '#000000',
                      },
                    }}
                    className="mx-auto w-32 md:mx-0"
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <Image className="w-full" src={hero} alt="hero" />
            </div>
          </div>
        </Container>
      </div>
      <div>
        <Image src={wave} alt="wave" className="w-full" />
      </div>
    </section>
  );
};

export default Hero;
