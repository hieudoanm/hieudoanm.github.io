'use client';

import { PomodoroTemplate } from '@sunil/shared/templates/PomodoroTemplate';
import type { NextPage } from 'next';
import Head from 'next/head';

const PomodoroPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pomodoro</title>
      </Head>
      <PomodoroTemplate />
    </>
  );
};

export default PomodoroPage;
