import React from 'react';
import { Helmet } from 'react-helmet';
import { Calendar } from '../../../components/organisms/Calendar';

export const CalendarPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Calendar</title>
      </Helmet>
      <div className="h-screen">
        <div className="container mx-auto h-full p-8">
          <div className="flex h-full items-center justify-center">
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
