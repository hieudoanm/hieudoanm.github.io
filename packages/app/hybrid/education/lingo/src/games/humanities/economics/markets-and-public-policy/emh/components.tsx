import type { FC } from 'react';
import { TOTAL_ROUNDS } from './constants';
import { applyReturn } from './game';
import type { Position, RoundResult, Summary } from './types';

const formatWealth = (n: number): string => `$${n.toFixed(2)}`;

export const PositionChooser: FC<{
  round: number;
  wealth: number;
  tip: number;
  onChoose: (position: Position) => void;
}> = ({ round, wealth, tip, onChoose }) => (
  <div
    className="card border-base-content/10 flex flex-col gap-3 border p-4"
    data-testid="position-chooser">
    <p className="text-sm">
      Portfolio value before this round:{' '}
      <strong className="text-primary">{formatWealth(wealth)}</strong>
    </p>
    <p className="text-base-content/80 bg-base-200 rounded-lg p-3 text-sm">
      <strong>Expert tip:</strong>{' '}
      {tip >= 1
        ? '“Prices are expected to rise.”'
        : '“Prices are expected to fall or stay flat.”'}
    </p>
    <p className="text-base-content/60 text-xs">
      The tip is public information. In a strong-form efficient market it is
      already priced in — it cannot systematically beat buy-and-hold.
    </p>
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChoose('in')}
        data-testid="position-in"
        className="btn btn-primary btn-sm">
        Invest (in)
      </button>
      <button
        type="button"
        onClick={() => onChoose('cash')}
        data-testid="position-cash"
        className="btn btn-outline btn-sm">
        Stay in cash
      </button>
    </div>
    <span className="text-base-content/60 text-xs">
      Round {round} / {TOTAL_ROUNDS}
    </span>
  </div>
);

export const RoundResultPanel: FC<{
  round: number;
  returnPct: number;
  tip: number;
  position: Position;
  wealth: number;
  onNext: () => void;
}> = ({ round, returnPct, tip, position, wealth, onNext }) => {
  const invested = position === 'in';
  const newWealth = invested ? applyReturn(wealth, returnPct) : wealth;
  const tipRight = (tip >= 1 && returnPct > 0) || (tip === 0 && returnPct < 0);
  const tipNeutral = returnPct === 0;
  const sign = returnPct > 0 ? '▲' : returnPct < 0 ? '▼' : '—';
  return (
    <div
      className="card border-base-content/10 flex flex-col gap-3 border p-4"
      data-testid="round-result">
      <p className="text-sm">
        Round {round} return:{' '}
        <strong className={returnPct >= 0 ? 'text-success' : 'text-error'}>
          {sign} {returnPct > 0 ? '+' : ''}
          {returnPct}%
        </strong>
      </p>
      <p className="text-base-content/80 bg-base-200 rounded-lg p-3 text-sm">
        The expert was{' '}
        <strong>{tipNeutral ? 'neutral' : tipRight ? 'right' : 'wrong'}</strong>{' '}
        this round.
      </p>
      <p className="text-sm">
        Your position: <strong>{invested ? 'Invested' : 'Cash'}</strong>
      </p>
      <p className="text-sm">
        Portfolio value:{' '}
        <strong className="text-primary">{formatWealth(newWealth)}</strong>
      </p>
      <button
        type="button"
        onClick={onNext}
        data-testid="next-round"
        className="btn btn-primary btn-sm">
        {round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
      </button>
    </div>
  );
};

const SummaryRow: FC<{
  label: string;
  wealth: number;
  winner: boolean;
}> = ({ label, wealth, winner }) => (
  <tr className={winner ? 'text-success' : undefined}>
    <td>{label}</td>
    <td className="text-right font-bold">{formatWealth(wealth)}</td>
    <td className="text-right">{winner ? '🏆 best' : ''}</td>
  </tr>
);

export const SummaryPanel: FC<{
  summary: Summary;
  results: RoundResult[];
  onReset: () => void;
}> = ({ summary, results, onReset }) => {
  const entries = [
    { label: 'Your trading', wealth: summary.playerWealth },
    { label: 'Buy & hold', wealth: summary.buyAndHoldWealth },
    { label: 'Coin flip (50/50)', wealth: summary.coinFlipWealth },
    { label: 'Follow the expert tips', wealth: summary.tipStrategyWealth },
  ];
  const best = Math.max(...entries.map((entry) => entry.wealth));
  return (
    <div
      className="card border-base-content/10 flex flex-col gap-4 border p-4"
      data-testid="summary">
      <div className="text-lg font-bold">Final wealth comparison</div>
      <table className="table-sm table">
        <thead>
          <tr>
            <th>Strategy</th>
            <th className="text-right">Ending wealth</th>
            <th className="text-right" />
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <SummaryRow
              key={entry.label}
              label={entry.label}
              wealth={entry.wealth}
              winner={entry.wealth === best}
            />
          ))}
        </tbody>
      </table>
      <div className="bg-base-200 rounded-lg p-3 text-sm">
        <p>
          Done in {results.length} rounds. Your strategy{' '}
          {summary.playerWealth >= summary.buyAndHoldWealth
            ? 'beat'
            : 'trailed'}{' '}
          buy-and-hold ({formatWealth(summary.buyAndHoldWealth)}).
        </p>
        <p className="text-base-content/60 mt-1 text-xs">
          The tips are revealed before each return, yet following them does not
          reliably beat simply buying and holding — because weak-form efficiency
          means past returns and public signals are already in price.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        data-testid="play-again"
        className="btn btn-primary btn-sm">
        Play Again
      </button>
    </div>
  );
};
