'use client';

import { FC, useMemo, useRef } from 'react';
import { FiFileText } from 'react-icons/fi';
import type { ParseError } from '@/lib/types';

interface TextPaneProps {
  text: string;
  onChange: (value: string) => void;
  errors: ParseError[];
  onUndo: () => void;
  onRedo: () => void;
}

const lineClass =
  'flex h-6 items-center justify-end pr-2 text-xs text-base-content/40 select-none';

const TextPane: FC<TextPaneProps> = ({
  text,
  onChange,
  errors,
  onUndo,
  onRedo,
}) => {
  const gutterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineCount = useMemo(() => text.split('\n').length, [text]);
  const errorLines = useMemo(
    () => new Set(errors.map((e) => e.line)),
    [errors]
  );
  const lines = useMemo(
    () =>
      Array.from({ length: lineCount }, (_, index) => {
        const line = index + 1;
        return (
          <div
            className={`${lineClass} ${errorLines.has(line) ? 'text-error' : ''}`}
            key={line}>
            {line}
          </div>
        );
      }),
    [lineCount, errorLines]
  );

  const handleScroll = (): void => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (!(event.ctrlKey || event.metaKey)) return;
    const key = event.key.toLowerCase();
    if (key === 'z') {
      event.preventDefault();
      if (event.shiftKey) {
        onRedo();
      } else {
        onUndo();
      }
    } else if (key === 'y') {
      event.preventDefault();
      onRedo();
    }
  };

  return (
    <div className="border-base-300 bg-base-100 flex w-full min-w-0 flex-col border-r">
      <div className="border-base-300 bg-base-200 flex items-center gap-2 border-b px-3 py-1.5">
        <FiFileText className="text-primary" size={14} />
        <span className="font-mono text-xs">diagram.diagram</span>
        <span className="text-base-content/40 ml-auto text-xs">
          {lineCount} lines
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <div
          ref={gutterRef}
          aria-hidden
          className="border-base-300 bg-base-200/60 overflow-hidden border-r pt-3">
          <div>{lines}</div>
        </div>
        <textarea
          ref={textareaRef}
          aria-label="Diagram source"
          className="min-h-0 flex-1 resize-none bg-transparent p-3 pt-3 font-mono text-[13px] leading-6 outline-none"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck={false}
          value={text}
          wrap="off"
        />
      </div>
    </div>
  );
};

export default TextPane;
