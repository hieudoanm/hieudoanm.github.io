'use client';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { FiGrid, FiSearch, FiX } from 'react-icons/fi';
import type { DiagramExample } from '@/lib/examples';

interface ExamplesModalProps {
  examples: readonly DiagramExample[];
  open: boolean;
  onClose: () => void;
  onLoadExample: (example: DiagramExample) => void;
}

const matches = (example: DiagramExample, query: string): boolean => {
  const haystack = [
    example.name,
    example.description,
    example.id,
    ...example.questions,
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
};

const ExamplesModal: FC<ExamplesModalProps> = ({
  examples,
  open,
  onClose,
  onLoadExample,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return examples;
    return examples.filter((example) => matches(example, needle));
  }, [examples, query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}>
      <div
        aria-label="Example diagrams"
        className="card bg-base-200 flex max-h-[90vh] w-full max-w-2xl flex-col shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog">
        <div className="border-base-content/10 flex items-center justify-between gap-2 border-b p-3">
          <h2 className="text-lg font-semibold">Example diagrams</h2>
          <button
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            aria-label="Close examples">
            <FiX size={16} />
          </button>
        </div>
        <div className="p-3">
          <label className="flex items-center gap-2">
            <FiSearch className="text-base-content/40" size={16} />
            <input
              ref={inputRef}
              className="input input-sm bg-base-100 w-full"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, service, or question…"
              aria-label="Search examples"
              type="search"
              value={query}
            />
          </label>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
          {results.length === 0 ? (
            <p className="text-base-content/50 p-4 text-center text-sm">
              No examples match "{query.trim()}".
            </p>
          ) : (
            <ul className="menu rounded-box w-full p-0">
              {results.map((example) => (
                <li key={example.id}>
                  <button onClick={() => onLoadExample(example)}>
                    <FiGrid size={14} />
                    <span>
                      <span className="text-sm font-medium">
                        {example.name}
                      </span>
                      <span className="text-base-content/50 block text-xs">
                        {example.description}
                      </span>
                    </span>
                    <span className="text-base-content/30 text-[10px]">
                      {example.questions.length} questions
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamplesModal;
