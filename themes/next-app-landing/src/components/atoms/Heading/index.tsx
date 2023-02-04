import { ReactNode } from 'react';

const Heading: React.FC<{
  gradient?: boolean;
  children?: ReactNode;
  className?: string;
}> = ({ children = <></>, className = '', gradient = false }) => {
  return (
    <div className="mb-8 flex flex-col items-center justify-center">
      <h1
        className={`mb-2 w-full text-center text-5xl font-bold leading-tight text-white ${className}`}
      >
        {children}
      </h1>
      <div className="w-full">
        <div
          className={`${
            gradient ? 'gradient' : 'bg-white'
          } mx-auto h-1 w-64 rounded-t bg-white py-0 opacity-25`}
        />
      </div>
    </div>
  );
};

export default Heading;
