import React, { ReactNode } from 'react';

const Heading: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <h1 className="mb-8 text-center text-2xl capitalize dark:text-white md:text-3xl lg:text-4xl">
      {children}
    </h1>
  );
};

export default Heading;
