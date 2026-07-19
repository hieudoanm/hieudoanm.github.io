interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <input
    type="text"
    placeholder="Search tournaments..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="input input-bordered mb-4 w-full"
  />
);
