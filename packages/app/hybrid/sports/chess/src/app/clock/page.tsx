'use client';

import { ToolPage } from '@/components/ToolPage';
import { ChessClock } from '@/components/ChessClock';

const ClockPage = () => (
  <ToolPage title="Chess Clock">
    <ChessClock onClose={() => undefined} />
  </ToolPage>
);

export default ClockPage;
