import { FaPenToSquare } from 'react-icons/fa6';

export const WidgetNotes = () => {
  const notes = [
    {
      title: 'Lorem ipsum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut. ',
      dateTime: '25/12',
    },
    {
      title: 'Lorem ipsum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut. ',
      dateTime: '25/12',
    },
    {
      title: 'Lorem ipsum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut. ',
      dateTime: '25/12',
    },
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="h-full w-full p-6">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between pb-2">
            <p className="text-xl font-black">Notes</p>
            <p>
              <FaPenToSquare />
            </p>
          </div>
          {notes.map(({ title, content, dateTime }) => {
            return (
              <div key={title} className="grow border-t border-neutral-700">
                <div className="flex h-full w-full items-center">
                  <div className="w-full">
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm font-bold">{title}</p>
                      <p className="text-xs">{dateTime}</p>
                    </div>
                    <p className="w-44 truncate text-sm text-neutral-500">
                      {content}
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
