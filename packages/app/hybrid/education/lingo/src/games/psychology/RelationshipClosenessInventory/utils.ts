export interface TimeEntry {
  hours: number;
  minutes: number;
}

export interface TimeSlot {
  label: string;
  hint: string;
}

export interface InfluenceItem {
  id: number;
  text: string;
  reverse: boolean;
}

export type ScaleItem = InfluenceItem;

export interface RelationshipClosenessInventoryScores {
  timeMinutes: number;
  activitiesCount: number;
  influenceTotal: number;
  plansTotal: number;
}

export const TIME_SLOTS: TimeSlot[] = [
  { label: 'Morning', hint: 'wake up – 12 noon' },
  { label: 'Afternoon', hint: '12 noon – 6 PM' },
  { label: 'Evening', hint: '6 PM – bedtime' },
];

export const ACTIVITIES: string[] = [
  'did laundry',
  'talked on the phone',
  'prepared a meal',
  'went to a movie',
  'watched TV',
  'ate a meal',
  'went to an auction/antique show',
  'participated in a sporting activity',
  'attended a non-class lecture or presentation',
  'outdoor recreation (e.g., sailing)',
  'went to a restaurant',
  'went to a play',
  'went to a grocery store',
  'went to a bar',
  'went for a walk/drive',
  'visited family',
  'discussed things of a personal nature',
  'visited friends',
  'went to a museum/art show',
  'went to a department, book, hardware store, etc.',
  'planned a party/social event',
  'played cards/board game',
  'attended class',
  'attended a sporting event',
  'went on a trip (e.g., vacation or weekend)',
  'exercised (e.g., jogging, aerobics)',
  'cleaned house/apartment',
  'went on an outing (e.g. picnic, beach, zoo, winter carnival)',
  'went to church/religious function',
  'wilderness activity (e.g., hunting, hiking, fishing)',
  'worked on homework',
  'went to a concert',
  'engaged in sexual relations',
  'went dancing',
  'discussed things of a non-personal nature',
  'went to a party',
  'went to a clothing store',
  'played music/sang',
];

export const INFLUENCE_ITEMS: InfluenceItem[] = [
  {
    id: 1,
    text: 'SP will influence my future financial security.',
    reverse: false,
  },
  {
    id: 2,
    text: 'SP does not influence everyday things in my life.',
    reverse: true,
  },
  { id: 3, text: 'SP influences important things in my life.', reverse: false },
  {
    id: 4,
    text: 'SP influences which parties and other social events I attend.',
    reverse: false,
  },
  {
    id: 5,
    text: 'SP influences the extent to which I accept responsibilities in our relationship.',
    reverse: false,
  },
  {
    id: 6,
    text: 'SP does not influence how much time I spend doing household work.',
    reverse: true,
  },
  {
    id: 7,
    text: 'SP does not influence how I choose to spend my money.',
    reverse: true,
  },
  { id: 8, text: 'SP influences the way I feel about myself.', reverse: false },
  { id: 9, text: 'SP does not influence my moods.', reverse: true },
  {
    id: 10,
    text: 'SP influences the basic values that I hold.',
    reverse: false,
  },
  {
    id: 11,
    text: 'SP does not influence the opinions that I have of other important people in my life.',
    reverse: true,
  },
  {
    id: 12,
    text: 'SP does not influence when I see, and the amount of time I spend with, my family.',
    reverse: true,
  },
  {
    id: 13,
    text: 'SP influences when I see, and the amount of time I spend with, my friends.',
    reverse: false,
  },
  {
    id: 14,
    text: 'SP does not influence which of my friends I see.',
    reverse: true,
  },
  {
    id: 15,
    text: 'SP does not influence the type of career I have/will have.',
    reverse: true,
  },
  {
    id: 16,
    text: 'SP influences or will influence how much time I devote to my career.',
    reverse: false,
  },
  {
    id: 17,
    text: 'SP does not influence my chances of getting a good job in the future.',
    reverse: true,
  },
  {
    id: 18,
    text: 'SP influences the way I feel about the future.',
    reverse: false,
  },
  {
    id: 19,
    text: 'SP does not have the capacity to influence how I act in various situations.',
    reverse: true,
  },
  {
    id: 20,
    text: 'SP influences and contributes to my overall happiness.',
    reverse: false,
  },
  {
    id: 21,
    text: 'SP does not influence my present financial security.',
    reverse: true,
  },
  { id: 22, text: 'SP influences how I spend my free time.', reverse: false },
  {
    id: 23,
    text: 'SP influences when I see SP and the amount of time the two of us spend together.',
    reverse: false,
  },
  { id: 24, text: 'SP does not influence how I dress.', reverse: true },
  {
    id: 25,
    text: 'SP influences how I decorate my home (e.g. dorm room, apartment, house).',
    reverse: false,
  },
  { id: 26, text: 'SP does not influence where I live.', reverse: true },
  { id: 27, text: 'SP influences what I watch on T.V.', reverse: false },
];

export const PLAN_ITEMS: string[] = [
  'my vacation plans',
  'my plans to have children',
  'my plans to make major investments (house, car, etc.)',
  'my plans to join a club, social organization, church, etc.',
  'my school-related plans',
  'my plans for achieving a particular financial standard of living',
];

export const computeScores = (
  time: TimeEntry[],
  activities: boolean[],
  influence: number[],
  plans: number[]
): RelationshipClosenessInventoryScores => ({
  timeMinutes: time.reduce(
    (sum, entry) =>
      sum + Math.max(0, entry.hours) * 60 + Math.max(0, entry.minutes),
    0
  ),
  activitiesCount: activities.filter(Boolean).length,
  influenceTotal: influence.reduce(
    (sum, value, index) =>
      sum + (INFLUENCE_ITEMS[index]?.reverse ? 8 - value : value),
    0
  ),
  plansTotal: plans.reduce((sum, value) => sum + value, 0),
});
