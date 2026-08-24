'use client';

import { FC } from 'react';
import type { EditorView } from '@codemirror/view';
import { applyCase, type CaseKind } from '@/lib/textCase';

interface CaseToolbarProps {
  view: EditorView | null;
}

const CASES: ReadonlyArray<[CaseKind, string]> = [
  ['upper', 'UPPER'],
  ['lower', 'lower'],
  ['title', 'Title'],
  ['camel', 'camelCase'],
  ['snake', 'snake_case'],
  ['kebab', 'kebab-case'],
];

export const CaseToolbar: FC<CaseToolbarProps> = ({ view }) => {
  const runCase = (kind: CaseKind): void => {
    if (!view) return;
    const { from, to } = view.state.selection.main;
    const edit = applyCase(view.state.doc.toString(), from, to, kind);
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: edit.text },
      selection: { anchor: edit.selectionStart, head: edit.selectionEnd },
    });
    view.focus();
  };

  return (
    <div className="border-base-content/10 bg-base-200/50 flex flex-wrap items-center gap-1 border-b px-2 py-1">
      <span className="text-base-content/40 pr-1 text-[10px] tracking-widest uppercase">
        Case
      </span>
      <div className="divider divider-horizontal mx-0.5 my-0 w-0" />
      {CASES.map(([kind, label]) => (
        <button
          key={kind}
          className="btn btn-ghost btn-xs tooltip tooltip-bottom font-mono text-[11px]"
          data-tip={kind === 'title' ? 'Title case' : label}
          onClick={() => runCase(kind)}
          disabled={!view}
          aria-label={kind === 'title' ? 'Title case' : `Case ${label}`}>
          {label}
        </button>
      ))}
    </div>
  );
};
