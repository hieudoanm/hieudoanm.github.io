import { FC } from 'react';

export const H1: FC<{ children: React.ReactNode }> = ({ children = <></> }) => {
  return <h1 className="text-4xl font-black">{children}</h1>;
};

export const H2: FC<{ children: React.ReactNode }> = ({ children = <></> }) => {
  return <h2 className="text-3xl font-extrabold">{children}</h2>;
};

export const H3: FC<{ children: React.ReactNode }> = ({ children = <></> }) => {
  return <h3 className="text-2xl font-bold">{children}</h3>;
};

export const H4: FC<{ children: React.ReactNode }> = ({ children = <></> }) => {
  return <h4 className="text-xl font-semibold">{children}</h4>;
};

export const H5: FC<{ children: React.ReactNode }> = ({ children = <></> }) => {
  return <h5 className="text-lg font-medium">{children}</h5>;
};

export const H6: FC<{ children: React.ReactNode }> = ({ children = <></> }) => {
  return <h6 className="text-base font-normal">{children}</h6>;
};

export const Paragraph: FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children = <></> }) => {
  return <p className={`text-base font-normal ${className}`}>{children}</p>;
};
