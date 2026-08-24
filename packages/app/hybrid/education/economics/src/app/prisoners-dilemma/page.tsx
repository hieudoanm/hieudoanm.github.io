'use client';

import { ToolTemplate } from '@/components/templates/ToolTemplate';
import { PrisonerDilemma } from '@/components/features/prisoners-dilemma';
import { NextPage } from 'next';

const PrisonerDilemmaPage: NextPage = () => (
  <ToolTemplate title="Prisoner's Dilemma">
    <PrisonerDilemma />
  </ToolTemplate>
);

export default PrisonerDilemmaPage;
