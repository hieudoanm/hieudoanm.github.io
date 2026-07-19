import type { Puzzle } from './types';

/**
 * Authored puzzles. Each puzzle partitions 16 distinct country names into
 * four groups of four; membership facts are verified in puzzles.test.ts.
 */
export const PUZZLES: readonly Puzzle[] = [
  {
    id: 1,
    groups: [
      {
        label: 'Landlocked countries',
        members: ['Nepal', 'Chad', 'Austria', 'Bolivia'],
      },
      {
        label: 'Island nations',
        members: ['Japan', 'Iceland', 'Fiji', 'Malta'],
      },
      {
        label: 'South America',
        members: ['Brazil', 'Peru', 'Guyana', 'Uruguay'],
      },
      {
        label: 'Starts with a vowel',
        members: ['Egypt', 'India', 'Oman', 'Uganda'],
      },
    ],
  },
  {
    id: 2,
    groups: [
      {
        label: 'European countries',
        members: ['France', 'Poland', 'Greece', 'Norway'],
      },
      {
        label: 'African countries',
        members: ['Kenya', 'Mali', 'Togo', 'Sudan'],
      },
      {
        label: 'Seven letters long',
        members: ['Finland', 'Jamaica', 'Albania', 'Nigeria'],
      },
      {
        label: 'Five letters long',
        members: ['Chile', 'Qatar', 'Nepal', 'Malta'],
      },
    ],
  },
  {
    id: 3,
    groups: [
      {
        label: 'Spanish is official',
        members: ['Spain', 'Mexico', 'Chile', 'Cuba'],
      },
      {
        label: 'Arabic is official',
        members: ['Egypt', 'Iraq', 'Oman', 'Yemen'],
      },
      {
        label: 'English is official',
        members: ['Kenya', 'Nigeria', 'Canada', 'Fiji'],
      },
      {
        label: 'Portuguese is official',
        members: ['Brazil', 'Portugal', 'Angola', 'Mozambique'],
      },
    ],
  },
  {
    id: 4,
    groups: [
      {
        label: 'Former Soviet states',
        members: ['Ukraine', 'Latvia', 'Georgia', 'Kazakhstan'],
      },
      {
        label: 'Microstates',
        members: ['Monaco', 'Nauru', 'Tuvalu', 'Liechtenstein'],
      },
      {
        label: 'Ends with "A"',
        members: ['Canada', 'Austria', 'Rwanda', 'Tonga'],
      },
      {
        label: 'On the Mediterranean',
        members: ['Italy', 'Tunisia', 'Syria', 'Cyprus'],
      },
    ],
  },
  {
    id: 5,
    groups: [
      {
        label: 'Nordic countries',
        members: ['Sweden', 'Denmark', 'Iceland', 'Norway'],
      },
      {
        label: 'Landlocked in Asia',
        members: ['Laos', 'Mongolia', 'Bhutan', 'Kyrgyzstan'],
      },
      {
        label: 'North America',
        members: ['Canada', 'Haiti', 'Belize', 'Panama'],
      },
      {
        label: 'Six letters long',
        members: ['Angola', 'Turkey', 'Russia', 'Zambia'],
      },
    ],
  },
  {
    id: 6,
    groups: [
      {
        label: 'The equator crosses them',
        members: ['Brazil', 'Kenya', 'Indonesia', 'Colombia'],
      },
      {
        label: 'Contains the letter G',
        members: ['Bulgaria', 'Niger', 'Senegal', 'Bangladesh'],
      },
      {
        label: 'Landlocked countries',
        members: ['Zimbabwe', 'Botswana', 'Lesotho', 'Moldova'],
      },
      {
        label: 'Population over 100 million',
        members: ['India', 'Pakistan', 'Ethiopia', 'Philippines'],
      },
    ],
  },
  {
    id: 7,
    groups: [
      {
        label: 'Western Europe',
        members: ['France', 'Portugal', 'Ireland', 'Netherlands'],
      },
      {
        label: 'East Asia',
        members: ['China', 'Mongolia', 'Japan', 'Vietnam'],
      },
      {
        label: 'Southern Africa',
        members: ['Namibia', 'Mozambique', 'Madagascar', 'Angola'],
      },
      {
        label: 'Central America',
        members: ['Guatemala', 'Nicaragua', 'Honduras', 'Panama'],
      },
    ],
  },
  {
    id: 8,
    groups: [
      { label: 'Four letters long', members: ['Chad', 'Cuba', 'Iran', 'Mali'] },
      {
        label: 'Landlocked in Europe',
        members: ['Switzerland', 'Austria', 'Hungary', 'Serbia'],
      },
      {
        label: 'Islands in the Pacific',
        members: ['Fiji', 'Samoa', 'Tonga', 'Vanuatu'],
      },
      {
        label: 'Starts with "B"',
        members: ['Benin', 'Bolivia', 'Brunei', 'Bangladesh'],
      },
    ],
  },
] as const;

/** Deterministic daily puzzle choice. */
export const puzzleForDate = (
  dateKey: string,
  count = PUZZLES.length
): Puzzle => {
  let hash = 13;
  for (const character of dateKey) {
    hash = (hash * 31 + character.charCodeAt(0)) % 100_000;
  }
  return PUZZLES[hash % count];
};
