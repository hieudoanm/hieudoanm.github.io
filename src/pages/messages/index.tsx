import { NextPage } from 'next';
import { FaPenToSquare } from 'react-icons/fa6';

const MessagesPage: NextPage = () => {
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
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-3xl bg-black text-white">
          <div className="h-full w-full p-8">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between pb-2">
                <p className="text-xl font-black">Messages</p>
                <p>
                  <FaPenToSquare />
                </p>
              </div>
              {messages.map(({ contact, message, dateTime, unread }) => {
                return (
                  <div key={contact} className="grow border-t border-gray-700">
                    <div className="flex h-full w-full items-center gap-x-2 overflow-hidden">
                      {unread && (
                        <div>
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                      )}
                      <div className={`grow ${unread ? 'font-bold' : ''}`}>
                        <div className="flex items-center justify-between truncate">
                          <p className="text-base">{contact}</p>
                          <p className="text-xs">{dateTime}</p>
                        </div>
                        <p className="w-48 truncate text-gray-500">{message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
