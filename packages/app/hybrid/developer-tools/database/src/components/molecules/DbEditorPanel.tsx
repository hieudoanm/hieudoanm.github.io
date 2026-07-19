import type { FC } from 'react';
import { FiCpu, FiPlay, FiX } from 'react-icons/fi';

import { SqlEditor } from '@/components/molecules/SqlEditor';
import type { CompletionItem } from '@/utils/autocomplete';
import type { ResultTab } from '@/types/sqlite';

interface DbEditorPanelProps {
  sql: string;
  onSqlChange: (v: string) => void;
  errorLine: number | null;
  onRun: (arg?: string) => void;
  onSuggest: (text: string, cursor: number) => CompletionItem[];
  tabs: ResultTab[];
  activeTabId: string | null;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
}

export const DbEditorPanel: FC<DbEditorPanelProps> = ({
  sql,
  onSqlChange,
  errorLine,
  onRun,
  onSuggest,
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
}) => {
  return (
    <>
      <div className="border-base-300 border-b p-3">
        <SqlEditor
          value={sql}
          onChange={onSqlChange}
          onRun={onRun}
          placeholder="Enter SQL query..."
          rows={4}
          errorLine={errorLine}
          onSuggest={onSuggest}
        />
        <p className="text-base-content/40 mt-1 text-xs">
          Ctrl+Enter to run selection · Ctrl+Shift+Enter to format · Ctrl+/ to
          comment · Ctrl+Space to complete
        </p>
      </div>
      {tabs.length > 0 && (
        <div className="border-base-300 bg-base-200/60 flex flex-shrink-0 items-center gap-1 overflow-x-auto border-b px-2 py-1.5">
          {tabs.map((t) => (
            <div
              key={t.id}
              className={`flex flex-shrink-0 items-center gap-1.5 rounded-lg px-2 py-1 font-mono text-xs ${activeTabId === t.id ? 'bg-primary/10 text-primary border-primary/20 border' : 'text-base-content/50 border border-transparent'}`}>
              {t.explain ? (
                <FiCpu className="size-3" />
              ) : (
                <FiPlay className="size-3" />
              )}
              <button
                className="max-w-48 truncate"
                onClick={() => onSelectTab(t.id)}>
                {t.explain ? 'EXPLAIN ' : ''}
                {t.sql.replace(/\s+/g, ' ')}
              </button>
              <button
                type="button"
                aria-label={`Close tab ${t.sql}`}
                onClick={() => onCloseTab(t.id)}
                className="text-base-content/30 hover:text-error">
                <FiX className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
