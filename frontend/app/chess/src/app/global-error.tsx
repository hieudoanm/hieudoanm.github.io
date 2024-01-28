'use client';

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
              <div className="flex items-center">
                <div className="rounded border p-8 text-center">
                  <h1>Something went wrong!</h1>
                  <div>{error.message}</div>
                  <button type="button" onClick={() => reset()}>
                    Try again
                  </button>
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
