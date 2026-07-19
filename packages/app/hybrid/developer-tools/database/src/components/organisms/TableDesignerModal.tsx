import { useState, type FC } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

import type { SqliteTableMeta } from '@/types/sqlite';
import {
  buildCreateTableSQL,
  emptyDesignColumn,
  TYPE_OPTIONS,
  type DesignColumn,
  type TableDesign,
} from '@/utils/schema';

interface TableDesignerModalProps {
  tableName: string | null;
  initialDesign: TableDesign | null;
  tables: SqliteTableMeta[];
  onSave: (name: string, columns: DesignColumn[]) => void;
  onClose: () => void;
}

const FieldLabel: FC<{ children: string }> = ({ children }) => (
  <span className="text-base-content/40 text-[10px] font-normal tracking-wider uppercase">
    {children}
  </span>
);

export const TableDesignerModal: FC<TableDesignerModalProps> = ({
  tableName,
  initialDesign,
  tables,
  onSave,
  onClose,
}) => {
  const isEdit = tableName !== null;
  const [name, setName] = useState(tableName ?? '');
  const [columns, setColumns] = useState<DesignColumn[]>(
    initialDesign?.columns.length
      ? initialDesign.columns
      : [emptyDesignColumn()]
  );

  const update = (idx: number, patch: Partial<DesignColumn>) => {
    setColumns((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, ...patch } : c))
    );
  };

  const remove = (idx: number) => {
    setColumns((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev
    );
  };

  const addColumn = () => setColumns((prev) => [...prev, emptyDesignColumn()]);

  const fkColumns = (fkTable: string): string[] =>
    tables.find((t) => t.name === fkTable)?.columns.map((c) => c.name) ?? [];

  const validColumns = columns.filter((c) => c.name.trim() !== '');
  const preview = buildCreateTableSQL(name.trim() || 'new_table', validColumns);

  const handleSave = () => {
    if (!name.trim()) return;
    const cleaned = validColumns.map((c) => ({
      ...c,
      name: c.name.trim(),
      fkTable: c.fkTable.trim(),
      fkColumn: c.fkColumn.trim(),
      defaultValue: c.defaultValue.trim(),
    }));
    if (cleaned.length === 0) return;
    onSave(name.trim(), cleaned);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}>
      <div
        className="bg-base-100 border-base-300 flex max-h-[90vh] w-full max-w-5xl flex-col rounded-2xl border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="border-base-300 flex flex-shrink-0 items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="text-base-content font-normal tracking-tight">
              {isEdit ? (
                <>
                  Edit table{' '}
                  <span className="text-primary font-mono">{tableName}</span>
                </>
              ) : (
                'New table'
              )}
            </span>
          </div>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
            <FiX className="size-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-auto px-5 py-4">
          <div className="max-w-sm">
            <FieldLabel>Table name</FieldLabel>
            <input
              type="text"
              value={name}
              disabled={isEdit}
              placeholder="e.g. invoices"
              className="input input-bordered input-sm w-full disabled:opacity-50"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <FieldLabel>Columns</FieldLabel>
              <button
                className="btn btn-ghost btn-xs gap-1"
                onClick={addColumn}>
                <FiPlus className="size-3" /> Add column
              </button>
            </div>
            <div className="overflow-x-auto rounded-xl border">
              <table className="table-xs table w-full">
                <thead>
                  <tr className="bg-base-200 text-base-content/40 text-[10px] tracking-wider uppercase">
                    <th>Name</th>
                    <th>Type</th>
                    <th className="text-center">PK</th>
                    <th className="text-center">NOT NULL</th>
                    <th className="text-center">UNIQUE</th>
                    <th>Default</th>
                    <th>FK table</th>
                    <th>FK column</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {columns.map((c, i) => (
                    <tr
                      key={i}
                      className="border-base-300/40 border-b align-middle">
                      <td>
                        <input
                          type="text"
                          value={c.name}
                          placeholder="column"
                          className="input input-bordered input-xs w-36 font-mono"
                          onChange={(e) => update(i, { name: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          list="designer-type-options"
                          value={c.type}
                          className="input input-bordered input-xs w-28 font-mono"
                          onChange={(e) => update(i, { type: e.target.value })}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={c.primaryKey}
                          onChange={(e) =>
                            update(i, { primaryKey: e.target.checked })
                          }
                        />
                      </td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={!c.nullable}
                          onChange={(e) =>
                            update(i, { nullable: !e.target.checked })
                          }
                        />
                      </td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={c.unique}
                          onChange={(e) =>
                            update(i, { unique: e.target.checked })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={c.defaultValue}
                          placeholder="NULL"
                          className="input input-bordered input-xs w-24 font-mono"
                          onChange={(e) =>
                            update(i, { defaultValue: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <select
                          value={c.fkTable}
                          className="select select-bordered select-xs w-28"
                          onChange={(e) =>
                            update(i, { fkTable: e.target.value, fkColumn: '' })
                          }>
                          <option value="">—</option>
                          {tables.map((t) => (
                            <option key={t.name} value={t.name}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          list={`fk-cols-${i}`}
                          value={c.fkColumn}
                          disabled={!c.fkTable}
                          placeholder="FK col"
                          className="input input-bordered input-xs w-24 font-mono disabled:opacity-40"
                          onChange={(e) =>
                            update(i, { fkColumn: e.target.value })
                          }
                        />
                        <datalist id={`fk-cols-${i}`}>
                          {fkColumns(c.fkTable).map((col) => (
                            <option key={col} value={col} />
                          ))}
                        </datalist>
                      </td>
                      <td>
                        <button
                          className="btn btn-ghost btn-xs text-base-content/40 hover:text-error"
                          disabled={columns.length <= 1}
                          onClick={() => remove(i)}>
                          <FiX className="size-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <datalist id="designer-type-options">
              {TYPE_OPTIONS.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </div>

          <div>
            <FieldLabel>CREATE TABLE preview</FieldLabel>
            <pre className="bg-base-200 border-base-300 mt-1 max-h-48 overflow-auto rounded-lg border p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap">
              {preview}
            </pre>
          </div>
        </div>

        <div className="border-base-300 flex flex-shrink-0 items-center gap-2 border-t px-5 py-4">
          <span className="text-base-content/30 font-mono text-xs">
            {validColumns.length} column{validColumns.length !== 1 ? 's' : ''}
          </span>
          <button className="btn btn-ghost btn-sm ml-auto" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary btn-sm"
            disabled={!name.trim() || validColumns.length === 0}
            onClick={handleSave}>
            {isEdit ? 'Apply changes' : 'Create table'}
          </button>
        </div>
      </div>
    </div>
  );
};
TableDesignerModal.displayName = 'TableDesignerModal';
