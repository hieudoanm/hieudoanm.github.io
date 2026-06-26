import { FC } from 'react';
import { Section } from './Section';

export const DataSection: FC = () => {
  const bars = [
    { month: 'Jan', val: '$42k', pct: 58 },
    { month: 'Feb', val: '$55k', pct: 72 },
    { month: 'Mar', val: '$49k', pct: 65 },
    { month: 'Apr', val: '$78k', pct: 100, gold: true },
    { month: 'May', val: '$61k', pct: 80 },
    { month: 'Jun', val: '$70k', pct: 92 },
  ];
  const rows = [
    {
      name: 'Button',
      cat: 'Primitive',
      catBadge: 'badge-info',
      status: '● Stable',
      statusBadge: 'badge-success',
      ver: '2.4.0',
      checked: true,
    },
    {
      name: 'DataTable',
      cat: 'Data',
      catBadge: 'badge-warning',
      status: '● Stable',
      statusBadge: 'badge-success',
      ver: '2.3.1',
      checked: false,
    },
    {
      name: 'CommandMenu',
      cat: 'Navigation',
      catBadge: 'badge-neutral',
      status: '● Beta',
      statusBadge: 'badge-warning',
      ver: '0.9.2',
      checked: false,
    },
    {
      name: 'DateRangePicker',
      cat: 'Form',
      catBadge: 'badge-neutral',
      status: '● Deprecated',
      statusBadge: 'badge-error',
      ver: '1.8.0',
      checked: false,
    },
  ];
  return (
    <Section
      id="data"
      label="Data display"
      title="Make data legible"
      sub="Tables, charts, and lists that scale from a handful of records to millions — without sacrificing clarity.">
      <div className="card bg-base-200 border-base-300 mb-8 border">
        <div className="card-body p-7">
          <p className="mb-1 text-sm font-medium">Monthly revenue</p>
          <p className="text-base-content/40 mb-6 text-xs">Q1 · Q2 2026</p>
          <div className="relative flex h-36 items-end gap-2">
            <div className="bg-base-content/10 absolute right-0 bottom-7 left-0 h-px" />
            {bars.map(({ month, val, pct, gold }) => (
              <div
                key={month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <span className="text-base-content/30 text-[11px]">{val}</span>
                <div
                  className={`w-full cursor-pointer rounded-t opacity-85 transition-opacity hover:opacity-100 ${gold ? 'bg-primary' : 'bg-base-300'}`}
                  style={{ height: `${pct}%` }}
                />
                <span className="text-base-content/30 text-[11px]">
                  {month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-base-300 overflow-hidden rounded-2xl border">
        <table className="table-sm table w-full text-sm">
          <thead className="bg-base-300 text-base-content/40 text-xs tracking-wider uppercase">
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-xs"
                />
              </th>
              <th className="hover:text-primary cursor-pointer">Component ↑</th>
              <th className="hover:text-primary cursor-pointer">Category</th>
              <th>Status</th>
              <th className="hover:text-primary cursor-pointer">Version</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(
              ({ name, cat, catBadge, status, statusBadge, ver, checked }) => (
                <tr
                  key={name}
                  className="hover:bg-base-content/[0.02] border-base-300 border-t">
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={checked}
                      className="checkbox checkbox-primary checkbox-xs"
                    />
                  </td>
                  <td className="font-medium">{name}</td>
                  <td>
                    <span className={`badge ${catBadge} badge-sm`}>{cat}</span>
                  </td>
                  <td>
                    <span className={`badge ${statusBadge} badge-sm`}>
                      {status}
                    </span>
                  </td>
                  <td>
                    <span className="text-primary font-mono text-xs">
                      {ver}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs border-base-300 border">
                      View
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </Section>
  );
};
DataSection.displayName = 'DataSection';
