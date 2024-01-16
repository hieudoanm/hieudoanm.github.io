import Calendar from '@hieudoanm/components/Calendar';
import { NextPage } from 'next';
import Head from 'next/head';

export type CalendarPageProps = {
  date: number;
  month: number;
  year: number;
};

export const CalendarPage: NextPage<CalendarPageProps> = ({
  date,
  month,
  year,
}) => {
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
