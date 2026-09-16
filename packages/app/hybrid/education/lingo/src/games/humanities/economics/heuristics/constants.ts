import type { RoundItem } from './types';

export const GAME_TITLE = 'Heuristics Lab';

export const TOTAL_ROUNDS = 6;

export const MAX_SCORE = TOTAL_ROUNDS * 2;

export const BASE_LABEL = 'Chance that Linda is a bank teller (%)';

export const OVERLAP_LABEL =
  'Chance that Linda is a bank teller AND active in the feminist movement (%)';

export const SCORE_LABELS: Record<number, string> = {
  2: 'Within 25% of the true answer — +2 points',
  1: 'Within 50% of the true answer — +1 point',
  0: 'More than 50% off — 0 points',
};

export const CONJUNCTION_LABELS: Record<number, string> = {
  2: 'P(A and B) ≤ P(A) — conjunction respected — +2 points',
  0: 'P(A and B) was HIGHER than P(A) — impossible — 0 points',
};

export const ROUNDS: RoundItem[] = [
  {
    id: 'africa-countries',
    kind: 'anchored',
    question: 'How many countries are in Africa?',
    story:
      'Before you answer, here is a random number. This number carries no information — or does it?',
    anchor: 120,
    anchorText: 'A random number between 1 and 200: 120',
    trueAnswer: 54,
    unit: 'countries',
    lesson:
      'Anchoring: the random 120 pulled most guesses up toward it. The true answer is 54 countries — anchors work even when they carry no information.',
  },
  {
    id: 'hurricane-sandy',
    kind: 'anchored',
    question:
      'How many people died in Hurricane Sandy (direct and indirect deaths)?',
    story: 'Same trick as before — study this number, then answer.',
    anchor: 500,
    anchorText: 'A random number between 1 and 1000: 500',
    trueAnswer: 233,
    unit: 'deaths',
    lesson:
      'Anchoring again: a random 500 outweighed reality. Hurricane Sandy killed about 233 people (direct and indirect deaths combined).',
  },
  {
    id: 'words-start-r',
    kind: 'availability',
    question:
      'What percentage of 5-letter English words start with the letter R?',
    story:
      'River, round, right… think of a random 5-letter word. How easy is R at the start to recall?',
    anchor: null,
    anchorText: null,
    trueAnswer: 6,
    unit: '% of words',
    lesson:
      'Availability: words beginning with R jump to mind, so people overestimate. Only about 6% of 5-letter words start with R.',
  },
  {
    id: 'words-start-k',
    kind: 'availability',
    question:
      'What percentage of 3-letter English words start with the letter K?',
    story:
      'Key, kit, kid — these spring to mind easily. But think of all the 3-letter words where K sits elsewhere.',
    anchor: null,
    anchorText: null,
    trueAnswer: 2,
    unit: '% of words',
    lesson:
      'Availability: starting-K words spring to mind easily. Yet only about 2% of 3-letter words begin with K.',
  },
  {
    id: 'linda-conjunction',
    kind: 'representativeness',
    question:
      'Linda is 31, single, outspoken, and very bright. In college she majored in philosophy and she cared deeply about social justice.',
    story:
      'Estimate two chances. Your second estimate must not exceed your first — the conjunction can never be more likely than its parts.',
    anchor: null,
    anchorText: null,
    trueAnswer: 35,
    unit: '%',
    trueText: 'a benchmark P(bank teller) of around 35%',
    lesson:
      'The conjunction is never more likely than one of its parts: P(bank teller and feminist) ≤ P(bank teller). A self-controlled second guess never exceeds the first.',
  },
  {
    id: 'nyc-rain',
    kind: 'control',
    question: 'How many inches of rain did New York City get in 2024?',
    story: 'No random number this time — just your honest, unanchored guess.',
    anchor: null,
    anchorText: null,
    trueAnswer: 50,
    unit: 'inches',
    lesson:
      'This control round had no anchor at all. For reference, NYC recorded about 50 inches of rain in 2024.',
  },
];
