'use client';

import { Recall } from '@/games/Recall';
import { NextPage } from 'next';

const RecallPage: NextPage = () => (
  <div className="flex h-full flex-col">
    <Recall onClose={() => {}} />
  </div>
);

export default RecallPage;
