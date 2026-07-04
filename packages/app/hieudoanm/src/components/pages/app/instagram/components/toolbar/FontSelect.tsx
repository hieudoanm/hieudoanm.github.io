import type { FC } from 'react';

const FONT_GROUPS: Record<string, string[]> = {
  'Sans-serif': [
    'Inter',
    'Roboto',
    'Montserrat',
    'Open Sans',
    'Poppins',
    'Raleway',
    'DM Sans',
    'Nunito',
  ],
  Serif: ['Lora', 'Playfair Display', 'Merriweather'],
  Display: ['Oswald'],
};

export const FontSelect: FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => (
  <label className="flex flex-col gap-1">
    <span className="text-neutral text-center text-xs font-semibold tracking-widest uppercase">
      Font
    </span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-box border-base-300 bg-base-200 text-neutral hover:border-neutral hover:text-base-content cursor-pointer border px-3 py-1.5 text-xs font-medium tracking-wider transition-all duration-200">
      {Object.entries(FONT_GROUPS).map(([group, fonts]) => (
        <optgroup key={group} label={group}>
          {fonts.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  </label>
);
