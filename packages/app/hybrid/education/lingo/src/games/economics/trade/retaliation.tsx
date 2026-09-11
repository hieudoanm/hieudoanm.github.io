'use client';

import { FC } from 'react';
import { Readout, Slider, fmt, kindLabel, objective, pct } from './components';
import {
  NASH_TARIFF,
  RETALIATION_LEVELS,
  RETALIATION_MAX,
  RETALIATION_MIN,
  RETALIATION_STEP,
  TOTAL_ROUNDS,
} from './constants';
import { isNash, payoff, tradeVolume } from './game';

const RETALIATION_SPEC = {
  kind: 'retaliation' as const,
  options: [] as number[],
  target: 0,
};

export const RetaliationMatrix: FC<{
  my: number;
  other: number;
  reveal: boolean;
}> = ({ my, other, reveal }) => (
  <div className="overflow-x-auto">
    <p className="text-base-content/60 mb-1 text-xs">
      Your payoff / their payoff
    </p>
    <table className="table-zebra table-sm table text-center">
      <thead>
        <tr>
          <th>Your tariff</th>
          {RETALIATION_LEVELS.map((lv) => (
            <th key={lv}>{pct(lv)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {RETALIATION_LEVELS.map((myLv) => (
          <tr key={myLv}>
            <th>{pct(myLv)}</th>
            {RETALIATION_LEVELS.map((othLv) => (
              <td
                key={othLv}
                data-testid={
                  reveal && myLv === NASH_TARIFF && othLv === NASH_TARIFF
                    ? 'nash-cell'
                    : undefined
                }
                className={
                  reveal && myLv === NASH_TARIFF && othLv === NASH_TARIFF
                    ? 'bg-success/30 font-bold'
                    : myLv === my && othLv === other
                      ? 'bg-base-300'
                      : ''
                }>
                {fmt(payoff(myLv, othLv), 1)} / {fmt(payoff(othLv, myLv), 1)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const RetaliationPanel: FC<{
  my: number;
  other: number;
  onMy: (v: number) => void;
  onOther: (v: number) => void;
  onCheck: () => void;
}> = ({ my, other, onMy, onOther, onCheck }) => (
  <div
    data-testid="retaliation"
    className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <p className="text-sm">
      Round <strong>4</strong> / {TOTAL_ROUNDS} — {kindLabel('retaliation')}
    </p>
    <p className="text-lg font-semibold">{objective(RETALIATION_SPEC)}</p>
    <div className="grid gap-3 sm:grid-cols-2">
      <Slider
        label="My tariff (Home)"
        value={my}
        valueText={pct(my)}
        min={RETALIATION_MIN}
        max={RETALIATION_MAX}
        step={RETALIATION_STEP}
        testId="my-tariff"
        onChange={onMy}
      />
      <Slider
        label="Other tariff (Foreign)"
        value={other}
        valueText={pct(other)}
        min={RETALIATION_MIN}
        max={RETALIATION_MAX}
        step={RETALIATION_STEP}
        testId="other-tariff"
        onChange={onOther}
      />
    </div>
    <div className="flex flex-wrap gap-6 text-sm">
      <Readout label="Trade volume" testId="trade-volume">
        {fmt(tradeVolume(my, other))}
      </Readout>
      <Readout label="Your payoff" testId="payoff">
        {fmt(payoff(my, other), 1)} · {isNash(my, other) ? 'Nash' : 'not Nash'}
      </Readout>
    </div>
    <RetaliationMatrix my={my} other={other} reveal={false} />
    <button
      type="button"
      onClick={onCheck}
      data-testid="check"
      className="btn btn-primary btn-sm w-fit">
      Check: find the Nash tariff
    </button>
  </div>
);
