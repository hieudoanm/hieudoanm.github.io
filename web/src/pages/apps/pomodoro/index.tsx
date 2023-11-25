import React from 'react';
import { Helmet } from 'react-helmet';
import Pomodoro from '../../../components/organisms/Pomodoro';

const PomodoroPage: React.FC = () => {
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
