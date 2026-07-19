import type { FC } from 'react';
import type { CompareRound } from './types';

export const ComparePhase: FC<{
  compareRound: number;
  onSelect: (offer: string) => void;
}> = ({ compareRound, onSelect }) => (
  <div className="flex flex-col gap-4">
    <h2 className="text-lg font-bold">Investment Comparison</h2>
    <p className="text-base-content/60 text-sm">
      Round {compareRound + 1} of 3 — which offer has the higher future value?
    </p>
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onSelect('offer-a')}
        data-testid="offer-a"
        className="card border-base-content/10 hover:border-primary border p-4 text-left transition-colors">
        <div className="font-bold">Offer A</div>
      </button>
      <button
        type="button"
        onClick={() => onSelect('offer-b')}
        data-testid="offer-b"
        className="card border-base-content/10 hover:border-primary border p-4 text-left transition-colors">
        <div className="font-bold">Offer B</div>
      </button>
    </div>
  </div>
);
ComparePhase.displayName = 'ComparePhase';

export const AnnuityPhase: FC<{ onAnswer: (answer: string) => void }> = ({
  onAnswer,
}) => (
  <div className="flex flex-col gap-4">
    <h2 className="text-lg font-bold">Annuity vs Lump Sum</h2>
    <div className="card border-base-content/10 border p-4 text-sm">
      <p className="mb-2">
        <strong>Option A (Annuity):</strong> Receive $500/year for 10 years at
        6%
      </p>
      <p>
        <strong>Option B (Lump Sum):</strong> Receive $3,500 today
      </p>
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onAnswer('annuity')}
        data-testid="offer-a"
        className="btn btn-outline btn-sm">
        Choose Annuity ($500/yr × 10)
      </button>
      <button
        type="button"
        onClick={() => onAnswer('lump-sum')}
        data-testid="offer-b"
        className="btn btn-outline btn-sm">
        Choose Lump Sum ($3,500)
      </button>
    </div>
  </div>
);
AnnuityPhase.displayName = 'AnnuityPhase';

export const NpvPhase: FC<{ onAnswer: (answer: string) => void }> = ({
  onAnswer,
}) => (
  <div className="flex flex-col gap-4" data-testid="npv">
    <h2 className="text-lg font-bold">Net Present Value</h2>
    <div className="card border-base-content/10 border p-4 text-sm">
      <p className="mb-1">Project cash flows (discount rate 5%):</p>
      <p>
        Year 0: -$1,000 → Year 1: +$300 → Year 2: +$400 → Year 3: +$400 → Year
        4: +$500
      </p>
    </div>
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onAnswer('accept')}
        data-testid="accept"
        className="btn btn-success btn-sm">
        Accept (NPV {'>'} 0)
      </button>
      <button
        type="button"
        onClick={() => onAnswer('reject')}
        data-testid="reject"
        className="btn btn-error btn-sm">
        Reject (NPV ≤ 0)
      </button>
    </div>
  </div>
);
NpvPhase.displayName = 'NpvPhase';

export const ResultsPhase: FC<{
  score: number;
  total: number;
  compareData: CompareRound[];
  annuityCorrect: boolean;
  npvCorrect: boolean;
  onReset: () => void;
}> = ({ score, total, compareData, annuityCorrect, npvCorrect, onReset }) => (
  <div className="flex flex-col items-center gap-4 py-6">
    <div className="text-4xl">📊</div>
    <h2 className="text-xl font-bold">Results</h2>
    <div className="text-lg">
      Score: <strong>{score}</strong> / {total}
    </div>
    <div className="flex flex-col gap-1 text-sm">
      {compareData.map((r, i) => (
        <div
          key={i}
          className={r.correctChoice ? 'text-success' : 'text-error'}>
          Comparison {i + 1}: {r.correctChoice ? 'Correct' : 'Wrong'}
        </div>
      ))}
      <div className={annuityCorrect ? 'text-success' : 'text-error'}>
        Annuity: {annuityCorrect ? 'Correct' : 'Wrong'}
      </div>
      <div className={npvCorrect ? 'text-success' : 'text-error'}>
        NPV: {npvCorrect ? 'Correct' : 'Wrong'}
      </div>
    </div>
    <button
      type="button"
      onClick={onReset}
      data-testid="reset"
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);
ResultsPhase.displayName = 'ResultsPhase';
