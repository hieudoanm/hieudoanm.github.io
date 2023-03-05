import React from 'react';

export type CardProps = {
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="p-8">{children}</div>;
};

export default Card;
