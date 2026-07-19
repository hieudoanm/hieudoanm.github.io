'use client';

import type { FC } from 'react';
import { SHELDON_SCHEDULE } from '@/data';

const todayLabel = (): string =>
  new Date().toLocaleDateString('en-US', { weekday: 'long' });

interface FoodScheduleProps {
  today?: string;
}

export const FoodSchedule: FC<FoodScheduleProps> = ({ today }) => {
  const activeDay = today ?? todayLabel();

  return (
    <div className="flex w-full max-w-3xl flex-col gap-4">
      <p className="text-base-content/60 border-base-content/10 bg-base-200 rounded-xl border px-4 py-3 text-center text-sm italic">
        “I cannot accept a fluctuating weekly dining schedule.”
        <span className="not-italic"> — Sheldon Cooper</span>
      </p>

      <div className="border-base-content/10 bg-base-200 overflow-hidden rounded-2xl border">
        <table
          data-testid="schedule-table"
          className="w-full text-left text-sm">
          <thead>
            <tr className="text-base-content/50 border-base-content/10 border-b text-xs font-bold tracking-wider uppercase">
              <th className="px-4 py-3">Day</th>
              <th className="px-4 py-3">Meal</th>
              <th className="px-4 py-3">Source</th>
              <th className="hidden px-4 py-3 sm:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody>
            {SHELDON_SCHEDULE.map((entry) => {
              const isToday = entry.day === activeDay;
              return (
                <tr
                  key={entry.day}
                  data-testid="schedule-row"
                  data-today={isToday || undefined}
                  className={`border-base-content/5 border-b transition-colors last:border-b-0 ${
                    isToday ? 'text-accent bg-accent/10' : ''
                  }`}>
                  <td className="px-4 py-3 font-semibold">{entry.day}</td>
                  <td className="px-4 py-3 font-medium">
                    <span className="mr-2">{entry.emoji}</span>
                    {entry.meal}
                  </td>
                  <td className="text-base-content/70 px-4 py-3">
                    {entry.restaurant}
                  </td>
                  <td className="text-base-content/60 hidden px-4 py-3 sm:table-cell">
                    {entry.note}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p
        data-testid="schedule-today"
        className="text-base-content/60 m-0 text-center text-xs">
        {activeDay}
      </p>
    </div>
  );
};

FoodSchedule.displayName = 'FoodSchedule';
