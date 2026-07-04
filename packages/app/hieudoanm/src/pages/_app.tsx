import { HeadTemplate } from '@hieudoanm.github.io/components/templates/shared/HeadTemplate';
import '@hieudoanm.github.io/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Be_Vietnam_Pro } from 'next/font/google';
import { FC } from 'react';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-be-vietnam-pro',
});

const queryClient = new QueryClient();

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <HeadTemplate basic={{ title: 'Hieu Doan' }} />
      <QueryClientProvider client={queryClient}>
        <div className={beVietnamPro.className}>
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
