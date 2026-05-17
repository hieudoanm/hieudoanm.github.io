const THEMES = [
  { name: 'luxury', label: 'Luxury' },
  { name: 'nothing', label: 'Nothing' },
  { name: 'light', label: 'Light' },
  { name: 'dark', label: 'Dark' },
];

import { FC } from 'react';

export const Nav: FC<{
  theme?: string;
  onThemeChange?: (t: string) => void;
}> = ({ theme = 'luxury', onThemeChange }) => {
  return (
    <div className="navbar bg-base-100/85 border-base-300 sticky top-0 z-50 min-h-[60px] border-b px-12 backdrop-blur-xl">
      <div className="navbar-start">
        <span className="text-primary font-serif text-2xl font-bold tracking-widest">
          DaisyX
        </span>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-base-content/60 gap-2 px-1 text-sm">
          {[
            'Components',
            'Forms',
            'Feedback',
            'Navigation',
            'Cards',
            'Containers',
            'Data',
            'Pricing',
            'Extra',
          ].map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="hover:text-base-content">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <select
          className="select select-bordered select-xs w-32"
          aria-label="Theme"
          value={theme}
          onChange={(e) => onThemeChange?.(e.target.value)}>
          {THEMES.map((t) => (
            <option key={t.name} value={t.name}>
              {t.label}
            </option>
          ))}
        </select>
        <label
          htmlFor="google-signin-modal"
          className="btn btn-ghost btn-sm cursor-pointer">
          Sign in
        </label>
        <button className="btn btn-primary btn-sm">Get started</button>
      </div>
    </div>
  );
};
Nav.displayName = 'Nav';
