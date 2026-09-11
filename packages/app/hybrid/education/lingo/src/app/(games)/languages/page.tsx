'use client';

import { LanguagesList } from '@/games/languages/LanguageList';
import { NextPage } from 'next';

const LanguagesPage: NextPage = () => (
  <div className="p-6">
    <LanguagesList />
  </div>
);

export default LanguagesPage;
