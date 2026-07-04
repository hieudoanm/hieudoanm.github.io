import type { FC } from 'react';

export const SearchBar: FC<{
  username: string;
  onUsernameChange: (value: string) => void;
  onSearch: () => void;
  searching: boolean;
  dbLoading: boolean;
  dbError: Error | null;
  searchError: string | null;
}> = ({
  username,
  onUsernameChange,
  onSearch,
  searching,
  dbLoading,
  dbError,
  searchError,
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex gap-2">
      <input
        type="text"
        className="input input-bordered input-sm w-64 font-mono"
        placeholder="chess.com username"
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        disabled={dbLoading || searching}
      />
      <button
        className="btn btn-primary btn-sm"
        onClick={onSearch}
        disabled={dbLoading || searching || !username.trim()}>
        {searching ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          'Compare'
        )}
      </button>
    </div>
    {dbLoading && (
      <p className="text-base-content/40 text-xs">Loading database\u2026</p>
    )}
    {dbError && (
      <p className="text-error text-xs">DB error: {dbError.message}</p>
    )}
    {searchError && <p className="text-error text-xs">{searchError}</p>}
  </div>
);
