import React, { ReactNode } from 'react';

const Description: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <p className="mx-auto mb-8 max-w-xl text-center leading-8 text-gray-800 dark:text-gray-200">
      {children}
    </p>
  );
};

export default Description;
