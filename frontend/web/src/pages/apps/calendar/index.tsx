import Calendar from '@hieudoanm/components/Calendar';
import Head from 'next/head';
import React from 'react';

export const CalendarPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Calendar</title>
      </Head>
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
