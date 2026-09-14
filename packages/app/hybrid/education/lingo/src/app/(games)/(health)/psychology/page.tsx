'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import {
  PiBrain,
  PiHeart,
  PiHeartbeat,
  PiHeartStraight,
  PiPerson,
  PiPulse,
  PiSparkle,
  PiUsers,
} from 'react-icons/pi';

const ITEMS: GameItem[] = [
  {
    testId: 'psychology-bdi',
    name: 'Beck Depression Inventory',
    description: 'Screen for symptoms of depression (BDI-II)',
    icon: PiBrain,
    href: '/psychology/beck-depression-inventory/',
    group: 'Mood & Anxiety',
  },
  {
    testId: 'psychology-gad',
    name: 'Generalized Anxiety Disorder',
    description: 'Screen for generalised anxiety (GAD-7)',
    icon: PiPulse,
    href: '/psychology/generalized-anxiety-disorder/',
    group: 'Mood & Anxiety',
  },
  {
    testId: 'psychology-phq',
    name: 'Patient Health Questionnaire',
    description: 'Screen for depression severity (PHQ-9)',
    icon: PiHeartbeat,
    href: '/psychology/patient-health-questionnaire/',
    group: 'Mood & Anxiety',
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
