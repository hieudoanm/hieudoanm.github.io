export interface PhqOption {
  value: number;
  label: string;
}

export interface PhqItem {
  id: number;
  text: string;
}

export interface PhqInterpretation {
  label: string;
  range: string;
}

export const PHQ_OPTIONS: PhqOption[] = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
];

export const PHQ_ITEMS: PhqItem[] = [
  { id: 1, text: 'Little interest or pleasure in doing things' },
  { id: 2, text: 'Feeling down, depressed, or hopeless' },
  { id: 3, text: 'Trouble falling or staying asleep, or sleeping too much' },
  { id: 4, text: 'Feeling tired or having little energy' },
  { id: 5, text: 'Poor appetite or overeating' },
  {
    id: 6,
    text: 'Feeling bad about yourself, or that you are a failure or have let yourself or your family down',
  },
  {
    id: 7,
    text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
  },
  {
    id: 8,
    text: 'Moving or speaking so slowly that other people could have noticed. Or the opposite, being so fidgety or restless that you have been moving around a lot more than usual',
  },
  {
    id: 9,
    text: 'Thoughts that you would be better off dead, or of hurting yourself in some way',
  },
];

export const PHQ_MAX = 27;

export const computePhqScore = (responses: number[]): number =>
  responses.reduce((total, value) => total + Math.max(value, 0), 0);

export const interpretPhqScore = (score: number): PhqInterpretation => {
  if (score >= 20) return { label: 'Severe depression', range: '20–27' };
  if (score >= 15)
    return { label: 'Moderately severe depression', range: '15–19' };
  if (score >= 10) return { label: 'Moderate depression', range: '10–14' };
  if (score >= 5) return { label: 'Mild depression', range: '5–9' };
  return { label: 'None–minimal depression', range: '0–4' };
};

export const hasPhqSelfHarmThoughts = (responses: number[]): boolean =>
  (responses[8] ?? 0) > 0;
