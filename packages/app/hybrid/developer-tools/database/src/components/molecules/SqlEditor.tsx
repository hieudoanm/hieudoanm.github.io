import {
  memo,
  useMemo,
  useRef,
  useState,
  type FC,
  type KeyboardEvent,
} from 'react';

import { highlightSql } from '@/utils/sqlHighlight';
import {
  replaceWord,
  wordAtCursor,
  type CompletionItem,
} from '@/utils/autocomplete';

interface SqlEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun: (sql: string) => void;
  placeholder?: string;
  rows?: number;
  errorLine?: number | null;
  onSuggest?: (text: string, cursor: number) => CompletionItem[];
}

export const SqlEditor: FC<SqlEditorProps> = memo(
  ({ value, onChange, onRun, placeholder, rows = 4, errorLine, onSuggest }) => {
    const preRef = useRef<HTMLPreElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const gutterRef = useRef<HTMLPreElement>(null);
    const [suggestions, setSuggestions] = useState<CompletionItem[]>([]);
    const [activeIdx, setActiveIdx] = useState(0);
    const [completionOpen, setCompletionOpen] = useState(false);

    const lineCount = useMemo(() => value.split('\n').length, [value]);
    const gutterHtml = useMemo(
      () =>
        Array.from({ length: lineCount }, (_, i) => i + 1)
          .map((n) =>
            errorLine === n
              ? `<span class="text-error font-bold">${n}</span>`
              : String(n)
          )
          .join('\n'),
      [lineCount, errorLine]
    );

    const syncScroll = () => {
      if (!preRef.current || !textareaRef.current || !gutterRef.current) return;
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    };

    const runSelected = () => {
      const ta = textareaRef.current;
      let sqlToRun = value;
      if (ta && ta.selectionStart !== ta.selectionEnd) {
        sqlToRun = value.slice(ta.selectionStart, ta.selectionEnd);
      }
      if (sqlToRun.trim()) onRun(sqlToRun);
    };

    const toggleComment = () => {
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const lineEnd = (() => {
        const idx = value.indexOf('\n', end);
        return idx === -1 ? value.length : idx;
      })();
      const selectedLines = value.slice(lineStart, lineEnd).split('\n');
      const allCommented = selectedLines.every((l) =>
        /^\s*--/.test(l.trimStart())
      );
      const next = allCommented
        ? selectedLines.map((l) => l.replace(/^\s*--\s?/, '')).join('\n')
        : selectedLines.map((l) => `-- ${l}`).join('\n');
      onChange(value.slice(0, lineStart) + next + value.slice(lineEnd));
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(lineStart, lineStart + next.length);
      });
    };

    const refreshSuggestions = () => {
      const ta = textareaRef.current;
      if (!ta) return;
      const caret = ta.selectionStart;
      const { word } = wordAtCursor(value, caret);
      if (!onSuggest || word.length < 1) {
        setCompletionOpen(false);
        setSuggestions([]);
        return;
      }
      const items = onSuggest(value, caret);
      setSuggestions(items);
      setActiveIdx(0);
      setCompletionOpen(items.length > 0);
    };

    const accept = (index: number) => {
      const item = suggestions[index];
      if (!item) return;
      const ta = textareaRef.current;
      const caret = ta?.selectionStart ?? value.length;
      const { start, end } = wordAtCursor(value, caret);
      const { text, cursor } = replaceWord(value, start, end, item.label);
      onChange(text);
      requestAnimationFrame(() => {
        ta?.focus();
        ta?.setSelectionRange(cursor, cursor);
      });
      setCompletionOpen(false);
      setSuggestions([]);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        runSelected();
        return;
      }
      if (e.key === '/' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleComment();
        return;
      }
      if (completionOpen && suggestions.length > 0) {
        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
          accept(activeIdx);
          return;
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIdx((p) => (p + 1) % suggestions.length);
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIdx(
            (p) => (p - 1 + suggestions.length) % suggestions.length
          );
          return;
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          setCompletionOpen(false);
          setSuggestions([]);
          return;
        }
      }
      if (e.code === 'Space' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        refreshSuggestions();
      }
    };

    const handleChange = (next: string) => {
      onChange(next);
      requestAnimationFrame(refreshSuggestions);
    };

    return (
      <div className="relative">
        <div
          className={`flex flex-row-reverse ${errorLine ? 'rounded-lg' : ''}`}>
          <div className="min-w-0 flex-1">
            <div className="relative">
              <pre
                ref={preRef}
                aria-hidden="true"
                className="textarea textarea-bordered text-base-content pointer-events-none absolute inset-0 m-0 w-full resize-none overflow-hidden font-mono text-sm leading-6 break-words whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: highlightSql(value) }}
              />
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                onScroll={syncScroll}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                className="textarea textarea-bordered caret-base-content selection:bg-primary/30 placeholder:text-base-content/40 relative w-full resize-none overflow-auto bg-transparent font-mono text-sm leading-6 break-words whitespace-pre-wrap text-transparent"
                rows={rows}
                placeholder={placeholder}
              />
            </div>
          </div>
          <pre
            ref={gutterRef}
            aria-hidden="true"
            className="border-base-300 text-base-content/30 py-2 pr-2 pl-3 text-right font-mono text-sm leading-6 select-none"
            dangerouslySetInnerHTML={{ __html: gutterHtml }}
          />
        </div>
        {completionOpen && suggestions.length > 0 && (
          <div className="bg-base-100 border-base-300 absolute top-full left-0 z-30 mt-1 max-h-48 w-full overflow-auto rounded-xl border shadow-2xl">
            {suggestions.map((s, i) => (
              <button
                key={`${s.type}-${s.label}`}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => accept(i)}
                className={`flex w-full items-center gap-2 px-3 py-1.5 text-left font-mono text-xs ${i === activeIdx ? 'bg-primary/10 text-primary' : 'text-base-content/70 hover:bg-base-200'}`}>
                <span
                  className={`badge badge-xs font-normal ${s.type === 'keyword' ? 'badge-info' : s.type === 'table' ? 'badge-success' : 'badge-warning'}`}>
                  {s.type}
                </span>
                <span className="truncate">{s.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
SqlEditor.displayName = 'SqlEditor';
