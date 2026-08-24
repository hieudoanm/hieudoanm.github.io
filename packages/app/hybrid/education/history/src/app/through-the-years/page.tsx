'use client';

import { ToolTemplate } from '@/components/templates/ToolTemplate';
import { ThroughTheYears } from '@/components/features/through-the-years';
import { NextPage } from 'next';

const ThroughTheYearsPage: NextPage = () => (
  <ToolTemplate title="Through the Years">
    <ThroughTheYears />
  </ToolTemplate>
);

export default ThroughTheYearsPage;
