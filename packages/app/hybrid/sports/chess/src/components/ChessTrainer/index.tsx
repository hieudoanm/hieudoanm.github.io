import { FC, useState } from 'react';
import type { TrainerTab } from './types';
import { CoordinatesTab } from './components/CoordinatesTab';
import { EndgameTab } from './components/EndgameTab';
import { MateTab } from './components/MateTab';
import { OpeningTab } from './components/OpeningTab';
import { PerftTab } from './components/PerftTab';
import { TacticsTab } from './components/TacticsTab';
import { VariantsTab } from './components/VariantsTab';

const TABS: { id: TrainerTab; label: string }[] = [
  { id: 'tactics', label: 'Tactics' },
  { id: 'endgame', label: 'Endgames' },
  { id: 'mate', label: 'Mates' },
  { id: 'opening', label: 'Openings' },
  { id: 'coordinates', label: 'Coordinates' },
  { id: 'perft', label: 'Perft' },
  { id: 'variants', label: 'Variants' },
];

export const ChessTrainer: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<TrainerTab>('tactics');

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 p-4">
      <div className="flex flex-wrap gap-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`btn btn-sm ${tab === t.id ? 'btn-primary' : 'btn-ghost'}`}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'tactics' && <TacticsTab />}
      {tab === 'endgame' && <EndgameTab />}
      {tab === 'mate' && <MateTab />}
      {tab === 'opening' && <OpeningTab />}
      {tab === 'coordinates' && <CoordinatesTab />}
      {tab === 'perft' && <PerftTab />}
      {tab === 'variants' && <VariantsTab />}
      <button onClick={onClose} className="btn btn-ghost btn-sm self-end">
        Close
      </button>
    </div>
  );
};
ChessTrainer.displayName = 'ChessTrainer';
