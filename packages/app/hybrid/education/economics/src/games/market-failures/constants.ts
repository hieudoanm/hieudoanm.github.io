import type { FailureType, Policy, Scenario } from './types';

export const FAILURE_LABELS: Record<FailureType, string> = {
  'negative-externality': 'Negative externality',
  'positive-externality': 'Positive externality',
  'public-good': 'Public good',
  'asymmetric-info': 'Asymmetric information',
  monopoly: 'Monopoly',
  'common-resource': 'Common resource',
};

export const POLICY_LABELS: Record<Policy, string> = {
  'pigouvian-tax': 'Pigouvian tax',
  subsidy: 'Subsidy',
  'provide-publicly': 'Provide publicly',
  regulation: 'Regulations / Mandates',
  'break-up-monopoly': 'Break up monopoly',
  'cap-and-trade': 'Cap-and-trade',
  'information-disclosure': 'Information disclosure',
  'none-coase': 'None / Coase bargain',
};

export const SCENARIOS: Scenario[] = [
  {
    id: 'factory-smoke',
    name: 'Factory smoke',
    failureType: 'negative-externality',
    description:
      'A factory emits soot that damages nearby homes. The market price of its goods is too low because it ignores the cost it imposes on others.',
    bestPolicy: 'pigouvian-tax',
    why: 'A Pigouvian tax raises the private marginal cost to match the social marginal cost, internalising the externality and restoring efficient output.',
  },
  {
    id: 'flu-shots',
    name: 'Flu shots',
    failureType: 'positive-externality',
    description:
      'Flu shots protect not only the buyer but also everyone they meet. Private demand is below the socially optimal level, so too few people get vaccinated.',
    bestPolicy: 'subsidy',
    why: 'A subsidy lowers the private cost to reflect the positive spillover, boosting consumption toward the socially optimal level.',
  },
  {
    id: 'street-lighting',
    name: 'Street lighting',
    failureType: 'public-good',
    description:
      'Street lights are non-excludable and non-rivalrous—one person’s use never reduces another’s, and nobody can be excluded. Private markets under-provide them.',
    bestPolicy: 'provide-publicly',
    why: 'Public goods suffer free-riding that a private market cannot overcome; government provision funds them through taxation at the efficient level.',
  },
  {
    id: 'used-cars',
    name: 'Used cars',
    failureType: 'asymmetric-info',
    description:
      'Sellers know far more about their cars than buyers, so buyers assume the worst and only offer low prices, driving good cars out of the market.',
    bestPolicy: 'information-disclosure',
    why: 'Information disclosure reduces asymmetric information, letting buyers and sellers transact on the true quality and restoring a functioning market.',
  },
  {
    id: 'water-monopoly',
    name: 'Water monopoly',
    failureType: 'monopoly',
    description:
      'A single firm controls the entire water supply and restricts output to charge high prices, creating deadweight loss above the competitive level.',
    bestPolicy: 'break-up-monopoly',
    why: 'Breaking up the monopoly restores competition, lowering price and expanding output toward the efficient, competitive equilibrium.',
  },
  {
    id: 'overfishing',
    name: 'The open ocean',
    failureType: 'common-resource',
    description:
      'Ocean fish are rivalrous but non-excludable—anyone can fish, so each fisherman over-harvests and the shared stock collapses.',
    bestPolicy: 'cap-and-trade',
    why: 'Cap-and-trade sets a sustainable total catch and prices access to the common resource, aligning private incentives with the shared stock’s health.',
  },
  {
    id: 'auto-repairs',
    name: 'Auto repairs',
    failureType: 'asymmetric-info',
    description:
      'A mechanic knows whether a repair is genuinely needed; a customer cannot tell. The mechanic can overcharge or perform unnecessary work.',
    bestPolicy: 'none-coase',
    why: 'When the externality involves a few parties who can bargain and property rights are clearly assigned, private negotiation (Coase) can reach efficiency without state intervention.',
  },
];

export const POLLUTION_DEFAULT_GAP = 20;
export const POLLUTION_MAX_GAP = 50;
export const POLLUTION_BASE_OUTPUT = 100;
