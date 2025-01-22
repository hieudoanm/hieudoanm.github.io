import { FC } from 'react';
import { FaPlus } from 'react-icons/fa6';

export const WidgetCalendarEvents: FC = () => {
  const events = [
    {
      title: 'Daily Standup',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut. ',
      dateTime: '09:30',
    },
    {
      title: 'Sprint Planning',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut. ',
      dateTime: '10:30',
    },
    {
      title: 'Sprint Retrospective',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut. ',
      dateTime: '17:30',
    },
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-3xl bg-black text-white">
      <div className="h-full w-full p-8">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between pb-2">
            <p className="text-xl font-black">Events</p>
            <p>
              <FaPlus />
            </p>
          </div>
          {events.map(({ title, description, dateTime }) => {
            return (
              <div key={title} className="grow border-t border-gray-700">
                <div className="flex h-full w-full items-center gap-x-2 overflow-hidden">
                  <div className="w-full">
                    <div className="flex items-center justify-between truncate">
                      <p className="font-bold">{title}</p>
                      <p className="text-xs">{dateTime}</p>
                    </div>
                    <p className="w-48 truncate text-gray-500">{description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
