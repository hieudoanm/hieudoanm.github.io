import { FC } from 'react';

export const Nav: FC = () => (
  <div className="navbar bg-base-100/85 border-base-300 sticky top-0 z-50 min-h-[48px] border-b px-12 backdrop-blur-xl">
    <div className="navbar-start">
      <span className="text-primary font-serif text-lg font-bold tracking-widest">
        DaisyX
      </span>
    </div>
    <div className="navbar-center">
      <span className="text-base-content/40 text-xs">Theme Generator</span>
    </div>
    <div className="navbar-end">
      <span className="text-base-content/30 text-[10px]">v5.6</span>
    </div>
  </div>
);
Nav.displayName = 'Nav';
