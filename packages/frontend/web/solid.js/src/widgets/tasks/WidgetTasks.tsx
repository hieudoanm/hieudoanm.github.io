import { createSignal } from 'solid-js';

export const WidgetTasks = () => {
  const [items, setItems] = createSignal([
    { title: 'Health Check', completed: false },
    { title: 'Complete NAB Tasks', completed: true },
    { title: 'Complete RMIT Tasks', completed: false },
    { title: 'Play Chess', completed: true },
    { title: 'Learn Korean', completed: false },
  ]);

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-6">
        <div class="grid h-full grid-rows-6">
          <div class="col-span-1">
            <div class="flex h-full items-center justify-between">
              <h1 class="text-xl font-black">to(day)do</h1>
              <p class="text-xl">
                {items().filter(({ completed }) => !completed).length}
              </p>
            </div>
          </div>
          {items().map(({ title, completed }, index) => {
            return (
              <div title={title} class="col-span-1">
                <button
                  type="button"
                  class="flex h-full items-center gap-x-2"
                  onClick={() => {
                    items()[index].completed = !completed;
                    setItems([...items()]);
                  }}>
                  <div class="flex aspect-square w-4 items-center justify-center rounded-full border-2 border-white">
                    {completed ? (
                      <div class="aspect-square w-2 rounded-full bg-white" />
                    ) : (
                      <></>
                    )}
                  </div>
                  <p
                    class={`truncate whitespace-nowrap capitalize ${completed ? 'text-gray-500 line-through' : ''}`}>
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
