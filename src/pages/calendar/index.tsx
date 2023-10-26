import { Calendar } from '../../components/organisms/Calendar';
import React from 'react';

const CalendarPage: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="container mx-auto h-full p-8">
        <div className="flex h-full items-center justify-center">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
