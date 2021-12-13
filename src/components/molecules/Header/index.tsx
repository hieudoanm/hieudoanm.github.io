import React from 'react';

export type HeaderProps = {
  align?: string | 'center' | 'left' | 'right';
  padding?: string;
  subtitle?: string;
  short?: string;
  className?: string;
  children:
    | string
    | number
    | JSX.Element
    | Array<string | number | JSX.Element>;
};

const Header: React.FC<HeaderProps> = ({
  align = 'center',
  padding = 'py-16',
  children = '',
  className = '',
  short = '',
  subtitle = ''
}: HeaderProps) => {
  const paddingTop: string = short === '' ? '' : 'mt-8';
  const paddingBottom: string = subtitle === '' ? '' : 'mb-8';
  return (
    <div className={`text-${align} ${padding} ${className}`}>
      {short && <p>{short}</p>}
      <h2 className={`uppercase text-4xl ${paddingTop} ${paddingBottom}`}>
        <b>{children}</b>
      </h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default Header;
