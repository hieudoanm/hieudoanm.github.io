import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';

export type ErrorRouteProps = { code?: number; title?: string };

export const ErrorTemplate: FC<ErrorRouteProps> = ({
  code = 500,
  title = 'Error',
}) => {
  return (
    <>
      <Head>
        <title>HIEU: {title}</title>
      </Head>
      <div className='flex h-screen w-screen items-center justify-center'>
        <div className='py-8 text-center'>
          <h2 className='mb-4 text-9xl'>{code}</h2>
          <p className='mb-4 text-2xl uppercase'>{title}</p>
          <p>
            <Link href='/'>
              <button className='btn' type='button'>
                Back to Home
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
