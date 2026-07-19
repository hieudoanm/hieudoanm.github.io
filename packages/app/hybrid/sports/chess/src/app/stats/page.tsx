'use client';

import { ToolPage } from '@/components/ToolPage';
import { ChessStats } from '@/components/ChessStats';

const StatsPage = () => (
  <ToolPage title="Chess Stats">
    <ChessStats onClose={() => undefined} />
  </ToolPage>
);

export default StatsPage;
