import { FC } from 'react';

export const WidgetPhoneContacts: FC = () => {
  const contacts = [
    { shortName: 'CP', name: 'Carl Pei' },
    { shortName: 'TC', name: 'Tim Cook' },
    { shortName: 'LJ', name: 'Lei Jun' },
    { shortName: 'MB', name: 'Marques Brownlee' },
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="h-full w-full p-8">
        <div className="grid h-full grid-cols-2 gap-y-2">
          {contacts.map(({ shortName, name }, index) => {
            return (
              <div key={'item' + index} className="col-span-1">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex flex-col gap-y-1">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-black text-black">
                      <p>{shortName}</p>
                    </div>
                    <p className="w-20 truncate text-center text-xs">{name}</p>
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
