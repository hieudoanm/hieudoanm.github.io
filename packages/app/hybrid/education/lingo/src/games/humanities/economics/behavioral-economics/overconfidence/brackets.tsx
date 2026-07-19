import { FC } from 'react';

export const SliderCard: FC<{
  low: string;
  high: string;
  canSubmit: boolean;
  onLow: (v: string) => void;
  onHigh: (v: string) => void;
  onSubmit: () => void;
}> = ({ low, high, canSubmit, onLow, onHigh, onSubmit }) => (
  <div
    data-testid="slider"
    className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <h2 className="text-primary text-lg font-bold">Range Estimation</h2>
    <p className="text-base-content/60 text-sm">
      Guess a 95% bracket for the length of the Nile (km). A well-calibrated
      bracket contains the true value 95% of the time &mdash; too-narrow
      brackets reveal over-precision.
    </p>
    <div className="flex flex-wrap items-center gap-2">
      <label className="text-sm">Low (km):</label>
      <input
        type="number"
        value={low}
        onChange={(e) => onLow(e.target.value)}
        data-testid="bracket-low"
        className="input input-sm input-bordered w-28"
      />
      <label className="text-sm">High (km):</label>
      <input
        type="number"
        value={high}
        onChange={(e) => onHigh(e.target.value)}
        data-testid="bracket-high"
        className="input input-sm input-bordered w-28"
      />
    </div>
    <button
      type="button"
      data-testid="next"
      onClick={onSubmit}
      disabled={!canSubmit}
      className="btn btn-primary btn-sm self-start">
      Check Bracket
    </button>
  </div>
);

export const SliderResultCard: FC<{
  inRange: boolean;
  onNext: () => void;
}> = ({ inRange, onNext }) => (
  <div
    data-testid="slider-result"
    className="card border-base-content/10 flex flex-col items-center gap-3 border p-4 py-6 text-center">
    <div className="text-4xl">{inRange ? '\u2705' : '\u274c'}</div>
    <p className="text-lg font-bold">
      {inRange
        ? 'The Nile was inside your bracket.'
        : 'The Nile fell outside your bracket.'}
    </p>
    <p className="text-base-content/60 text-sm">
      The Nile is about 6,650 km. If most people&rsquo;s 95% brackets miss it,
      they are overconfident in their precision.
    </p>
    <button
      type="button"
      data-testid="next"
      onClick={onNext}
      className="btn btn-primary btn-sm">
      See Conclusion
    </button>
  </div>
);

export const DoneCard: FC<{ onReset: () => void }> = ({ onReset }) => (
  <div
    data-testid="done"
    className="card border-base-content/10 flex flex-col items-center gap-3 border p-4 py-6 text-center">
    <div className="text-4xl">📊</div>
    <h2 className="text-primary text-lg font-bold">
      Calibration, not Charisma
    </h2>
    <p className="text-base-content/60 max-w-md text-sm">
      Overconfidence looks like certainty but shows up as an accuracy gap: you
      claim 90%, deliver 70%, and size market positions as if the 90% were real.
      Calibrate by tracking your confidence against outcomes.
    </p>
    <button
      type="button"
      data-testid="reset"
      onClick={onReset}
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);
