import { FaSolidPenToSquare } from 'solid-icons/fa';

export const WidgetMessages = () => {
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
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-6">
        <div class="flex h-full flex-col">
          <div class="flex items-center justify-between pb-2">
            <p class="text-xl font-black">Messages</p>
            <p>
              <FaSolidPenToSquare />
            </p>
          </div>
          {messages.map(({ contact, message, dateTime, unread }) => {
            return (
              <div title={contact} class="grow border-t border-gray-700">
                <div class="flex h-full w-full items-center gap-x-2 overflow-hidden">
                  {unread && (
                    <div>
                      <div class="h-2 w-2 rounded-full bg-white" />
                    </div>
                  )}
                  <div class={`grow ${unread ? 'font-bold' : ''}`}>
                    <div class="flex items-center justify-between truncate">
                      <p class="text-sm">{contact}</p>
                      <p class="text-xs">{dateTime}</p>
                    </div>
                    <p class="w-44 truncate text-sm text-gray-500">{message}</p>
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
