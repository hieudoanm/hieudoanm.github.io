import { ChangeEvent, FC } from 'react';

export const SearchInput: FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => (
  <input
    className="input input-bordered input-xs w-full"
    placeholder="Search country, CCA2, CCA3…"
    value={value}
    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
  />
);
SearchInput.displayName = 'SearchInput';
