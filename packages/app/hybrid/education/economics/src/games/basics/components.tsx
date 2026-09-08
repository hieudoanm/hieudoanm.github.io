import type { FC } from 'react';
import { GAMES } from './constants';
import type { Cell, Game, GameId } from './types';

export const GameSelect: FC<{ onPick: (id: GameId) => void }> = ({
  onPick,
}) => (
  <div className="flex flex-col gap-3">
    <p className="text-base-content/60 text-sm">
      Pick a classic 2×2 game — or roll a random challenge.
    </p>
    <div data-testid="game-select" className="grid gap-2 sm:grid-cols-2">
      {GAMES.map((game) => (
        <button
          key={game.id}
          type="button"
          onClick={() => onPick(game.id)}
          data-testid={`game-${game.id}`}
          className="card border-base-content/10 border p-3 text-left transition-colors">
          <span className="font-semibold">{game.name}</span>
          <span className="text-base-content/60 block text-xs">
            {game.note}
          </span>
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPick('challenge')}
        data-testid="game-challenge"
        className="card border-base-content/10 border p-3 text-left transition-colors">
        <span className="font-semibold">🎲 Random Challenge</span>
        <span className="text-base-content/60 block text-xs">
          Randomized payoffs. Find the Nash equilibrium, if one exists.
        </span>
      </button>
    </div>
  </div>
);

export const ActionPicker: FC<{
  game: Game;
  selectedRow: number | null;
  selectedCol: number | null;
  onRow: (index: number) => void;
  onCol: (index: number) => void;
}> = ({ game, selectedRow, selectedCol, onRow, onCol }) => (
  <div className="card border-base-content/10 flex flex-wrap items-center gap-4 border p-3">
    <div data-testid="row-action" className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold">Row (You):</span>
      {game.rowStrategies.map((strategy, index) => (
        <button
          key={strategy.id}
          type="button"
          onClick={() => onRow(index)}
          data-testid={`row-action-${index}`}
          className={
            selectedRow === index ? 'btn btn-primary btn-sm' : 'btn btn-sm'
          }>
          {strategy.label}
        </button>
      ))}
    </div>
    <div data-testid="col-action" className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold">Col (Guess):</span>
      {game.colStrategies.map((strategy, index) => (
        <button
          key={strategy.id}
          type="button"
          onClick={() => onCol(index)}
          data-testid={`col-action-${index}`}
          className={
            selectedCol === index ? 'btn btn-secondary btn-sm' : 'btn btn-sm'
          }>
          {strategy.label}
        </button>
      ))}
    </div>
  </div>
);

const CellBox: FC<{
  game: Game;
  row: number;
  col: number;
  isNash: boolean;
  isHighlight: boolean;
  isChosen: boolean;
  onPick: ((cell: Cell) => void) | undefined;
}> = ({ game, row, col, isNash, isHighlight, isChosen, onPick }) => {
  const [a, b] = game.payoffs[row][col];
  const classes = [
    'border-base-300 cursor-pointer border p-3 text-center transition-colors hover:bg-base-200',
    isNash ? 'bg-success/15' : '',
    isHighlight ? 'ring-2 ring-primary' : '',
    isChosen ? 'bg-primary/10' : '',
  ].join(' ');
  return (
    <td
      data-testid={`cell-${row}-${col}`}
      className={classes}
      onClick={onPick ? () => onPick({ row, col }) : undefined}>
      <div className="text-sm font-bold">
        {a}, {b}
      </div>
      <div className="text-base-content/50 text-xs">
        {game.rowStrategies[row].label} / {game.colStrategies[col].label}
      </div>
      {isNash && <div className="text-success mt-1 text-xs">NE</div>}
    </td>
  );
};

export const MatrixView: FC<{
  game: Game;
  highlight: Cell | null;
  chosen: Cell | null;
  nash: Cell[];
  quizMode: boolean;
  onPick: (cell: Cell) => void;
}> = ({ game, highlight, chosen, nash, quizMode, onPick }) => {
  const isMatch = (cell: Cell | null, row: number, col: number): boolean =>
    cell !== null && cell.row === row && cell.col === col;
  const isNash = (row: number, col: number): boolean =>
    nash.some((c) => c.row === row && c.col === col);
  return (
    <div className="overflow-x-auto">
      <table data-testid="matrix" className="border-separate border-spacing-0">
        <thead>
          <tr>
            <th />
            {game.colStrategies.map((strategy) => (
              <th key={strategy.id} className="p-2 text-xs">
                {strategy.label} (Col)
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[0, 1].map((row) => (
            <tr key={row}>
              <th className="p-2 text-xs">
                {game.rowStrategies[row].label} (Row)
              </th>
              {[0, 1].map((col) => (
                <CellBox
                  key={col}
                  game={game}
                  row={row}
                  col={col}
                  isNash={isNash(row, col)}
                  isHighlight={isMatch(highlight, row, col)}
                  isChosen={isMatch(chosen, row, col)}
                  onPick={quizMode ? onPick : undefined}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
