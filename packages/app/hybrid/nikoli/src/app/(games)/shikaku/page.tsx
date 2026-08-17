'use client';

import { Shikaku } from '@/games/Shikaku';
import Link from 'next/link';

const ShikakuPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Shikaku />
    </div>
  );
};

export default ShikakuPage;
