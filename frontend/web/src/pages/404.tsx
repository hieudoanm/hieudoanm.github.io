import { NextPage } from 'next';
import Link from 'next/link';
import { Helmet } from 'react-helmet';

export const NotFoundPage: NextPage = () => {
  return (
    <>
      <Helmet>
        <title>HIEU: Not Found</title>
      </Helmet>
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
