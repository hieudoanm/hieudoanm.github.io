'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import {
  PiBrain,
  PiChatsCircle,
  PiFlowerLotus,
  PiGraduationCap,
  PiHeart,
  PiHeartbeat,
  PiHeartStraight,
  PiLightbulb,
  PiNotePencil,
  PiPerson,
  PiPulse,
  PiSparkle,
  PiUsers,
  PiUsersThree,
} from 'react-icons/pi';

const ITEMS: GameItem[] = [
  {
    testId: 'psychology-biology',
    name: 'Biological Psychology',
    description: 'Neurons, brains and the body behind behaviour',
    icon: PiBrain,
    href: '/psychology/biology/',
    group: 'Theory',
  },
  {
    testId: 'psychology-cognitive',
    name: 'Cognitive Psychology',
    description: 'Attention, memory and the architecture of thought',
    icon: PiLightbulb,
    href: '/psychology/cognitive/',
    group: 'Theory',
  },
  {
    testId: 'psychology-developmental',
    name: 'Developmental Psychology',
    description: 'How people change across a lifetime',
    icon: PiGraduationCap,
    href: '/psychology/developmental/',
    group: 'Theory',
  },
  {
    testId: 'psychology-social',
    name: 'Social Psychology',
    description: 'How other people shape what we think and do',
    icon: PiUsersThree,
    href: '/psychology/social/',
    group: 'Theory',
  },
  {
    testId: 'psychology-mindfulness',
    name: 'Mindfulness',
    description: 'Present-moment attention, evidence and limits',
    icon: PiFlowerLotus,
    href: '/psychology/mindfulness/',
    group: 'Practices',
  },
  {
    testId: 'psychology-journaling',
    name: 'Journaling',
    description: 'Writing as a tool for regulating and understanding',
    icon: PiNotePencil,
    href: '/psychology/journaling/',
    group: 'Practices',
  },
  {
    testId: 'psychology-counselling',
    name: 'Counselling',
    description: 'Therapy approaches, evidence and professional limits',
    icon: PiChatsCircle,
    href: '/psychology/counselling/',
    group: 'Practices',
  },
  {
    testId: 'psychology-depression',
    name: 'Depression',
    description: 'Clinical depression — definition, screening and treatment',
    icon: PiHeartbeat,
    href: '/psychology/depression/',
    group: 'Clinical',
  },
  {
    testId: 'psychology-anxiety',
    name: 'Anxiety',
    description: 'Clinical anxiety — definition, screening and treatment',
    icon: PiPulse,
    href: '/psychology/anxiety/',
    group: 'Clinical',
  },
  {
    testId: 'psychology-bfi',
    name: 'Big Five Inventory',
    description: 'Measure the five factor personality traits',
    icon: PiPerson,
    href: '/psychology/big-five-inventory/',
    group: 'Personality',
  },
  {
    testId: 'psychology-das',
    name: 'Dyadic Adjustment Scale',
    description: 'Assess the quality of a relationship',
    icon: PiHeartStraight,
    href: '/psychology/dyadic-adjustment-scale/',
    group: 'Relationships',
  },
  {
    testId: 'psychology-ecr',
    name: 'Experiences in Close Relationships',
    description: 'Evaluate adult attachment style (ECR-R)',
    icon: PiHeart,
    href: '/psychology/experiences-in-close-relationships/',
    group: 'Relationships',
  },
  {
    testId: 'psychology-rci',
    name: 'Relationship Closeness Inventory',
    description: 'Rate closeness in a specific relationship',
    icon: PiUsers,
    href: '/psychology/relationship-closeness-inventory/',
    group: 'Relationships',
  },
  {
    testId: 'psychology-swls',
    name: 'Satisfaction With Life Scale',
    description: 'Rate overall life satisfaction (SWLS)',
    icon: PiSparkle,
    href: '/psychology/satisfaction-with-life/',
    group: 'Wellbeing',
  },
];

const PsychologyPage: NextPage = () => (
  <GamesTemplate
    title="Psychology"
    subtitle="Validated self-report scales — screening tools, not diagnostics."
    items={ITEMS}
  />
);

export default PsychologyPage;
