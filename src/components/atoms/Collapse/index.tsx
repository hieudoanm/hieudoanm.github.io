import React from 'react';

export type CollapseProps = {
  active?: boolean;
  className?: string;
  children:
    | string
    | number
    | JSX.Element
    | Array<string | number | JSX.Element>;
};

const Collapse: React.FC<CollapseProps> = ({
  active,
  children,
  className
}: CollapseProps) => {
  return (
    <div
      style={{ transition: 'all 1s linear' }}
      className={[className, active ? 'h-fit' : 'h-0 overflow-hidden'].join(
        ' '
      )}
    >
      {children}
    </div>
  );
};

Collapse.displayName = 'Collapse';
Collapse.defaultProps = {
  active: false,
  className: ''
};

export default Collapse;
