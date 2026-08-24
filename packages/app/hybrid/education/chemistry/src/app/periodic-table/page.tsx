'use client';

import { ToolTemplate } from '@/components/templates/ToolTemplate';
import { PeriodicTable } from '@/components/features/periodic-table';
import { NextPage } from 'next';

const PeriodicTablePage: NextPage = () => (
  <ToolTemplate title="Periodic Table">
    <PeriodicTable />
  </ToolTemplate>
);

export default PeriodicTablePage;
