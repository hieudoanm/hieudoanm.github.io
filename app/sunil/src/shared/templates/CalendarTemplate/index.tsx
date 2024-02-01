import { Calendar } from '@sunil/shared/components/Calendar';

export type CalendarTemplateProperties = {
  date: number;
  month: number;
  year: number;
};

export const CalendarTemplate: React.FC<CalendarTemplateProperties> = ({
  date,
  month,
  year,
}) => {
  return (
    <div className="h-screen">
      <div className="flex h-full items-center justify-center">
        <Calendar date={date} month={month} year={year} />
      </div>
    </div>
  );
};

CalendarTemplate.displayName = 'CalendarTemplate';
