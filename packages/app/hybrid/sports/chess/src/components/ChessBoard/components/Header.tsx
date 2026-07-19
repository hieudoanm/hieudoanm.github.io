import type { ChangeEvent, FC } from 'react';
import { range } from '@lodash/ts';
import { padZero } from '@lodashx/ts';
import type { Opening } from '../../../lib/chess/openings';
import { BOARD_THEME_OPTIONS } from '../constants';
import { PIECE_SET_KEYS } from '../pieceSets';
import type { PieceSetKey } from '../pieceSets';
import type { BoardMode, BoardTheme, SidePanel } from '../types';

interface HeaderProps {
  positionId: number;
  panel: SidePanel;
  boardMode: BoardMode;
  ecoOpening: Opening | undefined;
  flipped: boolean;
  showNotation: boolean;
  theme: BoardTheme;
  pieceSet: PieceSetKey;
  on960IdChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onRandomize: () => void;
  onReset: () => void;
  onModeSwitch: (mode: BoardMode) => void;
  onFlip: () => void;
  onToggleNotation: () => void;
  onThemeChange: (theme: BoardTheme) => void;
  onPieceSetChange: (set: PieceSetKey) => void;
  onCopyLink: () => void;
}

export const Header: FC<HeaderProps> = ({
  positionId,
  panel,
  boardMode,
  ecoOpening,
  flipped,
  showNotation,
  theme,
  pieceSet,
  on960IdChange,
  onRandomize,
  onReset,
  onModeSwitch,
  onFlip,
  onToggleNotation,
  onThemeChange,
  onPieceSetChange,
  onCopyLink,
}) => {
  return (
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
      <div className="flex flex-wrap items-center gap-1">
        <button
          className={`btn btn-ghost btn-xs ${flipped ? 'btn-active' : ''}`}
          title="Flip board"
          onClick={onFlip}>
          ⇅ Flip
        </button>
        <button
          className={`btn btn-ghost btn-xs ${showNotation ? 'btn-active' : ''}`}
          title="Coordinates"
          onClick={onToggleNotation}>
          ▦ Coords
        </button>
        <select
          className="select select-xs"
          title="Board theme"
          value={theme}
          onChange={(e) => onThemeChange(e.target.value as BoardTheme)}>
          {BOARD_THEME_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          className="select select-xs"
          title="Piece set"
          value={pieceSet}
          onChange={(e) => onPieceSetChange(e.target.value as PieceSetKey)}>
          {PIECE_SET_KEYS.map((key) => (
            <option key={key} value={key}>
              {key === 'standard' ? '♟' : '♜'} {key}
            </option>
          ))}
        </select>
        <button
          className="btn btn-ghost btn-xs"
          title="Copy link"
          onClick={onCopyLink}>
          🔗 Share
        </button>
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
};
Header.displayName = 'Header';
