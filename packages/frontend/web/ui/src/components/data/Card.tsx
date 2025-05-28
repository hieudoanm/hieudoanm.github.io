import card from '@atomic-ui/assets/card.jpg';
import { FC } from 'react';

export const Card: FC = () => {
  return (
    <div className="w-full max-w-md divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-neutral-100/10">
      <div
        className="aspect-video w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${card.src})` }}
      />
      <div className="flex flex-col gap-y-2 p-6">
        <h3 className="text-2xl font-bold">Title</h3>
        <h6 className="text-base font-normal text-neutral-700 dark:text-neutral-300">
          Subtitle
        </h6>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          elementum semper urna ac lacinia. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per.
        </p>
      </div>
      <div className="flex justify-end px-6 py-3">
        <button className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white shadow hover:bg-red-800 focus:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 dark:bg-red-700 dark:shadow-neutral-100/10">
          Button
        </button>
      </div>
    </div>
  );
};
