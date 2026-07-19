'use client';

import { ToolPage } from '@/components/ToolPage';
import { ChessBoard } from '@/components/ChessBoard';

const BoardPage = () => (
  <ToolPage title="Chess Board">
    <ChessBoard onClose={() => undefined} />
  </ToolPage>
);

export default BoardPage;
