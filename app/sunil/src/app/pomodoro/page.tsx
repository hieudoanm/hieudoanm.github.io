'use client';

import Pomodoro from '@sunil/common/components/Pomodoro';
import type { NextPage } from 'next';
import Head from 'next/head';

const PomodoroPage: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Pomodoro</title>
      </Head>
      <div className="h-full w-full">
        <Pomodoro />
      </div>
    </>
  );
};

export default PomodoroPage;
