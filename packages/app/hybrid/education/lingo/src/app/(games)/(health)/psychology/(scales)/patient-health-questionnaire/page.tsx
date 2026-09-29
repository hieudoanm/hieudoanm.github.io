'use client';

import { PatientHealthQuestionnaire } from '@/games/health/psychology/PatientHealthQuestionnaire';
import { NextPage } from 'next';

const PatientHealthQuestionnairePage: NextPage = () => (
  <main className="mx-auto w-full max-w-2xl flex-1 p-6">
    <PatientHealthQuestionnaire />
  </main>
);

export default PatientHealthQuestionnairePage;
