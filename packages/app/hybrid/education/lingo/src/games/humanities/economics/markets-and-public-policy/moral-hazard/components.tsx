import type { FC } from 'react';
import { CONTRACTS } from './constants';
import { expectedPayoff } from './game';
import type { Contract, Effort } from './types';

const formatWealth = (n: number): string =>
  n >= 0 ? `+$${n}` : `-$${Math.abs(n)}`;

export const ContractPicker: FC<{
  onSelect: (contract: Contract) => void;
}> = ({ onSelect }) => (
  <div>
    <p className="text-base-content/60 mb-2 text-sm">Choose your contract:</p>
    <div className="grid gap-2 sm:grid-cols-3">
      {(
        [
          ['none', '🚫', 'No Insurance'],
          ['full', '🛡️', 'Full Coverage'],
          ['partial', '⚖️', 'Partial Coverage'],
        ] as const
      ).map(([id, emoji, label]) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          data-testid={`contract-${id}`}
          className="card border-base-content/10 border p-3 text-left transition-colors">
          <span className="text-lg">
            {emoji} {label}
          </span>
          <span className="text-base-content/60 block text-xs">
            Premium: ${CONTRACTS[id].premium}
            {CONTRACTS[id].deductible > 0 &&
              ` · Deductible: $${CONTRACTS[id].deductible}`}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export const EffortPicker: FC<{
  contract: Contract;
  onSelect: (effort: Effort) => void;
  onSubmit: () => void;
  selectedEffort: Effort | null;
}> = ({ contract, onSelect, onSubmit, selectedEffort }) => (
  <div className="flex flex-col gap-2">
    <p className="text-sm">Choose your effort level:</p>
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onSelect('low')}
        data-testid="effort-low"
        className={`btn btn-sm ${selectedEffort === 'low' ? 'btn-primary' : ''}`}>
        🏖️ Low (no cost)
      </button>
      <button
        type="button"
        onClick={() => onSelect('high')}
        data-testid="effort-high"
        className={`btn btn-sm ${selectedEffort === 'high' ? 'btn-primary' : ''}`}>
        💪 High ($2 cost)
      </button>
    </div>
    <p className="text-base-content/60 text-xs">
      {contract === 'none' &&
        'Without insurance, high effort reduces loss chance from 30% to 10%.'}
      {contract === 'full' &&
        'Full coverage pays everything — does effort still matter to you?'}
      {contract === 'partial' &&
        'Partial coverage: you pay the first $20 of any loss.'}
    </p>
    <button
      type="button"
      onClick={onSubmit}
      disabled={!selectedEffort}
      data-testid="submit-round"
      className="btn btn-primary btn-sm mt-1 w-full">
      Confirm &amp; Roll
    </button>
  </div>
);

export const ExpectedPayoffTable: FC<{
  contract: Contract;
  choice: Effort;
}> = ({ contract, choice }) => {
  const lowExp = expectedPayoff(contract, 'low');
  const highExp = expectedPayoff(contract, 'high');
  const lowBetter = lowExp > highExp;
  return (
    <div className="border-base-300 rounded-lg border p-3 text-sm">
      <p className="mb-1 text-xs font-semibold">
        Expected payoff under{' '}
        {contract === 'none'
          ? 'No Insurance'
          : contract === 'full'
            ? 'Full Coverage'
            : 'Partial Coverage'}
        :
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left">
            <th className="pb-1">Effort</th>
            <th className="pb-1">Expected Payoff</th>
            <th className="pb-1">Verdict</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className={
              choice === 'low' && lowBetter ? 'text-success font-bold' : ''
            }>
            <td>Low</td>
            <td>{formatWealth(lowExp)}</td>
            <td>
              {lowBetter && '✓ Better'}
              {!lowBetter && choice === 'low' && '← You chose'}
            </td>
          </tr>
          <tr
            className={
              choice === 'high' && !lowBetter ? 'text-success font-bold' : ''
            }>
            <td>High</td>
            <td>{formatWealth(highExp)}</td>
            <td>
              {!lowBetter && '✓ Better'}
              {lowBetter && choice === 'high' && '← You chose'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
