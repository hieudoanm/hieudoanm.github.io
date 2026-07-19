'use client';

import dynamic from 'next/dynamic';
import { ToolPage } from '@/components/ToolPage';

const ChessTrainer = dynamic(
  () => import('@/components/ChessTrainer').then((m) => m.ChessTrainer),
  {
    ssr: false,
    loading: () => <p className="text-sm opacity-70">Loading trainer…</p>,
  }
);

const TrainerPage = () => (
  <ToolPage title="Trainer">
    <ChessTrainer onClose={() => undefined} />
  </ToolPage>
);

export default TrainerPage;
