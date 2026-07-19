'use client';

import { ToolPage } from '@/components/ToolPage';
import { ChessLibrary } from '@/components/ChessLibrary';

const LibraryPage = () => (
  <ToolPage title="Game Library">
    <ChessLibrary onClose={() => undefined} />
  </ToolPage>
);

export default LibraryPage;
