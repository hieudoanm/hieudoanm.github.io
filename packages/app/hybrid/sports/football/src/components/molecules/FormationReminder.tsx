'use client';

import { formationReminders } from '@/lib/reminders';
import { Formation, Squad } from '@/types/football';
import { FC } from 'react';
import { FiAlertTriangle, FiInfo } from 'react-icons/fi';

interface FormationReminderProps {
  squad: Squad;
  formation: Formation;
}

export const FormationReminder: FC<FormationReminderProps> = ({
  squad,
  formation,
}) => {
  const reminders = formationReminders(squad, formation);

  if (reminders.length === 0) {
    return (
      <p className="text-success text-xs">
        Lineup is complete — all positions filled.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-base-content/50 text-xs font-bold uppercase">
        Formation reminders
      </span>
      <ul className="flex list-none flex-col gap-1">
        {reminders.map((reminder) => (
          <li
            key={reminder.text}
            className={`flex items-start gap-1.5 text-xs ${
              reminder.level === 'warning'
                ? 'text-warning'
                : 'text-base-content/70'
            }`}>
            {reminder.level === 'warning' ? (
              <FiAlertTriangle className="mt-0.5 size-3 shrink-0" />
            ) : (
              <FiInfo className="mt-0.5 size-3 shrink-0" />
            )}
            <span>{reminder.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

FormationReminder.displayName = 'FormationReminder';
