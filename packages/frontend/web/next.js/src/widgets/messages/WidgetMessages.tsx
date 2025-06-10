import { FC } from 'react';
import { FaPenToSquare } from 'react-icons/fa6';

export const WidgetMessages: FC = () => {
  const messages = [
    {
      contact: 'Lorem ipsum',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut. ',
      dateTime: '25/12',
      unread: true,
    },
    {
      contact: 'Lorem ipsum',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut. ',
      dateTime: '25/12',
      unread: true,
    },
    {
      contact: 'Lorem ipsum',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut. ',
      dateTime: '24/12',
      unread: false,
    },
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="h-full w-full p-6">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between pb-2">
            <p className="text-xl font-black">Messages</p>
            <p>
              <FaPenToSquare />
            </p>
          </div>
          {messages.map(({ contact, message, dateTime, unread }) => {
            return (
              <div key={contact} className="grow border-t border-neutral-700">
                <div className="flex h-full w-full items-center gap-x-2 overflow-hidden">
                  {unread && (
                    <div>
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                  )}
                  <div className={`grow ${unread ? 'font-bold' : ''}`}>
                    <div className="flex items-center justify-between truncate">
                      <p className="text-sm">{contact}</p>
                      <p className="text-xs">{dateTime}</p>
                    </div>
                    <p className="w-44 truncate text-sm text-neutral-500">
                      {message}
                    </p>
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
