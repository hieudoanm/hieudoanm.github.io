'use client';

import {
  PiBrain,
  PiFirstAidKit,
  PiGauge,
  PiHeart,
  PiHeartStraight,
  PiLifebuoy,
  PiSmileyMelting,
  PiSmileyNervous,
} from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { NextPage } from 'next';

const ITEMS = [
  {
    label: 'BDI',
    description: 'Depression severity',
    icon: PiLifebuoy,
    href: '/beck-depression-inventory/',
  },
  {
    label: 'BFI',
    description: 'Personality traits',
    icon: PiBrain,
    href: '/big-five-inventory/',
  },
  {
    label: 'DAS',
    description: 'Relationship adjustment',
    icon: PiGauge,
    href: '/dyadic-adjustment-scale/',
  },
  {
    label: 'ECR',
    description: 'Attachment styles',
    icon: PiHeartStraight,
    href: '/experiences-in-close-relationships/',
  },
  {
    label: 'GAD-7',
    description: 'Anxiety severity',
    icon: PiSmileyNervous,
    href: '/generalized-anxiety-disorder/',
  },
  {
    label: 'PHQ-9',
    description: 'Depression screening',
    icon: PiFirstAidKit,
    href: '/patient-health-questionnaire/',
  },
  {
    label: 'RCI',
    description: 'Relationship closeness',
    icon: PiHeart,
    href: '/relationship-closeness-inventory/',
  },
  {
    label: 'SWLS',
    description: 'Life satisfaction',
    icon: PiSmileyMelting,
    href: '/satisfaction-with-life/',
  },
];

const HomePage: NextPage = () => (
  <HomeTemplate
    appName="Psychology"
    description="Validated psychological self-report scales — depression, anxiety, personality and relationships."
    items={ITEMS}
  />
);

export default HomePage;
