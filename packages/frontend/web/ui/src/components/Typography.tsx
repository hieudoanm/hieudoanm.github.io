import { FC } from 'react';

export const H1: FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id = '', className = '', children = <></> }) => {
  return (
    <h1 id={id} className={`text-4xl font-black ${className}`}>
      {children}
    </h1>
  );
};

export const H2: FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id = '', className = '', children = <></> }) => {
  return (
    <h2 id={id} className={`text-3xl font-extrabold ${className}`}>
      {children}
    </h2>
  );
};

export const H3: FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id = '', className = '', children = <></> }) => {
  return (
    <h3 id={id} className={`text-2xl font-bold ${className}`}>
      {children}
    </h3>
  );
};

export const H4: FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id = '', className = '', children = <></> }) => {
  return (
    <h4 id={id} className={`text-xl font-semibold ${className}`}>
      {children}
    </h4>
  );
};

export const H5: FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id = '', className = '', children = <></> }) => {
  return (
    <h5 id={id} className={`text-lg font-medium ${className}`}>
      {children}
    </h5>
  );
};

export const H6: FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id = '', className = '', children = <></> }) => {
  return (
    <h6 id={id} className={`text-base font-normal ${className}`}>
      {children}
    </h6>
  );
};

export const Paragraph: FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id = '', className = '', children = <></> }) => {
  return (
    <p id={id} className={`text-base font-normal ${className}`}>
      {children}
    </p>
  );
};
