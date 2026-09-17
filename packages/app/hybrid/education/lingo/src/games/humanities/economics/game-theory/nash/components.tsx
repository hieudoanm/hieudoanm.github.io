import type { FC } from 'react';
import type { Col, PayoffMatrix, Row } from './types';

export const PayoffTable: FC<{
  matrix: PayoffMatrix;
  selectedRow: Row | null;
  aiCol: Col | null;
  highlightNE: boolean;
  onPickRow: (row: Row) => void;
}> = ({ matrix, selectedRow, aiCol, highlightNE, onPickRow }) => {
  const isBestResponseCell = (r: Row, c: Col): boolean => {
    if (!highlightNE || !selectedRow || !aiCol) return false;
    return r === selectedRow && c === aiCol;
  };

  return (
    <div className="card border-base-content/10 border p-4">
      <table className="w-full text-center text-sm">
        <thead>
          <tr>
            <th className="p-2" />
            {matrix.cols.map((col) => (
              <th key={col} className="text-primary p-2 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.rows.map((row) => (
            <tr key={row}>
              <td className="text-primary p-2 font-medium">{row}</td>
              {matrix.cols.map((col) => {
                const [p, a] =
                  matrix.matrix[matrix.rows.indexOf(row)][
                    matrix.cols.indexOf(col)
                  ];
                const isBR = isBestResponseCell(row, col);
                return (
                  <td
                    key={col}
                    className={`p-2 ${isBR ? 'bg-primary/10 font-bold' : ''}`}>
                    <span className="text-primary">{p}</span>
                    <span className="text-base-content/40 mx-1">,</span>
                    <span className="text-base-content/70">{a}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const RowPicker: FC<{
  onPickRow: (row: Row) => void;
}> = ({ onPickRow }) => (
  <div className="flex flex-col gap-2">
    <p className="text-base-content/60 text-sm">Choose your row strategy:</p>
    <div className="flex gap-2">
      {(['Up', 'Down'] as Row[]).map((row) => (
        <button
          key={row}
          type="button"
          onClick={() => onPickRow(row)}
          data-testid={`row-${row}`}
          className="btn btn-sm">
          {row}
        </button>
      ))}
    </div>
  </div>
);

export const Verdict: FC<{
  matrix: PayoffMatrix;
  selectedRow: Row;
  aiCol: Col;
  isNE: boolean;
  playerPayoff: number;
  aiPayoff: number;
  onNext: () => void;
  round: number;
  totalPlays: number;
}> = ({
  matrix,
  selectedRow,
  aiCol,
  isNE,
  playerPayoff,
  aiPayoff,
  onNext,
  round,
  totalPlays,
}) => (
  <div className="flex flex-col items-center gap-3">
    <PayoffTable
      matrix={matrix}
      selectedRow={selectedRow}
      aiCol={aiCol}
      highlightNE
      onPickRow={() => {}}
    />
    <div className="text-sm">
      You played <strong className="text-primary">{selectedRow}</strong>; AI
      played <strong className="text-base-content/70">{aiCol}</strong>
    </div>
    <div className="text-sm">
      Payoffs (you, AI):{' '}
      <strong className="text-primary">{playerPayoff}</strong>,{' '}
      <strong className="text-base-content/70">{aiPayoff}</strong>
    </div>
    <div
      data-testid="ne-verdict"
      className={`badge ${isNE ? 'badge-primary' : 'badge-outline'}`}>
      {isNE ? 'Nash Equilibrium' : 'Not a Nash Equilibrium'}
    </div>
    {!isNE && (
      <p className="text-base-content/60 text-xs">
        No pure-strategy Nash equilibrium exists for this game. The mixed
        equilibrium has each player randomizing 50/50.
      </p>
    )}
    <button
      type="button"
      onClick={onNext}
      data-testid="next-play"
      className="btn btn-primary btn-sm">
      {round >= totalPlays ? 'See Summary' : 'Next Play'}
    </button>
  </div>
);
