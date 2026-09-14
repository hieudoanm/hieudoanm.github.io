'use client';

import { ExperiencesInCloseRelationships } from '@/games/psychology/ExperiencesInCloseRelationships';
import { NextPage } from 'next';

const ExperiencesInCloseRelationshipsPage: NextPage = () => (
  <main className="mx-auto w-full max-w-2xl flex-1 p-6">
    <ExperiencesInCloseRelationships />
  </main>
);

export default ExperiencesInCloseRelationshipsPage;
