import { useState } from 'react';

export const WidgetTasks = () => {
  const [items, setItems] = useState([
    { title: 'Health Check', completed: false },
    { title: 'Complete NAB Tasks', completed: true },
    { title: 'Complete RMIT Tasks', completed: false },
    { title: 'Play Chess', completed: true },
    { title: 'Learn Korean', completed: false },
  ]);

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="h-full w-full p-6">
        <div className="grid h-full grid-rows-6">
          <div className="col-span-1">
            <div className="flex h-full items-center justify-between">
              <h1 className="text-xl font-black">to(day)do</h1>
              <p className="text-xl">
                {items.filter(({ completed }) => !completed).length}
              </p>
            </div>
          </div>
          {items.map(({ title, completed }, index) => {
            return (
              <div key={title} className="col-span-1">
                <button
                  type="button"
                  className="flex h-full items-center gap-x-2"
                  onClick={() => {
                    items[index].completed = !completed;
                    setItems([...items]);
                  }}>
                  <div className="flex aspect-square w-4 items-center justify-center rounded-full border-2 border-white">
                    {completed ? (
                      <div className="aspect-square w-2 rounded-full bg-white" />
                    ) : (
                      <></>
                    )}
                  </div>
                  <p
                    className={`truncate whitespace-nowrap capitalize ${completed ? 'text-neutral-500 line-through' : ''}`}>
                    {title}
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
