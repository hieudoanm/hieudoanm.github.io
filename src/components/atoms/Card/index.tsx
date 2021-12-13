import React from 'react';

export type CardProps = {
  children:
    | string
    | number
    | JSX.Element
    | Array<string | number | JSX.Element>;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="p-8">{children}</div>;
};

export default Card;
