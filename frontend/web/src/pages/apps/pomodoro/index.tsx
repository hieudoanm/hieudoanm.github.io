import Pomodoro from '@hieudoanm/components/Pomodoro';
import Head from 'next/head';
import React from 'react';

export const PomodoroPage: React.FC = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Pomodoro</title>
      </Head>
      <div className="h-screen w-screen">
        <Pomodoro />
      </div>
    </>
  );
};

export default PomodoroPage;
