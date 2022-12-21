import { Link } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>HIEU: Not Found</title>
      </Helmet>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-center py-8">
          <h2 className="text-9xl mb-4">404</h2>
          <p className="uppercase text-2xl mb-4">Page not found</p>
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
