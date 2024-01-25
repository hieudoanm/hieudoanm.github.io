'use client';

import Calendar from '@mini/components/Calendar';
import { NextPage } from 'next';
import Head from 'next/head';

const CalendarPage: NextPage = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>Calendar</title>
      </Head>
      <div className="h-screen">
        <div className="container mx-auto h-full p-8">
          <div className="flex h-full items-center justify-center">
            <Calendar date={date} month={month} year={year} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
