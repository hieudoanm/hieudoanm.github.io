import type { FC } from 'react';
import {
  GOV_MAX,
  INVEST_MAX,
  MPC_MAX,
  MPC_MIN,
  MPC_STEP,
  TOTAL_ROUNDS,
} from './constants';
import { SliderField, StatBox, formatMpc, formatNum } from './primitives';

export const ExploreSliders: FC<{
  mpc: number;
  a: number;
  investment: number;
  government: number;
  onChangeMpc: (value: number) => void;
  onChangeA: (value: number) => void;
  onChangeInvestment: (value: number) => void;
  onChangeGovernment: (value: number) => void;
}> = ({
  mpc,
  a,
  investment,
  government,
  onChangeMpc,
  onChangeA,
  onChangeInvestment,
  onChangeGovernment,
}) => (
  <div className="grid gap-4 md:grid-cols-2">
    <SliderField
      label="Marginal propensity to consume (MPC)"
      testId="mpc"
      value={mpc}
      min={MPC_MIN}
      max={MPC_MAX}
      step={MPC_STEP}
      onChange={onChangeMpc}
      display={formatMpc(mpc)}
    />
    <SliderField
      label="Autonomous consumption (a)"
      testId="autonomous-c"
      value={a}
      min={0}
      max={100}
      step={1}
      onChange={onChangeA}
    />
    <SliderField
      label="Investment (I)"
      testId="investment"
      value={investment}
      min={0}
      max={INVEST_MAX}
      step={1}
      onChange={onChangeInvestment}
    />
    <SliderField
      label="Government (G)"
      testId="government"
      value={government}
      min={0}
      max={GOV_MAX}
      step={1}
      onChange={onChangeGovernment}
    />
  </div>
);

export const ExploreOutputs: FC<{
  equilibrium: number;
  multiplier: number;
  planned: number;
  unplanned: number;
}> = ({ equilibrium, multiplier, planned, unplanned }) => (
  <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
    <StatBox
      label="Equilibrium output Y*"
      value={formatNum(equilibrium)}
      testId="equilibrium-output"
    />
    <StatBox
      label="Multiplier 1/(1−MPC)"
      value={formatNum(multiplier)}
      testId="multiplier"
    />
    <StatBox
      label="Planned expenditure"
      value={formatNum(planned)}
      testId="planned-expenditure"
    />
    <StatBox
      label="Unplanned inventory change"
      value={formatNum(unplanned)}
      testId="unplanned-inventory"
    />
  </div>
);

export const ExplorePanel: FC<{
  mpc: number;
  a: number;
  investment: number;
  government: number;
  equilibrium: number;
  multiplier: number;
  planned: number;
  unplanned: number;
  onChangeMpc: (value: number) => void;
  onChangeA: (value: number) => void;
  onChangeInvestment: (value: number) => void;
  onChangeGovernment: (value: number) => void;
  onStart: () => void;
}> = ({
  mpc,
  a,
  investment,
  government,
  equilibrium,
  multiplier,
  planned,
  unplanned,
  onChangeMpc,
  onChangeA,
  onChangeInvestment,
  onChangeGovernment,
  onStart,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
    <p className="text-sm">
      Planned expenditure is <strong>E = C + I + G = a + MPC·Y + I + G</strong>.
      Drag the sliders and find the equilibrium where output meets spending
      along the 45° line.
    </p>
    <ExploreSliders
      mpc={mpc}
      a={a}
      investment={investment}
      government={government}
      onChangeMpc={onChangeMpc}
      onChangeA={onChangeA}
      onChangeInvestment={onChangeInvestment}
      onChangeGovernment={onChangeGovernment}
    />
    <ExploreOutputs
      equilibrium={equilibrium}
      multiplier={multiplier}
      planned={planned}
      unplanned={unplanned}
    />
    <p className="text-base-content/60 text-xs">
      At equilibrium, planned expenditure equals actual output, so the unplanned
      inventory change is zero. Output above Y* builds inventories; output below
      it runs them down.
    </p>
    <button
      type="button"
      onClick={onStart}
      data-testid="start-challenge"
      className="btn btn-primary btn-sm self-start">
      Output Gap Challenge
    </button>
  </div>
);

export const RoundHeader: FC<{
  round: number;
  target: number;
  gap: number;
  totalScore: number;
  onReset: () => void;
}> = ({ round, target, gap, totalScore, onReset }) => (
  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
    <span>
      Round <strong>{round}</strong> / {TOTAL_ROUNDS}
    </span>
    <span>
      Target output: <strong>{formatNum(target)}</strong>
    </span>
    <span data-testid="gap">
      Output gap: <strong className="text-error">{formatNum(gap)}</strong>
    </span>
    <span>
      Score: <strong>{formatNum(totalScore)}</strong>
    </span>
    <button
      type="button"
      onClick={onReset}
      data-testid="reset"
      className="btn btn-ghost btn-sm">
      Reset
    </button>
  </div>
);
