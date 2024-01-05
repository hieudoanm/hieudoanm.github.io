import Pomodoro from '@hieudoanm/components/Pomodoro';
import React from 'react';
import { Helmet } from 'react-helmet';

export const PomodoroPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pomodoro</title>
      </Helmet>
      <div className="h-screen w-screen">
        <Pomodoro />
      </div>
    </>
  );
};

export default PomodoroPage;
