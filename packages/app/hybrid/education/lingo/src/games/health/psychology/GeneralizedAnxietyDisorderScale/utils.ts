export interface GadOption {
  value: number;
  label: string;
}

export interface GadItem {
  id: number;
  text: string;
}

export interface GadInterpretation {
  label: string;
  range: string;
}

export const GAD_OPTIONS: GadOption[] = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
];

export const GAD_ITEMS: GadItem[] = [
  { id: 1, text: 'Feeling nervous, anxious, or on edge' },
  { id: 2, text: 'Not being able to stop or control worrying' },
  { id: 3, text: 'Worrying too much about different things' },
  { id: 4, text: 'Trouble relaxing' },
  { id: 5, text: "Being so restless that it's hard to sit still" },
  { id: 6, text: 'Becoming easily annoyed or irritable' },
  { id: 7, text: 'Feeling afraid, as if something awful might happen' },
];

export const GAD_MAX = 21;

export const computeGadScore = (responses: number[]): number =>
  responses.reduce((total, value) => total + Math.max(value, 0), 0);

export const interpretGadScore = (score: number): GadInterpretation => {
  if (score >= 15) return { label: 'Severe anxiety', range: '15–21' };
  if (score >= 10) return { label: 'Moderate anxiety', range: '10–14' };
  if (score >= 5) return { label: 'Mild anxiety', range: '5–9' };
  return { label: 'Minimal anxiety', range: '0–4' };
};
