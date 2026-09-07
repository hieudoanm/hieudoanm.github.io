'use client';

import { FlashcardLanguages } from '@/games/flashcards/LanguageList';
import { NextPage } from 'next';

const FlashcardsPage: NextPage = () => (
  <div className="p-6">
    <FlashcardLanguages />
  </div>
);

export default FlashcardsPage;
