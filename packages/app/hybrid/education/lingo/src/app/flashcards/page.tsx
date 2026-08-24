'use client';

import { ToolTemplate } from '@/components/templates/ToolTemplate';
import { Flashcards } from '@/components/features/flashcards';
import { NextPage } from 'next';

const FlashcardsPage: NextPage = () => (
  <ToolTemplate title="Flashcards">
    <Flashcards />
  </ToolTemplate>
);

export default FlashcardsPage;
