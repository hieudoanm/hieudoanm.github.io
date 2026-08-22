'use client';

import { EmojiGuesser } from '@/games/emoji-guesser';
import { NextPage } from 'next';

const EmojiGuesserPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <EmojiGuesser />
    </div>
  );
};

export default EmojiGuesserPage;
