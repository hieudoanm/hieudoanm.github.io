'use client';

import { Footer } from '@chess/shared/components/Footer';
import { Navbar } from '@chess/shared/components/Navbar';
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
                  <p>Something went wrong!</p>
                  <div>{error.message}</div>
                  <button
                    type="button"
                    className="btn bg-teal-500 text-white"
                    onClick={() => reset()}>
                    Reset
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
