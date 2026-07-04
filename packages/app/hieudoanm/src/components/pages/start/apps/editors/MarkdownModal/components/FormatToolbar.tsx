import { EditorView } from '@codemirror/view';
import { FC, memo } from 'react';

import {
  insertAround,
  insertAtLineStart,
  insertBlock,
  insertHeading,
  insertTable,
  STYLE_FN,
  STRING_STYLES,
  StringStyle,
} from '../markdownFormatting';

interface FormatToolbarProps {
  exec: (fn: (view: EditorView) => void) => void;
  stringStyle: string;
  onStyleChange: (v: string) => void;
}

export const FormatToolbar: FC<FormatToolbarProps> = memo(
  ({ exec, stringStyle, onStyleChange }) => (
    <div className="border-base-300 flex flex-wrap items-center gap-0.5 border-b px-3 py-1">
      <button
        type="button"
        className="btn btn-ghost btn-xs btn-square font-normal"
        onClick={() => exec((v) => insertAround(v, '**', '**', 'bold text'))}
        title="Bold (Ctrl+B)">
        B
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-xs btn-square italic"
        onClick={() => exec((v) => insertAround(v, '*', '*', 'italic text'))}
        title="Italic (Ctrl+I)">
        I
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-xs btn-square line-through"
        onClick={() =>
          exec((v) => insertAround(v, '~~', '~~', 'strikethrough text'))
        }
        title="Strikethrough (Ctrl+Shift+X)">
        S
      </button>
      <div className="border-base-300 mx-0.5 h-4 w-px border-l" />
      {[1, 2, 3].map((level) => (
        <button
          key={level}
          type="button"
          className="btn btn-ghost btn-xs btn-square font-normal"
          onClick={() => exec((v) => insertHeading(v, level))}
          title={`Heading ${level}`}>
          H{level}
        </button>
      ))}
      <div className="border-base-300 mx-0.5 h-4 w-px border-l" />
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={() => exec((v) => insertAround(v, '[', '](url)', 'link text'))}
        title="Link (Ctrl+K)">
        Link
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={() => exec((v) => insertAround(v, '![', '](url)', 'alt text'))}
        title="Image">
        Img
      </button>
      <div className="border-base-300 mx-0.5 h-4 w-px border-l" />
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={() => exec((v) => insertAtLineStart(v, '-'))}
        title="Unordered list">
        UL
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={() => exec((v) => insertAtLineStart(v, '1.'))}
        title="Ordered list">
        OL
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={() => exec((v) => insertAtLineStart(v, '- [ ]'))}
        title="Task list">
        Task
      </button>
      <div className="border-base-300 mx-0.5 h-4 w-px border-l" />
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={() => exec((v) => insertAround(v, '`', '`', 'code'))}
        title="Inline code (Ctrl+`)">
        Code
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={() => exec((v) => insertBlock(v, '```\n', '\n```', 'code'))}
        title="Code block (Ctrl+Shift+C)">{`{ }`}</button>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={() => exec((v) => insertAtLineStart(v, '>'))}
        title="Blockquote">
        Quote
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={() =>
          exec((v) => {
            const { from } = v.state.selection.main;
            v.dispatch({ changes: { from, insert: '\n---\n' } });
            v.focus();
          })
        }
        title="Horizontal rule">
        HR
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={() => exec((v) => insertTable(v))}
        title="Insert table">
        Tbl
      </button>
      <div className="border-base-300 mx-0.5 h-4 w-px border-l" />
      <select
        className="select select-xs border-base-300 w-28 border font-mono"
        value={stringStyle}
        onChange={(e) => {
          const style = e.target.value as StringStyle;
          if (style) {
            exec((v) => {
              const { from, to } = v.state.selection.main;
              const selected = v.state.sliceDoc(from, to);
              if (selected) {
                const transformed = STYLE_FN[style](selected);
                v.dispatch({
                  changes: { from, to, insert: transformed },
                  selection: { anchor: from, head: from + transformed.length },
                });
                v.focus();
              }
            });
          }
          onStyleChange('');
        }}
        title="Apply string transformation to selected text">
        {STRING_STYLES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
);

FormatToolbar.displayName = 'FormatToolbar';
