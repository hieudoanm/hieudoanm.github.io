'use client';

import { FC, useCallback, useState } from 'react';
import {
  A_MAX,
  A_MIN,
  A_STEP,
  C_MAX,
  C_MIN,
  C_STEP,
  CEILING_STEP,
  FLOOR_STEP,
  INITIAL_STATE,
  PRICE_STEP,
} from './constants';
import {
  ConditionBadge,
  currency,
  fmt,
  MarketChart,
  Readout,
  Slider,
} from './components';
import {
  demandAt,
  effectivePrice,
  elasticityAt,
  equilibriumPrice,
  equilibriumQuantity,
  gap,
  marketCondition,
  maxAffordablePrice,
  supplyAt,
  totalSurplusAt,
} from './game';
import type { ExplorerState } from './types';

export const PriceLab: FC = () => {
  const [state, setState] = useState<ExplorerState>(INITIAL_STATE);
  const { a, b, c, price, floorEnabled, ceilingEnabled, floor, ceiling } =
    state;

  const setParams = useCallback((partial: Partial<ExplorerState>): void => {
    setState((s) => {
      const next = { ...s, ...partial };
      const cap = maxAffordablePrice(next.a, next.b);
      return {
        ...next,
        price: Math.min(next.price, cap),
        floor: Math.min(next.floor, cap),
        ceiling: Math.min(next.ceiling, cap),
      };
    });
  }, []);

  const pStar = equilibriumPrice(a, b, c);
  const qStar = equilibriumQuantity(a, b, c);
  const effPrice = effectivePrice(
    price,
    floorEnabled,
    floor,
    ceilingEnabled,
    ceiling
  );
  const sliderMax = Math.max(1, Math.floor(maxAffordablePrice(a, b)));
  const qd = demandAt(effPrice, a, b);
  const qs = supplyAt(effPrice, c);
  const gapValue = gap(effPrice, a, b, c);
  const condition = marketCondition(gapValue);
  const elasticity = elasticityAt(a, b, c);
  const surplus = totalSurplusAt(a, b, c);
  const maxQ = Math.max(qd, qs, qStar, 1);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
          <h2 className="text-base-content/80 text-sm font-semibold">Curves</h2>
          <Slider
            label="Demand intercept (a)"
            value={a}
            valueText={String(a)}
            min={A_MIN}
            max={A_MAX}
            step={A_STEP}
            testId="a-slider"
            onChange={(v) => setParams({ a: v })}
          />
          <Slider
            label="Supply slope (c)"
            value={c}
            valueText={c.toFixed(1)}
            min={C_MIN}
            max={C_MAX}
            step={C_STEP}
            testId="c-slider"
            onChange={(v) => setParams({ c: v })}
          />
          <div className="divider my-1 text-xs">Market price</div>
          <Slider
            label="Market price (P)"
            value={price}
            valueText={String(price)}
            min={0}
            max={sliderMax}
            step={PRICE_STEP}
            testId="price-slider"
            onChange={(v) => setParams({ price: v })}
          />
          <Slider
            label="Floor level"
            value={floor}
            valueText={currency(floor)}
            min={0}
            max={sliderMax}
            step={FLOOR_STEP}
            testId="floor-slider"
            toggleTestId="floor-enabled"
            enabled={floorEnabled}
            onChange={(v) => setParams({ floor: v })}
            onToggle={(checked) => setParams({ floorEnabled: checked })}
          />
          <Slider
            label="Ceiling level"
            value={ceiling}
            valueText={currency(ceiling)}
            min={0}
            max={sliderMax}
            step={CEILING_STEP}
            testId="ceiling-slider"
            toggleTestId="ceiling-enabled"
            enabled={ceilingEnabled}
            onChange={(v) => setParams({ ceiling: v })}
            onToggle={(checked) => setParams({ ceilingEnabled: checked })}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
            <h2 className="text-base-content/80 text-sm font-semibold">
              Quantities at P = {currency(effPrice)}
            </h2>
            <MarketChart qd={qd} qs={qs} qStar={qStar} />
          </div>

          <div className="card border-base-content/10 flex flex-col gap-2 border p-4 text-sm">
            <Readout label="Equilibrium price P*" testId="equilibrium-price">
              {currency(pStar)}
            </Readout>
            <Readout
              label="Equilibrium quantity Q*"
              testId="equilibrium-quantity">
              {fmt(qStar, 0)}
            </Readout>
            <Readout label="Effective price P" testId="effective-price">
              {currency(effPrice)}
            </Readout>
            <Readout label="Demand slope (b)" testId="demand-slope">
              {b.toFixed(2)}
            </Readout>
            <Readout label="Total surplus at P*" testId="total-surplus">
              {currency(surplus)}
            </Readout>
            <Readout label="Gap (Qd − Qs)" testId="gap-value">
              {fmt(gapValue, 0)}
            </Readout>
            <ConditionBadge condition={condition} />
            <p
              data-testid="elasticity-readout"
              className="text-base-content/60 text-xs">
              Elasticity at market price is {fmt(elasticity, 2)} — the higher
              the slope of demand, the more elastic.
            </p>
            <p
              data-testid="condition-note"
              className="text-base-content/60 text-xs">
              {condition === 'shortage'
                ? 'Price is below equilibrium, so demand exceeds supply and a shortage piles up.'
                : condition === 'surplus'
                  ? 'Price is above equilibrium, so supply exceeds demand and a surplus piles up.'
                  : 'Price is at equilibrium: quantity demanded matches quantity supplied.'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={() => setState(INITIAL_STATE)}
          data-testid="reset"
          className="btn btn-outline btn-sm">
          Reset
        </button>
      </div>
    </div>
  );
};

PriceLab.displayName = 'PriceLab';
