import { FC } from 'react';

export const Alert: FC = () => {
  return (
    <div className="w-full max-w-md overflow-hidden rounded border border-neutral-200 bg-white p-4 shadow-md">
      <div className="flex flex-col gap-y-1">
        <p className="font-black">Changes saved</p>
        <p className="text-sm text-gray-700">
          Your product changes have been saved.
        </p>
      </div>
    </div>
  );
};
