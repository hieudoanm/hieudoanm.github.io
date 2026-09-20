import type { FC } from 'react';
import { OkunEquation, SliderField } from '../components';
import {
  C_MAX,
  C_MIN,
  C_STEP,
  G_STAR_MAX,
  G_STAR_MIN,
  G_STAR_STEP,
  U_STAR_MAX,
  U_STAR_MIN,
  U_STAR_STEP,
} from '../constants';
import type { ModelParams } from '../types';

export const IntroPanel: FC<{
  model: ModelParams;
  onGStar: (value: number) => void;
  onCoef: (value: number) => void;
  onUStar: (value: number) => void;
  onSteer: () => void;
  onEstimate: () => void;
}> = ({ model, onGStar, onCoef, onUStar, onSteer, onEstimate }) => (
  <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
    <OkunEquation model={model} />
    <SliderField
      label="Potential growth g*"
      testid="potential-growth"
      min={G_STAR_MIN}
      max={G_STAR_MAX}
      step={G_STAR_STEP}
      value={model.gStar}
      onChange={onGStar}
    />
    <SliderField
      label="Okun coefficient c"
      testid="okun-coef"
      min={C_MIN}
      max={C_MAX}
      step={C_STEP}
      value={model.c}
      suffix=""
      decimals={2}
      onChange={onCoef}
    />
    <SliderField
      label="Natural rate u*"
      testid="natural-rate"
      min={U_STAR_MIN}
      max={U_STAR_MAX}
      step={U_STAR_STEP}
      value={model.uStar}
      onChange={onUStar}
    />
    <div className="grid gap-2 sm:grid-cols-2">
      <button
        type="button"
        onClick={onSteer}
        className="btn btn-primary btn-sm">
        Steady the Rate
      </button>
      <button
        type="button"
        onClick={onEstimate}
        className="btn btn-outline btn-sm">
        Estimate the Coefficient
      </button>
    </div>
  </div>
);
