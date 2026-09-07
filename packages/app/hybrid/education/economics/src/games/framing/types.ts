export type Choice = 'X' | 'Y';
export type Phase = 'question' | 'reveal' | 'done';
export type ScenarioId = 'A' | 'B';

export interface Scenario {
  id: ScenarioId;
  title: string;
  context: string;
  programX: string;
  programY: string;
}
