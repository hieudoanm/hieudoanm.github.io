export interface BeckOption {
  value: number;
  label: string;
}

export interface BeckItem {
  id: number;
  label: string;
  options: BeckOption[];
}

export const BDI_ITEMS: BeckItem[] = [
  {
    id: 1,
    label: 'Sadness',
    options: [
      { value: 0, label: 'I do not feel sad.' },
      { value: 1, label: 'I feel sad much of the time.' },
      { value: 2, label: 'I am sad all the time.' },
      { value: 3, label: "I am so sad or unhappy that I can't stand it." },
    ],
  },
  {
    id: 2,
    label: 'Pessimism',
    options: [
      { value: 0, label: 'I am not discouraged about my future.' },
      {
        value: 1,
        label: 'I feel more discouraged about my future than I used to.',
      },
      { value: 2, label: 'I do not expect things to work out for me.' },
      {
        value: 3,
        label: 'I feel my future is hopeless and will only get worse.',
      },
    ],
  },
  {
    id: 3,
    label: 'Past Failure',
    options: [
      { value: 0, label: 'I do not feel like a failure.' },
      { value: 1, label: 'I have failed more than I should have.' },
      { value: 2, label: 'As I look back, I see a lot of failures.' },
      { value: 3, label: 'I feel I am a total failure as a person.' },
    ],
  },
  {
    id: 4,
    label: 'Loss of Pleasure',
    options: [
      {
        value: 0,
        label: 'I get as much pleasure as I ever did from the things I enjoy.',
      },
      { value: 1, label: "I don't enjoy things as much as I used to." },
      {
        value: 2,
        label: 'I get very little pleasure from the things I used to enjoy.',
      },
      {
        value: 3,
        label: "I can't get any pleasure from the things I used to enjoy.",
      },
    ],
  },
  {
    id: 5,
    label: 'Guilty Feelings',
    options: [
      { value: 0, label: "I don't feel particularly guilty." },
      {
        value: 1,
        label:
          'I feel guilty over many things I have done or should have done.',
      },
      { value: 2, label: 'I feel quite guilty most of the time.' },
      { value: 3, label: 'I feel guilty all of the time.' },
    ],
  },
  {
    id: 6,
    label: 'Punishment Feelings',
    options: [
      { value: 0, label: "I don't feel I am being punished." },
      { value: 1, label: 'I feel I may be punished.' },
      { value: 2, label: 'I expect to be punished.' },
      { value: 3, label: 'I feel I am being punished.' },
    ],
  },
  {
    id: 7,
    label: 'Self-Dislike',
    options: [
      { value: 0, label: 'I feel the same about myself as ever.' },
      { value: 1, label: 'I have lost confidence in myself.' },
      { value: 2, label: 'I am disappointed in myself.' },
      { value: 3, label: 'I dislike myself.' },
    ],
  },
  {
    id: 8,
    label: 'Self-Criticalness',
    options: [
      { value: 0, label: "I don't criticize or blame myself more than usual." },
      { value: 1, label: 'I am more critical of myself than I used to be.' },
      { value: 2, label: 'I criticize myself for all of my faults.' },
      { value: 3, label: 'I blame myself for everything bad that happens.' },
    ],
  },
  {
    id: 9,
    label: 'Suicidal Thoughts or Wishes',
    options: [
      { value: 0, label: "I don't have any thoughts of killing myself." },
      {
        value: 1,
        label:
          'I have thoughts of killing myself, but I would not carry them out.',
      },
      { value: 2, label: 'I would like to kill myself.' },
      { value: 3, label: 'I would kill myself if I had the chance.' },
    ],
  },
  {
    id: 10,
    label: 'Crying',
    options: [
      { value: 0, label: "I don't cry anymore than I used to." },
      { value: 1, label: 'I cry more than I used to.' },
      { value: 2, label: 'I cry over every little thing.' },
      { value: 3, label: "I feel like crying, but I can't." },
    ],
  },
  {
    id: 11,
    label: 'Agitation',
    options: [
      { value: 0, label: 'I am no more restless or wound up than usual.' },
      { value: 1, label: 'I feel more restless or wound up than usual.' },
      {
        value: 2,
        label: "I am so restless or agitated, it's hard to stay still.",
      },
      {
        value: 3,
        label:
          'I am so restless or agitated that I have to keep moving or doing something.',
      },
    ],
  },
  {
    id: 12,
    label: 'Loss of Interest',
    options: [
      {
        value: 0,
        label: 'I have not lost interest in other people or activities.',
      },
      {
        value: 1,
        label: 'I am less interested in other people or things than before.',
      },
      {
        value: 2,
        label: 'I have lost most of my interest in other people or things.',
      },
      { value: 3, label: "It's hard to get interested in anything." },
    ],
  },
  {
    id: 13,
    label: 'Indecisiveness',
    options: [
      { value: 0, label: 'I make decisions about as well as ever.' },
      {
        value: 1,
        label: 'I find it more difficult to make decisions than usual.',
      },
      {
        value: 2,
        label:
          'I have much greater difficulty in making decisions than I used to.',
      },
      { value: 3, label: 'I have trouble making any decisions.' },
    ],
  },
  {
    id: 14,
    label: 'Worthlessness',
    options: [
      { value: 0, label: 'I do not feel I am worthless.' },
      {
        value: 1,
        label: "I don't consider myself as worthwhile and useful as I used to.",
      },
      { value: 2, label: 'I feel more worthless as compared to others.' },
      { value: 3, label: 'I feel utterly worthless.' },
    ],
  },
  {
    id: 15,
    label: 'Loss of Energy',
    options: [
      { value: 0, label: 'I have as much energy as ever.' },
      { value: 1, label: 'I have less energy than I used to have.' },
      { value: 2, label: "I don't have enough energy to do very much." },
      { value: 3, label: "I don't have enough energy to do anything." },
    ],
  },
  {
    id: 16,
    label: 'Changes in Sleeping Pattern',
    options: [
      { value: 0, label: 'I have not experienced any change in my sleeping.' },
      { value: 1, label: 'I sleep somewhat more than usual.' },
      { value: 1, label: 'I sleep somewhat less than usual.' },
      { value: 2, label: 'I sleep a lot more than usual.' },
      { value: 2, label: 'I sleep a lot less than usual.' },
      { value: 3, label: 'I sleep most of the day.' },
      {
        value: 3,
        label: "I wake up 1-2 hours early and can't get back to sleep.",
      },
    ],
  },
  {
    id: 17,
    label: 'Irritability',
    options: [
      { value: 0, label: 'I am not more irritable than usual.' },
      { value: 1, label: 'I am more irritable than usual.' },
      { value: 2, label: 'I am much more irritable than usual.' },
      { value: 3, label: 'I am irritable all the time.' },
    ],
  },
  {
    id: 18,
    label: 'Changes in Appetite',
    options: [
      { value: 0, label: 'I have not experienced any change in my appetite.' },
      { value: 1, label: 'My appetite is somewhat less than usual.' },
      { value: 1, label: 'My appetite is somewhat greater than usual.' },
      { value: 2, label: 'My appetite is much less than before.' },
      { value: 2, label: 'My appetite is much greater than usual.' },
      { value: 3, label: 'I have no appetite at all.' },
      { value: 3, label: 'I crave food all the time.' },
    ],
  },
  {
    id: 19,
    label: 'Concentration Difficulty',
    options: [
      { value: 0, label: 'I can concentrate as well as ever.' },
      { value: 1, label: "I can't concentrate as well as usual." },
      {
        value: 2,
        label: "It's hard to keep my mind on anything for very long.",
      },
      { value: 3, label: "I find I can't concentrate on anything." },
    ],
  },
  {
    id: 20,
    label: 'Tiredness or Fatigue',
    options: [
      { value: 0, label: 'I am no more tired or fatigued than usual.' },
      {
        value: 1,
        label: 'I get more tired or fatigued more easily than usual.',
      },
      {
        value: 2,
        label:
          'I am too tired or fatigued to do a lot of the things I used to do.',
      },
      {
        value: 3,
        label:
          'I am too tired or fatigued to do most of the things I used to do.',
      },
    ],
  },
  {
    id: 21,
    label: 'Loss of Interest in Sex',
    options: [
      {
        value: 0,
        label: 'I have not noticed any recent change in my interest in sex.',
      },
      { value: 1, label: 'I am less interested in sex than I used to be.' },
      { value: 2, label: 'I am much less interested in sex now.' },
      { value: 3, label: 'I have lost interest in sex completely.' },
    ],
  },
];
