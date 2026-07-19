import { FC, useState } from 'react';
import type { VariantKind } from '../types';
import { CrazyhouseTab } from './CrazyhouseTab';
import { HordeTab } from './HordeTab';
import { ThreeCheckTab } from './ThreeCheckTab';

const MODES: { kind: VariantKind; label: string }[] = [
  { kind: 'three-check', label: 'Three-check' },
  { kind: 'horde', label: 'Pawn Horde' },
  { kind: 'crazyhouse', label: 'Crazyhouse' },
];

export const VariantsTab: FC = () => {
  const [mode, setMode] = useState<VariantKind>('three-check');

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1">
        {MODES.map((m) => (
          <button
            key={m.kind}
            onClick={() => setMode(m.kind)}
            className={`btn btn-sm ${mode === m.kind ? 'btn-primary' : 'btn-ghost'}`}>
            {m.label}
          </button>
        ))}
      </div>
      {mode === 'three-check' && <ThreeCheckTab />}
      {mode === 'horde' && <HordeTab />}
      {mode === 'crazyhouse' && <CrazyhouseTab />}
    </div>
  );
};
VariantsTab.displayName = 'VariantsTab';
