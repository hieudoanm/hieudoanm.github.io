export const WidgetPhoneContacts = () => {
  const contacts = [
    { shortName: 'CP', name: 'Carl Pei' },
    { shortName: 'TC', name: 'Tim Cook' },
    { shortName: 'LJ', name: 'Lei Jun' },
    { shortName: 'MB', name: 'Marques Brownlee' },
  ];

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-8">
        <div class="grid h-full grid-cols-2 gap-y-2">
          {contacts.map(({ shortName, name }) => {
            return (
              <div class="col-span-1">
                <div class="flex h-full w-full items-center justify-center">
                  <div class="flex flex-col gap-y-1">
                    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-black text-black">
                      <p>{shortName}</p>
                    </div>
                    <p class="w-20 truncate text-center text-xs">{name}</p>
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
