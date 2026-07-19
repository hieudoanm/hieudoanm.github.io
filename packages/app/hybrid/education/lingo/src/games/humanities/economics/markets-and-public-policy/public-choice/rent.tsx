import { FC } from 'react';
import { CheckButton, formatCurrency, NextButton } from './components';
import type { RentResult } from './types';

export const RentPlan: FC<{
  playerSpend: number;
  botSpend: number;
  prize: number;
  onChange: (value: number) => void;
  onCheck: () => void;
}> = ({ playerSpend, botSpend, prize, onChange, onCheck }) => {
  const total = playerSpend + botSpend;
  const probability = total === 0 ? 0.5 : playerSpend / total;
  return (
    <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
      <p className="text-sm">
        Two interest groups lobby for a subsidy. Winning is proportional to
        spending (Tullock contest): p = E1 / (E1 + E2). Every lobby dollar is
        economic waste.
      </p>
      <span data-testid="prize" className="badge badge-primary self-start">
        Prize V: {formatCurrency(prize)}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-xs">Your lobby budget E1:</span>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={prize}
            value={playerSpend}
            onChange={(e) => onChange(Number(e.target.value))}
            data-testid="rent-spend-a"
            className="range range-primary w-full"
          />
          <span className="w-24 text-right text-sm font-bold">
            {formatCurrency(playerSpend)}
          </span>
        </div>
      </div>
      <div data-testid="rent-spend-b" className="text-sm">
        Rival lobby budget E2: <strong>{formatCurrency(botSpend)}</strong>
      </div>
      <p className="text-xs">
        Your win probability: <strong>{Math.round(probability * 100)}%</strong>.
        Check reveals the draw and the expected payoff p × V − E1.
      </p>
      <CheckButton onCheck={onCheck} />
    </div>
  );
};

export const RentCheck: FC<{
  result: RentResult;
  prize: number;
  nextLabel: string;
  onNext: () => void;
}> = ({ result, prize, nextLabel, onNext }) => {
  const pct = Math.round(result.winProbability * 100);
  return (
    <div className="flex flex-col items-center gap-3 py-4 text-center">
      <div className="text-3xl">{result.won ? '🏆' : '🤝'}</div>
      <div className="text-lg">
        {result.won ? 'Your group won the subsidy' : 'The rival group won it'}
      </div>
      <div data-testid="payoff" className="flex flex-col gap-1 text-sm">
        <span>Win chance p = {pct}%</span>
        <span>
          Expected payoff = p × V − E1 ={' '}
          <strong>{formatCurrency(result.expectedPayoff)}</strong>
        </span>
        <span>
          Net payoff this round:{' '}
          <strong>{formatCurrency(result.netPayoff)}</strong>
        </span>
        <span>
          Lobby spending burned: {formatCurrency(result.playerSpend)} +{' '}
          {formatCurrency(result.botSpend)} of the {formatCurrency(prize)} prize
        </span>
      </div>
      <p className="text-base-content/60 max-w-md text-xs">
        Rent dissipation: with rivals matching your spending, the expected
        payoff falls toward zero — most of the subsidy is wasted fighting for
        it.
      </p>
      <NextButton label={nextLabel} onNext={onNext} />
    </div>
  );
};
