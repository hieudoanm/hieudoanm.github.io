'use client';

import { type FC } from 'react';

interface ResponseHeadersTableProps {
  headers: Record<string, string>;
}

export const ResponseHeadersTable: FC<ResponseHeadersTableProps> = ({
  headers,
}) => {
  const headerEntries = Object.entries(headers);
  return (
    <div className="overflow-x-auto">
      <table className="table-zebra table-xs table">
        <thead>
          <tr>
            <th>Header</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {headerEntries.map(([key, value]) => (
            <tr key={key}>
              <td className="font-mono">{key}</td>
              <td className="font-mono break-all">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ResponseHeadersTable.displayName = 'ResponseHeadersTable';
