'use client';

import { ToolTemplate } from '@/components/templates/ToolTemplate';
import { Pitch } from '@/components/features/pitch';
import { NextPage } from 'next';

const PitchPage: NextPage = () => (
  <ToolTemplate title="Pitch">
    <Pitch />
  </ToolTemplate>
);

export default PitchPage;
