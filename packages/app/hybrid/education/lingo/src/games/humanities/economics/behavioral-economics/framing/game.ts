import { SCENARIOS } from './constants';
import type { Choice, ScenarioId, Scenario } from './types';

export const frameOk = (gainChoice: Choice, lossChoice: Choice): boolean =>
  gainChoice === 'X' && lossChoice === 'Y';

export const scenarioLabel = (id: ScenarioId): string => {
  const scenario = SCENARIOS.find((s) => s.id === id);
  if (!scenario) return String(id);
  return scenario.title;
};

export const findScenario = (id: ScenarioId): Scenario => {
  const scenario = SCENARIOS.find((s) => s.id === id);
  if (!scenario) throw new Error(`Unknown scenario: ${id}`);
  return scenario;
};
