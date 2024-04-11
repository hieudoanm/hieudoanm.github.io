import type React from 'react';

export type HeaderProperties = {
  align?: string | 'center' | 'left' | 'right';
  padding?: string;
  subtitle?: string;
  short?: string;
  className?: string;
  children: React.ReactNode;
};

export const Header: React.FC<HeaderProperties> = ({
  align = 'center',
  padding = 'py-16',
  children = '',
  className = '',
  short = '',
  subtitle = '',
}) => {
  const paddingTop: string = short === '' ? '' : 'mt-8';
  const paddingBottom: string = subtitle === '' ? '' : 'mb-8';
  return (
    <div className={`text-${align} ${padding} ${className}`}>
      {short && <p>{short}</p>}
      <h2 className={`text-4xl uppercase ${paddingTop} ${paddingBottom}`}>
        <b>{children}</b>
      </h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};
