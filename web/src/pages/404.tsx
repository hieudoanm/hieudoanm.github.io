import { Link } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

const NotFoundPage: React.FC = () => {
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
            <Link to="/" className="uppercase underline">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

NotFoundPage.displayName = 'NotFoundPage';

export default NotFoundPage;
