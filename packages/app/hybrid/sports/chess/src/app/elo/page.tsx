'use client';

import { ToolPage } from '@/components/ToolPage';
import { ChessElo } from '@/components/ChessElo';

const EloPage = () => (
  <ToolPage title="Chess Elo">
    <ChessElo onClose={() => undefined} />
  </ToolPage>
);

export default EloPage;
