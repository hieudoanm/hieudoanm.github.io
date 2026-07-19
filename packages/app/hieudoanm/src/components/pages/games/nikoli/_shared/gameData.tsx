import type { ReactNode } from 'react';

import { GAME_NAME as FILLOMINO_NAME } from '../Fillomino/types';
import { GAME_NAME as HEYAWAKE_NAME } from '../Heyawake/types';
import { GAME_NAME as MASYU_NAME } from '../Masyu/types';
import { GAME_NAME as NORINORI_NAME } from '../Norinori/types';
import { GAME_NAME as NURIKABE_NAME } from '../Nurikabe/types';
import { GAME_NAME as SHIKAKU_NAME } from '../Shikaku/types';
import { GAME_NAME as SUDOKU_NAME } from '../Sudoku/types';

const NurikabeVisualization = () => (
  <div
    className="grid gap-px"
    style={{ gridTemplateColumns: 'repeat(4, 1fr)', width: '120px' }}>
    {[
      { n: '1', bg: 'bg-base-100' },
      { n: '', bg: 'bg-base-content' },
      { n: '', bg: 'bg-base-content' },
      { n: '', bg: 'bg-base-content' },
      { n: '', bg: 'bg-base-content' },
      { n: '2', bg: 'bg-base-100' },
      { n: '2', bg: 'bg-base-100' },
      { n: '', bg: 'bg-base-content' },
      { n: '', bg: 'bg-base-content' },
      { n: '', bg: 'bg-base-content' },
      { n: '', bg: 'bg-base-content' },
      { n: '', bg: 'bg-base-content' },
      { n: '3', bg: 'bg-base-100' },
      { n: '3', bg: 'bg-base-100' },
      { n: '3', bg: 'bg-base-100' },
      { n: '', bg: 'bg-base-content' },
    ].map((cell, i) => (
      <div
        key={i}
        className={`flex aspect-square items-center justify-center rounded-sm text-[10px] font-bold ${cell.bg} ${cell.bg === 'bg-base-content' ? 'text-base-100' : 'text-base-content'}`}>
        {cell.n}
      </div>
    ))}
  </div>
);

const FillominoVisualization = () => (
  <div
    className="grid gap-px"
    style={{ gridTemplateColumns: 'repeat(4, 1fr)', width: '120px' }}>
    {[
      { n: '1', bg: 'bg-primary/20' },
      { n: '2', bg: 'bg-secondary/20' },
      { n: '2', bg: 'bg-secondary/20' },
      { n: '3', bg: 'bg-accent/20' },
      { n: '1', bg: 'bg-primary/20' },
      { n: '4', bg: 'bg-info/20' },
      { n: '4', bg: 'bg-info/20' },
      { n: '3', bg: 'bg-accent/20' },
      { n: '1', bg: 'bg-primary/20' },
      { n: '4', bg: 'bg-info/20' },
      { n: '4', bg: 'bg-info/20' },
      { n: '3', bg: 'bg-accent/20' },
      { n: '1', bg: 'bg-primary/20' },
      { n: '2', bg: 'bg-secondary/20' },
      { n: '2', bg: 'bg-secondary/20' },
      { n: '3', bg: 'bg-accent/20' },
    ].map((cell, i) => (
      <div
        key={i}
        className={`flex aspect-square items-center justify-center rounded-sm text-[10px] font-bold ${cell.bg} text-base-content`}>
        {cell.n}
      </div>
    ))}
  </div>
);

const HeyawakeVisualization = () => (
  <div
    className="grid gap-px"
    style={{ gridTemplateColumns: 'repeat(4, 1fr)', width: '120px' }}>
    {[
      {
        n: '2',
        bg: 'bg-base-100',
        border: 'border-r-2 border-base-content/30',
      },
      { n: '', bg: 'bg-base-content', border: '' },
      { n: '', bg: 'bg-base-100', border: 'border-r-2 border-base-content/30' },
      { n: '', bg: 'bg-base-100', border: '' },
      {
        n: '',
        bg: 'bg-base-100',
        border: 'border-r-2 border-b-2 border-base-content/30',
      },
      { n: '', bg: 'bg-base-100', border: 'border-b-2 border-base-content/30' },
      {
        n: '',
        bg: 'bg-base-content',
        border: 'border-r-2 border-base-content/30',
      },
      { n: '', bg: 'bg-base-100', border: '' },
      {
        n: '1',
        bg: 'bg-base-100',
        border: 'border-r-2 border-base-content/30',
      },
      { n: '', bg: 'bg-base-content', border: '' },
      { n: '', bg: 'bg-base-100', border: 'border-r-2 border-base-content/30' },
      { n: '', bg: 'bg-base-100', border: '' },
      { n: '', bg: 'bg-base-100', border: '' },
      { n: '', bg: 'bg-base-100', border: '' },
      { n: '', bg: 'bg-base-100', border: '' },
      { n: '', bg: 'bg-base-content', border: '' },
    ].map((cell, i) => (
      <div
        key={i}
        className={`flex aspect-square items-center justify-center rounded-sm text-[10px] font-bold ${cell.bg} ${cell.border} ${cell.bg === 'bg-base-content' ? 'text-base-100' : 'text-base-content'}`}>
        {cell.n}
      </div>
    ))}
  </div>
);

