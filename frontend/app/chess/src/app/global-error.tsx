'use client';

import { Button } from '@chakra-ui/react';
import { Footer } from '@chess/components/atoms/Footer';
import { Navbar } from '@chess/components/atoms/Navbar';
import { Providers } from './providers';

const GlobalError: React.FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex h-screen flex-col">
            <Navbar />
            <div className="grow">
              <div className="flex h-full items-center justify-center shadow">
                <div className="rounded border p-8 text-center">
                  <h1>Something went wrong!</h1>
                  <div>{error.message}</div>
                  <Button
                    type="button"
                    colorScheme="teal"
                    onClick={() => reset()}>
                    Reset
                  </Button>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default GlobalError;
