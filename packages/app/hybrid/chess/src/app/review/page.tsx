'use client';

import { ToolPage } from '@/components/ToolPage';
import { ChessReview } from '@/components/ChessReview';

const ReviewPage = () => (
  <ToolPage title="Game Review">
    <ChessReview onClose={() => undefined} />
  </ToolPage>
);

export default ReviewPage;
