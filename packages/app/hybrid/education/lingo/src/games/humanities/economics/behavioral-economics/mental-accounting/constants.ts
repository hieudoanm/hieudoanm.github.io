import type { Scenario, WindfallCategory } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'lost-bill',
    title: 'The $20 Bill',
    vignette:
      'You are headed to a $20 play. On the way in you discover you have lost a $20 bill. Should you still buy the ticket?',
    choiceA:
      'Yes — the ticket is still worth $20 to me, and the lost bill is already gone.',
    choiceB:
      'No — with the lost bill the whole night now effectively costs me $40.',
    rational: 'a',
    concept: 'Framing and fungibility',
    explanation:
      'Losing the bill makes the night cost $40 either way, so the decision is unchanged: the marginal choice is still the $20 ticket versus the value of the show. The bill and the ticket draw on one pool of money.',
  },
  {
    id: 'lost-ticket',
    title: 'The Lost Ticket',
    vignette:
      'You bought a $20 ticket in advance. Arriving at the theater you find the ticket is gone. Do you buy another one?',
    choiceA:
      'Yes — replacing it costs the same $20 as the lost-bill case, and the show is still worth it.',
    choiceB: 'No — I would be paying $40 for a show I already paid $20 to see.',
    rational: 'a',
    concept: 'Double counting a loss',
    explanation:
      'Economically this is identical to losing a $20 bill, yet most people refuse. The ticket feels like part of “the show,” so the loss is double-counted against one account — Thaler’s classic mental accounting result.',
  },
  {
    id: 'cheaper-plan',
    title: 'The Cheaper Plan',
    vignette:
      'You switch internet plans and now save $100 every year. Where does that $100 go?',
    choiceA: 'A nice dinner out — I earned this by getting a good deal.',
    choiceB:
      'Toward rent and bills — it is ordinary income, same as my salary.',
    rational: 'b',
    concept: 'Income versus windfall framing',
    explanation:
      'Money saved on a plan is just income, not found money. The “deal” framing parks it in a treat account, so $100 of savings gets spent far more freely than the identical $100 of salary.',
  },
  {
    id: 'tax-refund',
    title: 'The $5,000 Refund',
    vignette:
      'The government returns $5,000 as a tax refund while you carry $4,000 on a 20% APR credit card. What do you do?',
    choiceA: 'Enjoy it — this is a bonus the government handed me.',
    choiceB: 'Pay off the credit card — that is a guaranteed 20% return.',
    rational: 'b',
    concept: 'Windfall spending',
    explanation:
      'A refund is economically ordinary income, but it lands in a separate “found money” account and gets over-consumed. Paying down 20% APR debt is the highest risk-free return you can get.',
  },
  {
    id: 'gym-membership',
    title: 'The Sunk Gym',
    vignette:
      'You paid for a full year of gym membership. Three weeks in, you injure your back. Should you keep forcing workouts?',
    choiceA: 'Yes — I paid for the year, so I have to get my money’s worth.',
    choiceB:
      'No — the fee is already paid; the only question is what training does for me today.',
    rational: 'b',
    concept: 'Sunk cost fallacy',
    explanation:
      'The membership fee is sunk and unrecoverable, so it should not drive today’s decision. Forcing workouts because you already paid throws good effort after bad money — the sunk cost fallacy.',
  },
  {
    id: 'gift-envelope',
    title: 'The Gift Envelope',
    vignette:
      'You set aside $80 in an envelope as a gift for a friend. A shop sale tempts you with something you want for the same $80. Do you dip into the envelope?',
    choiceA:
      'Yes — cash is cash; I compare the two purchases by value, not by label.',
    choiceB: 'No — the envelope is for the gift, and that money is off limits.',
    rational: 'a',
    concept: 'Earmarked budgets',
    explanation:
      'Because money is fungible, the envelope makes one $80 bill behave differently from another. The earmark works as a self-control device, but it is a rule you set — not an economic law.',
  },
];

export const WIND_FALL_AMOUNT = 1000;

export const FRAMER_CATEGORIES: WindfallCategory[] = [
  {
    id: 'fun',
    label: 'Fun',
    emoji: '🎉',
    hint: 'Spends fast when earmarked as a treat.',
  },
  {
    id: 'bills',
    label: 'Bills',
    emoji: '🧾',
    hint: 'Plugged into fixed, non-negotiable obligations.',
  },
  {
    id: 'savings',
    label: 'Savings',
    emoji: '🐖',
    hint: 'Guarded and rarely touched once labeled.',
  },
  {
    id: 'giving',
    label: 'Giving',
    emoji: '🎁',
    hint: 'Set aside to be given away, not spent.',
  },
];

export const SCENARIO_COUNT = SCENARIOS.length;
