'use client';

import Calendar from '@mini/common/components/Calendar';
import { NextPage } from 'next';
import Head from 'next/head';

type CalendarPageProps = {
  params: { date: number; month: number; year: number };
};

const CalendarPage: NextPage<CalendarPageProps> = ({
  params,
}: CalendarPageProps) => {
  const d: Date = new Date();
  const {
    date = d.getDate(),
    month = d.getMonth(),
    year = d.getFullYear(),
  } = params;

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
