'use client';

import { ToolPage } from '@/components/ToolPage';
import { ChessTrainer } from '@/components/ChessTrainer';

const TrainerPage = () => (
  <ToolPage title="Trainer">
    <ChessTrainer onClose={() => undefined} />
  </ToolPage>
);

export default TrainerPage;
