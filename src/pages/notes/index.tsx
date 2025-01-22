import { NextPage } from 'next';
import { FaPenToSquare } from 'react-icons/fa6';

const NotesPage: NextPage = () => {
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
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-3xl bg-black text-white">
          <div className="h-full w-full p-8">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between pb-2">
                <p className="text-xl font-black">Notes</p>
                <p>
                  <FaPenToSquare />
                </p>
              </div>
              {notes.map(({ title, content, dateTime }) => {
                return (
                  <div key={title} className="grow border-t border-gray-700">
                    <div className="flex h-full w-full items-center">
                      <div className="w-full">
                        <div className="flex w-full items-center justify-between">
                          <p className="font-bold">{title}</p>
                          <p className="text-sm">{dateTime}</p>
                        </div>
                        <p className="w-full truncate text-gray-500">
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
      </div>
    </div>
  );
};

export default NotesPage;
