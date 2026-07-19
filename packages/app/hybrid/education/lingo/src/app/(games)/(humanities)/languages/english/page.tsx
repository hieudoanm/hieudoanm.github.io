'use client';

import { LanguagesEnglish } from '@/games/languages/english';
import { NextPage } from 'next';

const EnglishPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
    <h1 className="text-primary text-2xl font-bold tracking-tight">English</h1>
    <LanguagesEnglish />
  </div>
);

export default EnglishPage;
