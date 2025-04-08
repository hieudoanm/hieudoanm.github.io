import { FaSolidPlus } from 'solid-icons/fa';

export const WidgetCalendarEvents = () => {
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
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-6">
        <div class="flex h-full flex-col">
          <div class="flex items-center justify-between pb-2">
            <p class="text-lg font-black">Events</p>
            <button type="button">
              <FaSolidPlus />
            </button>
          </div>
          {events.map(({ title, description, dateTime }) => {
            return (
              <div title={title} class="grow border-t border-gray-700">
                <div class="flex h-full w-full items-center gap-x-2 overflow-hidden">
                  <div class="w-full">
                    <div class="flex items-center justify-between truncate">
                      <p class="text-sm font-bold">{title}</p>
                      <p class="text-xs">{dateTime}</p>
                    </div>
                    <p class="w-48 truncate text-sm text-gray-500">
                      {description}
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
