import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Column {
  name: string;
  type: string;
  pk?: boolean;
}

interface Table {
  name: string;
  columns: Column[];
}

export const DatabaseSchema: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Database Schema';
  const tables = (data.tables as Table[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-4 text-center">
        <div className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
          Schema
        </div>
        {title && (
          <div className="text-base-content mt-1 text-sm font-bold">
            {title}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-wrap justify-center gap-3">
        {tables.map((table) => (
          <div
            key={table.name}
            className="border-base-300 w-[45%] min-w-[180px] rounded border">
            <div className="bg-primary/10 text-primary rounded-t px-3 py-1.5 text-xs font-bold">
              {table.name}
            </div>
            <div className="p-2">
              {table.columns.map((col) => (
                <div
                  key={col.name}
                  className="border-base-300 flex items-center justify-between border-t py-1">
                  <span className="text-base-content text-[10px]">
                    {col.pk && <span className="mr-1">&#128273;</span>}
                    {col.name}
                  </span>
                  <span className="text-neutral font-mono text-[9px]">
                    {col.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

DatabaseSchema.displayName = 'DatabaseSchema';
