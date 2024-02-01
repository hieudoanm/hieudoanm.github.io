'use client';

import { CalendarTemplate } from '@sunil/shared/templates/CalendarTemplate';
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
      <CalendarTemplate date={date} month={month} year={year} />
    </>
  );
};

export default CalendarPage;
