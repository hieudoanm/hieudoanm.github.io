import { FC } from 'react';

export const WidgetPhoneContacts: FC = () => {
  const contacts = [
    { shortName: 'CP', name: 'Carl Pei' },
    { shortName: 'TC', name: 'Tim Cook' },
    { shortName: 'LJ', name: 'Lei Jun' },
    { shortName: 'MB', name: 'Marques Brownlee' },
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-3xl bg-black text-white">
      <div className="h-full w-full p-8">
        <div className="grid grid-cols-2 pb-2">
          <div className="col-span-1">
            <h1 className="text-center font-black">Contacts</h1>
          </div>
          <div className="col-span-1">
            <p className="text-center text-sm">Favourites</p>
          </div>
        </div>
        <div className="grid grow grid-cols-2 gap-y-2">
          {contacts.map(({ shortName, name }, index) => {
            return (
              <div key={'item' + index} className="col-span-1">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex flex-col gap-y-2">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-black text-black">
                      <p>{shortName}</p>
                    </div>
                    <p className="w-20 truncate text-center">{name}</p>
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
