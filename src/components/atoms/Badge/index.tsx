import React from 'react';

export type BadgeProps = {
  bgColor:
    | 'bg-red-900'
    | 'bg-blue-900'
    | 'bg-yellow-900'
    | 'bg-green-900'
    | 'bg-purple-900'
    | 'bg-indigo-900'
    | 'bg-pink-900'
    | 'bg-gray-900';
  className: string;
};

const Badge: React.FC<BadgeProps> = ({
  bgColor = 'bg-blue-500',
  className = '',
  children,
}) => {
  return (
    <span
      className={`${className} ${bgColor} px-2 py-1 rounded text-white font-semibold text-xs`}
    >
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';
Badge.defaultProps = {};

export default Badge;
