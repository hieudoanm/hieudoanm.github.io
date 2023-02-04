import connectedWorld from '@/assets/svg/connected-world.svg';
import travelBooking from '@/assets/svg/travel-booking.svg';
import Heading from '@/components/atoms/Heading';
import Container from '@mui/material/Container';
import Image from 'next/image';

export const Services: React.FC = () => {
  return (
    <section id="services" className="bg-white py-8 md:py-16">
      <Container>
        <Heading gradient className="text-gray-900">
          Services
        </Heading>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="order-2 col-span-1 md:order-1">
              <div className="flex h-full items-center">
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Lorem ipsum dolor sit amet
                  </h2>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 col-span-1 md:order-2">
              <Image
                src={travelBooking}
                alt="travel booking"
                className="mx-auto w-full sm:h-64"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="col-span-1">
              <Image
                src={connectedWorld}
                alt="connected-world"
                className="mx-auto w-5/6 sm:h-64"
              />
            </div>
            <div className="col-span-1">
              <div className="flex h-full items-center">
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Lorem ipsum dolor sit amet
                  </h2>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Services;
