'use client';

import { FC } from 'react';
import {
  Readout,
  Slider,
  TariffOptions,
  MarketContext,
  currency,
  fmt,
  kindLabel,
  objective,
  pct,
} from './components';
import { TariffChart } from './chart';
import { RetaliationMatrix } from './retaliation';
import {
  TARIFF_MAX,
  TARIFF_MIN,
  TARIFF_STEP,
  TOTAL_ROUNDS,
  WORLD_PRICE_MAX,
  WORLD_PRICE_MIN,
  WORLD_PRICE_STEP,
} from './constants';
import type { Analysis, Market, RoundResult, RoundSpec } from './types';

export const LabPanel: FC<{
  market: Market;
  analysis: Analysis;
  tariff: number;
  onWorldPrice: (v: number) => void;
  onTariff: (v: number) => void;
  onStart: () => void;
  onReset: () => void;
}> = ({
  market,
  analysis,
  tariff,
  onWorldPrice,
  onTariff,
  onStart,
  onReset,
}) => (
  <div className="flex flex-col gap-4">
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
        <h2 className="text-sm font-semibold">Policy levers</h2>
        <Slider
          label="World price (Pw)"
          value={market.worldP}
          valueText={currency(market.worldP)}
          min={WORLD_PRICE_MIN}
          max={WORLD_PRICE_MAX}
          step={WORLD_PRICE_STEP}
          testId="world-price"
          onChange={onWorldPrice}
        />
        <Slider
          label="Tariff (share of Pw)"
          value={tariff}
          valueText={pct(tariff)}
          min={TARIFF_MIN}
          max={TARIFF_MAX}
          step={TARIFF_STEP}
          testId="tariff"
          onChange={onTariff}
        />
        <p className="text-base-content/60 text-xs">
          Price paid = Pw·(1+t). Imports = Qd(Pw·(1+t)) − Qs(Pw·(1+t)).
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onStart}
            data-testid="start-rounds"
            className="btn btn-primary btn-sm">
            Start the tariff game
          </button>
          <button
            type="button"
            onClick={onReset}
            data-testid="reset"
            className="btn btn-outline btn-sm">
            Reset
          </button>
        </div>
      </div>
      <div className="card border-base-content/10 p-4">
        <TariffChart market={market} analysis={analysis} />
      </div>
    </div>
    <div className="card border-base-content/10 flex flex-col gap-2 border p-4 text-sm">
      {(
        [
          ['Price after tariff', 'price-after', currency(analysis.priceAfter)],
          ['Imports', 'imports', fmt(analysis.imports)],
          [
            'Consumer surplus',
            'consumer-surplus',
            currency(analysis.consumerSurplus),
          ],
          [
            'Producer surplus',
            'producer-surplus',
            currency(analysis.producerSurplus),
          ],
          ['Government revenue', 'revenue', currency(analysis.revenue)],
          [
            'Deadweight loss',
            'deadweight-loss',
            currency(analysis.deadweightLoss),
          ],
        ] as const
      ).map(([label, testId, value]) => (
        <Readout key={testId} label={label} testId={testId}>
          {value}
        </Readout>
      ))}
    </div>
  </div>
);

export const ChallengePanel: FC<{
  round: number;
  spec: RoundSpec;
  pending: number | null;
  onSelect: (t: number) => void;
  onCheck: () => void;
}> = ({ round, spec, pending, onSelect, onCheck }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <p className="text-sm">
      Round <strong>{round}</strong> / {TOTAL_ROUNDS} — {kindLabel(spec.kind)}
    </p>
    <p className="text-lg font-semibold" data-testid="challenge-objective">
      {objective(spec)}
    </p>
    {spec.market && <MarketContext market={spec.market} />}
    <TariffOptions
      options={spec.options}
      selected={pending}
      onSelect={onSelect}
    />
    <button
      type="button"
      onClick={onCheck}
      disabled={pending === null}
      data-testid="check"
      className="btn btn-primary btn-sm w-fit">
      Check answer
    </button>
  </div>
);

export const RevealPanel: FC<{
  result: RoundResult;
  my: number;
  other: number;
  isRetaliation: boolean;
  onNext: () => void;
}> = ({ result, my, other, isRetaliation, onNext }) => (
  <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-4">
    <div className="text-2xl">
      {result.score >= 90 ? '🥇' : result.score >= 60 ? '👍' : '📉'}
    </div>
    <p className="text-sm">
      {kindLabel(result.kind)} — you chose <strong>{pct(result.chosen)}</strong>
      ; the best answer was <strong>{pct(result.answer)}</strong>.
    </p>
    <p className="text-lg font-bold" data-testid="score">
      Score: {fmt(result.score)} / 100
    </p>
    {isRetaliation && <RetaliationMatrix my={my} other={other} reveal />}
    <button
      type="button"
      onClick={onNext}
      data-testid="next-round"
      className="btn btn-primary btn-sm">
      {result.round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
    </button>
  </div>
);

export const SummaryPanel: FC<{
  results: RoundResult[];
  totalScore: number;
  onReset: () => void;
}> = ({ results, totalScore, onReset }) => (
  <div className="flex flex-col items-center gap-3">
    <div className="text-4xl">📊</div>
    <p className="text-lg">Trade & Tariff Lab — results</p>
    <p className="text-lg font-bold" data-testid="total-accuracy">
      Total accuracy: {fmt(Math.round(totalScore / TOTAL_ROUNDS))} / 100
    </p>
    <div className="w-full max-w-md overflow-x-auto">
      <table className="table-sm table text-center">
        <thead>
          <tr>
            <th>Round</th>
            <th>Kind</th>
            <th>Choice</th>
            <th>Best</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.round}>
              <td>{r.round}</td>
              <td>{kindLabel(r.kind)}</td>
              <td>{pct(r.chosen)}</td>
              <td>{pct(r.answer)}</td>
              <td>{fmt(r.score)}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
