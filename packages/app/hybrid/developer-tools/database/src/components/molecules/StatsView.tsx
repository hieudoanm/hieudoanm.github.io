'use client';

import { useMemo, type FC } from 'react';

import type { SqliteDatabase } from '@/types/sqlite';
import { formatBytes, formatNumber } from '@/utils/sqlExport';
import {
  computeDatabaseStats,
  computeMockIndexUsage,
  type IndexUsageStat,
  type TableStat,
} from '@/utils/stats';

interface StatsViewProps {
  dbInstance: SqliteDatabase;
}

const BAR_COLORS = [
  'bg-indigo-500',
  'bg-sky-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-violet-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-cyan-500',
  'bg-fuchsia-500',
];

const FieldLabel: FC<{ children: string }> = ({ children }) => (
  <span className="text-base-content/40 text-[10px] font-normal tracking-wider uppercase">
    {children}
  </span>
);

const StatCard: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="border-base-300 bg-base-200/40 rounded-xl border px-4 py-3">
    <p className="text-base-content/40 text-[10px] tracking-wider uppercase">
      {label}
    </p>
    <p className="mt-0.5 font-mono text-lg">{value}</p>
  </div>
);

export const StatsView: FC<StatsViewProps> = ({ dbInstance }) => {
  const stats = useMemo(() => computeDatabaseStats(dbInstance), [dbInstance]);
  const indexUsage = useMemo(
    () => computeMockIndexUsage(dbInstance),
    [dbInstance]
  );

  const tableBytes = stats.tables.reduce((sum, t) => sum + t.approxBytes, 0);
  const rows = stats.tables.reduce((sum, t) => sum + t.rowCount, 0);
  const maxIndexScans = Math.max(1, ...indexUsage.map((u) => u.scans));
  const maxTableBytes = Math.max(1, ...stats.tables.map((t) => t.approxBytes));

  const tableBar = (t: TableStat): number =>
    tableBytes > 0 ? (t.approxBytes / tableBytes) * 100 : 0;

  const sortedTables = [...stats.tables].sort(
    (a, b) => b.approxBytes - a.approxBytes
  );

  return (
    <div className="h-full space-y-6 overflow-y-auto p-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Tables" value={formatNumber(stats.tableCount)} />
        <StatCard label="Rows" value={formatNumber(rows)} />
        <StatCard label="Indexes" value={formatNumber(stats.indexCount)} />
        <StatCard label="Database size" value={formatBytes(stats.totalBytes)} />
      </div>

      <section>
        <div className="mb-2 flex items-baseline justify-between">
          <FieldLabel>Storage breakdown</FieldLabel>
          <span className="text-base-content/30 font-mono text-[11px]">
            {formatBytes(tableBytes)} in table data
          </span>
        </div>
        {sortedTables.length === 0 ? (
          <p className="text-base-content/40 text-xs italic">No tables</p>
        ) : (
          <>
            <div className="flex h-3 w-full gap-px overflow-hidden rounded-full">
              {sortedTables.map((t, i) => (
                <div
                  key={t.name}
                  title={`${t.name}: ${formatBytes(t.approxBytes)}`}
                  className={`${BAR_COLORS[i % BAR_COLORS.length]} h-full`}
                  style={{ width: `${tableBar(t)}%` }}
                />
              ))}
            </div>
            <ul className="mt-3 space-y-2">
              {sortedTables.map((t, i) => (
                <li
                  key={t.name}
                  className="flex items-center gap-3 font-mono text-xs">
                  <span
                    className={`${BAR_COLORS[i % BAR_COLORS.length]} h-2.5 w-2.5 flex-shrink-0 rounded-sm`}
                  />
                  <span className="text-base-content/80 w-40 truncate">
                    {t.name}
                  </span>
                  <div className="bg-base-200 h-1.5 min-w-16 flex-1 overflow-hidden rounded-full">
                    <div
                      className="bg-primary/70 h-full rounded-full"
                      style={{
                        width: `${(t.approxBytes / maxTableBytes) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="w-16 text-right">
                    {formatBytes(t.approxBytes)}
                  </span>
                  <span className="text-base-content/30 w-24 text-right">
                    {formatNumber(t.rowCount)} rows
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section>
        <div className="mb-2">
          <FieldLabel>Tables</FieldLabel>
        </div>
        <div className="overflow-x-auto rounded-xl border">
          <table className="table-xs table w-full">
            <thead>
              <tr className="bg-base-200 text-base-content/40 text-[10px] tracking-wider uppercase">
                <th>Table</th>
                <th className="text-right">Rows</th>
                <th className="text-right">Est. size</th>
                <th className="text-right">Indexes</th>
              </tr>
            </thead>
            <tbody>
              {stats.tables.map((t) => (
                <tr key={t.name} className="border-base-300/40 border-b">
                  <td className="font-mono">{t.name}</td>
                  <td className="text-right font-mono">
                    {formatNumber(t.rowCount)}
                  </td>
                  <td className="text-right font-mono">
                    {formatBytes(t.approxBytes)}
                  </td>
                  <td className="text-right font-mono">{t.indexCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-baseline justify-between">
          <FieldLabel>Index usage</FieldLabel>
          <span className="text-base-content/30 text-[11px] italic">
            mock statistics
          </span>
        </div>
        <div className="overflow-x-auto rounded-xl border">
          <table className="table-xs table w-full">
            <thead>
              <tr className="bg-base-200 text-base-content/40 text-[10px] tracking-wider uppercase">
                <th>Index</th>
                <th className="text-right">Scans</th>
                <th className="text-right">Writes</th>
                <th className="w-48">Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {indexUsage.map((u: IndexUsageStat) => (
                <tr
                  key={`${u.table}.${u.name}`}
                  className="border-base-300/40 border-b">
                  <td className="font-mono">
                    <span className="text-base-content/50">{u.table}.</span>
                    {u.name}
                  </td>
                  <td className="text-right font-mono">
                    {formatNumber(u.scans)}
                  </td>
                  <td className="text-right font-mono">
                    {formatNumber(u.writes)}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="bg-base-200 h-1.5 flex-1 overflow-hidden rounded-full">
                        <div
                          className="h-full rounded-full bg-emerald-500/80"
                          style={{
                            width: `${(u.scans / maxIndexScans) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-mono text-[11px]">
                        {u.efficiency}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {indexUsage.length === 0 && (
                <tr>
                  <td
                    className="text-base-content/40 py-4 text-center italic"
                    colSpan={4}>
                    No indexes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
StatsView.displayName = 'StatsView';