const MasyuVisualization = () => (
  <div
    className="grid gap-px"
    style={{ gridTemplateColumns: 'repeat(4, 1fr)', width: '120px' }}>
    {[
      { pearl: 'white', loop: 'bg-primary/40' },
      { pearl: null, loop: 'bg-primary/40' },
      { pearl: null, loop: 'bg-primary/40' },
      { pearl: 'black', loop: 'bg-primary/40' },
      { pearl: null, loop: '' },
      { pearl: null, loop: '' },
      { pearl: null, loop: 'bg-primary/40' },
      { pearl: null, loop: 'bg-primary/40' },
      { pearl: 'black', loop: 'bg-primary/40' },
      { pearl: null, loop: 'bg-primary/40' },
      { pearl: null, loop: '' },
      { pearl: null, loop: '' },
      { pearl: null, loop: '' },
      { pearl: 'white', loop: 'bg-primary/40' },
      { pearl: null, loop: 'bg-primary/40' },
      { pearl: null, loop: 'bg-primary/40' },
    ].map((cell, i) => (
      <div
        key={i}
        className={`relative flex aspect-square items-center justify-center rounded-sm ${cell.loop}`}>
        {cell.pearl === 'white' && (
          <div className="bg-base-100 ring-base-content h-4 w-4 rounded-full ring-2" />
        )}
        {cell.pearl === 'black' && (
          <div className="bg-base-content h-4 w-4 rounded-full" />
        )}
      </div>
    ))}
  </div>
);

const NorinoriVisualization = () => (
  <div className="flex flex-col items-center gap-px">
    <div className="mb-1 flex gap-px">
      <div className="w-4" />
      {[2, 1, 2, 1].map((c, i) => (
        <div
          key={i}
          className="flex w-6 items-center justify-center text-[10px] font-bold">
          {c}
        </div>
      ))}
    </div>
    {[
      { row: [false, true, false, true], clue: 2 },
      { row: [true, false, true, false], clue: 2 },
      { row: [false, true, false, true], clue: 2 },
      { row: [true, false, true, false], clue: 2 },
    ].map((r, ri) => (
      <div key={ri} className="flex items-center gap-px">
        <div className="flex w-4 items-center justify-center text-[10px] font-bold">
          {r.clue}
        </div>
        {r.row.map((shaded, ci) => (
          <div
            key={ci}
            className={`flex h-6 w-6 items-center justify-center rounded-sm ${shaded ? 'bg-base-content' : 'bg-base-100'}`}
          />
        ))}
      </div>
    ))}
  </div>
);

const ShikakuVisualization = () => (
  <div
    className="grid gap-1"
    style={{ gridTemplateColumns: 'repeat(4, 1fr)', width: '120px' }}>
    {[
      { n: '4', bg: 'bg-primary/20' },
      { n: '', bg: 'bg-primary/20' },
      { n: '2', bg: 'bg-secondary/20' },
      { n: '', bg: 'bg-secondary/20' },
      { n: '4', bg: 'bg-primary/20' },
      { n: '', bg: 'bg-primary/20' },
      { n: '2', bg: 'bg-secondary/20' },
      { n: '', bg: 'bg-secondary/20' },
      { n: '4', bg: 'bg-primary/20' },
      { n: '', bg: 'bg-primary/20' },
      { n: '2', bg: 'bg-accent/20' },
      { n: '2', bg: 'bg-accent/20' },
      { n: '4', bg: 'bg-primary/20' },
      { n: '', bg: 'bg-primary/20' },
      { n: '', bg: 'bg-accent/20' },
      { n: '', bg: 'bg-accent/20' },
    ].map((cell, i) => (
      <div
        key={i}
        className={`flex aspect-square items-center justify-center rounded-sm text-[10px] font-bold ${cell.bg} text-base-content`}>
        {cell.n}
      </div>
    ))}
  </div>
);

