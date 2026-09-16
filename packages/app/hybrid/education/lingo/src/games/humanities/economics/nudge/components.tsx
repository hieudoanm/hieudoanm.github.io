import type { FC } from 'react';
import {
  DESIGN_BLURBS,
  DESIGN_LABELS,
  DESIGN_ORDER,
  MECHANISM_LABELS,
} from './constants';
import type { Design, DomainScript, RoundReport } from './types';

const pct = (rate: number): string => `${Math.round(rate * 100)}%`;

export const BaselineRates: FC<{ domain: DomainScript }> = ({ domain }) => (
  <div className="stats stats-sm">
    <div className="stat">
      <div className="stat-title">Opt-in rate</div>
      <div className="stat-value text-sm" data-testid="opt-in-rate">
        {pct(domain.optIn)}
      </div>
    </div>
    <div className="stat">
      <div className="stat-title">Opt-out rate</div>
      <div className="stat-value text-sm" data-testid="opt-out-rate">
        {pct(domain.optOut)}
      </div>
    </div>
    <div className="stat">
      <div className="stat-title">Active-choice rate</div>
      <div className="stat-value text-sm" data-testid="active-rate">
        {pct(domain.activeChoice)}
      </div>
    </div>
  </div>
);

export const DesignPicker: FC<{
  value: Design;
  onChange: (design: Design) => void;
}> = ({ value, onChange }) => (
  <div className="grid grid-cols-2 gap-2" data-testid="design">
    {DESIGN_ORDER.map((id) => (
      <button
        key={id}
        type="button"
        onClick={() => onChange(id)}
        data-testid={`design-${id}`}
        className={
          value === id ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'
        }>
        {DESIGN_LABELS[id]}
      </button>
    ))}
  </div>
);

export const InertiaSlider: FC<{
  value: number;
  onChange: (inertia: number) => void;
}> = ({ value, onChange }) => (
  <label className="flex flex-col gap-1 text-sm">
    <span>
      Inertia <strong>{value}</strong>/100 — the strength of status-quo behavior
    </span>
    <input
      type="range"
      min={0}
      max={100}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      data-testid="inertia"
      className="range range-primary range-sm w-full"
    />
  </label>
);

export const RoundCard: FC<{
  round: number;
  total: number;
  domain: DomainScript;
  design: Design;
  onDesign: (design: Design) => void;
  inertia: number;
  onInertia: (inertia: number) => void;
  hits: number;
  onCheck: () => void;
}> = ({
  round,
  total,
  domain,
  design,
  onDesign,
  inertia,
  onInertia,
  hits,
  onCheck,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
      <span>
        {domain.emoji} Scenario {round}/{total}: <strong>{domain.label}</strong>
      </span>
      <span>
        Targets hit: <strong>{hits}</strong>
      </span>
    </div>
    <p className="text-base-content/70 text-sm">{domain.context}</p>
    <BaselineRates domain={domain} />
    <DesignPicker value={design} onChange={onDesign} />
    <p className="text-base-content/60 text-xs">{DESIGN_BLURBS[design]}</p>
    <InertiaSlider value={inertia} onChange={onInertia} />
    <button
      type="button"
      onClick={onCheck}
      data-testid="check"
      className="btn btn-primary btn-sm self-end">
      Check participation
    </button>
  </div>
);

export const RevealPanel: FC<{
  report: RoundReport;
  isLast: boolean;
  onNext: () => void;
}> = ({ report, isLast, onNext }) => (
  <div
    className="card border-base-content/10 flex flex-col items-center gap-3 border p-4 text-center"
    data-testid="reveal">
    <div className="text-3xl">{report.hitTarget ? '🎯' : '📉'}</div>
    <div className="text-lg">
      Participation with {DESIGN_LABELS[report.design]}:{' '}
      <strong data-testid="participation">{report.participation}%</strong>
    </div>
    <div className="text-sm" data-testid="hit-status">
      Target {report.target}% —{' '}
      {report.hitTarget ? 'target hit' : 'target missed'}
    </div>
    <div
      className="alert alert-info max-w-lg py-2 text-left text-sm"
      data-testid="mechanism">
      <strong>{MECHANISM_LABELS[report.mechanism]}.</strong>{' '}
      {report.mechanismText}
    </div>
    <p className="text-base-content/60 text-sm">
      Textbook recommendation:{' '}
      <strong>{DESIGN_LABELS[report.recommendedDesign]}</strong> (typical
      participation ≈ {report.recommendedParticipation}%)
    </p>
    <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
      {isLast ? 'Try the Auto-enroll Simulator' : 'Next Scenario'}
    </button>
  </div>
);
