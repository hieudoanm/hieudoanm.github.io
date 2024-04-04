import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

export const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>HIEU: Not Found</title>
      </Head>
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="py-8 text-center">
          <h2 className="mb-4 text-9xl">404</h2>
          <p className="mb-4 text-2xl uppercase">Page not found</p>
          <p>
            <Link href="/" className="uppercase underline">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