const SudokuVisualization = () => (
  <div
    className="grid gap-px"
    style={{ gridTemplateColumns: 'repeat(4, 1fr)', width: '100px' }}>
    {[
      { n: '1', given: true },
      { n: '2', given: false },
      { n: '3', given: false },
      { n: '4', given: true },
      { n: '3', given: false },
      { n: '4', given: true },
      { n: '1', given: false },
      { n: '2', given: false },
      { n: '2', given: false },
      { n: '1', given: false },
      { n: '4', given: false },
      { n: '3', given: true },
      { n: '4', given: true },
      { n: '3', given: false },
      { n: '2', given: false },
      { n: '1', given: true },
    ].map((cell, i) => (
      <div
        key={i}
        className={`flex aspect-square items-center justify-center rounded-sm text-xs ${
          cell.given ? 'bg-base-300 font-bold' : 'bg-base-100 font-normal'
        } text-base-content ${
          (i + 1) % 2 === 0 ? 'border-base-content/20 border-r-2' : ''
        } ${i >= 8 && i <= 11 ? 'border-base-content/20 border-b-2' : ''}`}>
        {cell.n}
      </div>
    ))}
  </div>
);

export interface GameData {
  title: string;
  subtitle: string;
  instructions: string[];
  visualization: ReactNode;
}

export const GAME_DATA: Record<string, GameData> = {
  nurikabe: {
    title: NURIKABE_NAME.en,
    subtitle: NURIKABE_NAME.ja,
    instructions: [
      'Shade cells to create "islands" of white cells.',
      'Each island must contain exactly one number.',
      'The number indicates how many cells the island contains.',
      'All shaded cells must be connected.',
      'No 2×2 area can be entirely shaded.',
    ],
    visualization: <NurikabeVisualization />,
  },
  fillomino: {
    title: FILLOMINO_NAME.en,
    subtitle: FILLOMINO_NAME.ja,
    instructions: [
      'Fill the grid with numbers.',
      'Each contiguous region of the same number must contain exactly that many cells.',
      'Regions of the same number that touch must have different sizes.',
    ],
    visualization: <FillominoVisualization />,
  },
  heyawake: {
    title: HEYAWAKE_NAME.en,
    subtitle: HEYAWAKE_NAME.ja,
    instructions: [
      "Shade cells so each room's clue matches its count.",
      'Shaded cells cannot be adjacent horizontally or vertically.',
      'All white cells must be connected.',
      'No 2×2 area can be entirely white.',
    ],
    visualization: <HeyawakeVisualization />,
  },
  masyu: {
    title: MASYU_NAME.en,
    subtitle: MASYU_NAME.ja,
    instructions: [
      'Draw a single loop through all pearls.',
      'The loop must pass through every pearl.',
      'White pearls: the loop must go straight through.',
      'Black pearls: the loop must turn 90° at the pearl.',
    ],
    visualization: <MasyuVisualization />,
  },
  norinori: {
    title: NORINORI_NAME.en,
    subtitle: NORINORI_NAME.ja,
    instructions: [
      'Shade exactly the number of cells indicated by each row and column clue.',
      'Shaded cells cannot be adjacent horizontally or vertically.',
      'The shaded cells must form dominoes (2-cell blocks).',
    ],
    visualization: <NorinoriVisualization />,
  },
  shikaku: {
    title: SHIKAKU_NAME.en,
    subtitle: SHIKAKU_NAME.ja,
    instructions: [
      'Divide the grid into rectangular regions.',
      'Each region must contain exactly one number.',
      "The number indicates the region's area (number of cells).",
    ],
    visualization: <ShikakuVisualization />,
  },
  sudoku: {
    title: SUDOKU_NAME.en,
    subtitle: SUDOKU_NAME.ja,
    instructions: [
      'Fill each row with digits 1–N without repetition.',
      'Fill each column with digits 1–N without repetition.',
      'Fill each N×N box with digits 1–N without repetition.',
    ],
    visualization: <SudokuVisualization />,
  },
};
