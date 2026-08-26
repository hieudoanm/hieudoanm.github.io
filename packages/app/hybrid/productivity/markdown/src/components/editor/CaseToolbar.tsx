'use client';

import { FC } from 'react';
import { type CaseKind } from '@/lib/textCase';

interface CaseToolbarProps {
  caseKind: CaseKind | null;
  onCaseChange: (kind: CaseKind | null) => void;
}

const CASES: ReadonlyArray<[CaseKind, string]> = [
  ['upper', 'UPPER'],
  ['lower', 'lower'],
  ['title', 'Title'],
  ['camel', 'camelCase'],
  ['snake', 'snake_case'],
  ['kebab', 'kebab-case'],
];

export const CaseToolbar: FC<CaseToolbarProps> = ({
  caseKind,
  onCaseChange,
}) => (
  <div className="border-base-content/10 bg-base-200/50 flex flex-wrap items-center gap-1 border-b px-2 py-1">
    <span className="text-base-content/40 pr-1 text-[10px] tracking-widest uppercase">
      Case
    </span>
    <div className="divider divider-horizontal mx-0.5 my-0 w-0" />
    {CASES.map(([kind, label]) => (
      <button
        key={kind}
        className={`btn btn-xs tooltip tooltip-bottom font-mono text-[11px] ${
          caseKind === kind ? 'btn-primary' : 'btn-ghost'
        }`}
        data-tip={kind === 'title' ? 'Title case' : label}
        onClick={() => onCaseChange(caseKind === kind ? null : kind)}
        aria-label={kind === 'title' ? 'Title case' : `Case ${label}`}>
        {label}
      </button>
    ))}
  </div>
);
