import { FC } from 'react';

import { CellVal } from '../types';

export const CellValue: FC<{ value: CellVal }> = ({ value }) => {
  if (value === null)
    return <span className="text-base-content/30 text-xs italic">NULL</span>;
  if (value instanceof Uint8Array)
    return (
      <span className="text-warning/70 text-xs italic">
        [BLOB {value.length}B]
      </span>
    );
  if (typeof value === 'number')
    return <span className="text-primary font-mono">{value}</span>;
  const s = String(value);
  if (s === '1' || s.toLowerCase() === 'true')
    return <span className="text-success font-mono text-xs">{s}</span>;
  if (s === '0' || s.toLowerCase() === 'false')
    return <span className="text-error font-mono text-xs">{s}</span>;
  return (
    <span className="font-mono text-xs">
      {s.length > 80 ? s.slice(0, 80) + '…' : s}
    </span>
  );
};
CellValue.displayName = 'CellValue';
