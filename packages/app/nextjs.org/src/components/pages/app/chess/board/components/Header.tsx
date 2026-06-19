import type { ChangeEvent, FC } from 'react';
import { range } from '@lodash/ts';
import { padZero } from '@lodashx/ts';
import type { Opening } from '@hieudoanm.github.io/data/chess/openings';
import type { BoardMode, SidePanel } from '../types';

interface HeaderProps {
  positionId: number;
  panel: SidePanel;
  boardMode: BoardMode;
  ecoOpening: Opening | undefined;
  on960IdChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onRandomize: () => void;
  onReset: () => void;
  onModeSwitch: (mode: BoardMode) => void;
}

export const Header: FC<HeaderProps> = ({
  positionId,
  panel,
  boardMode,
  ecoOpening,
  on960IdChange,
  onRandomize,
  onReset,
  onModeSwitch,
}) => (
  <>
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-black md:text-3xl">
        Chess{' '}
        <select
          value={positionId}
          className="appearance-none font-black"
          onChange={on960IdChange}>
          {range(0, 959).map((i: number) => (
            <option key={i} value={i}>
              {padZero(i, 3)}
            </option>
          ))}
        </select>
      </h1>
      <div className="flex items-center gap-1">
        <button
          className="btn btn-ghost btn-sm"
          title="Randomize"
          onClick={onRandomize}>
          🔀
        </button>
        <button
          className="btn btn-ghost btn-sm"
          title="Reset"
          onClick={onReset}>
          🔄
        </button>
      </div>
    </div>
    {panel !== 'openings' && (
      <div role="tablist" className="tabs tabs-boxed w-full">
        <button
          role="tab"
          className={`tab flex-1 gap-1 ${
            boardMode === 'explore' ? 'tab-active' : ''
          }`}
          onClick={() => onModeSwitch('explore')}>
          👁️ Explore
        </button>
        <button
          role="tab"
          className={`tab flex-1 gap-1 ${
            boardMode === 'play' ? 'tab-active' : ''
          }`}
          onClick={() => onModeSwitch('play')}>
          🤖 vs Stockfish
        </button>
      </div>
    )}
    {panel === 'openings' && ecoOpening && (
      <div className="bg-base-100 rounded-lg px-4 py-2">
        <p className="text-base-content/40 text-[10px] font-semibold tracking-widest uppercase">
          {ecoOpening.eco}
        </p>
        <p className="truncate font-bold">{ecoOpening.name}</p>
      </div>
    )}
  </>
);
