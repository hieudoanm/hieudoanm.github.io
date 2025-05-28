/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';

export const Avatar: FC = () => {
  return (
    <div className="flex flex-col items-center gap-2 md:flex-row">
      <div className="aspect-square w-32 overflow-hidden rounded-full border-4 border-purple-600 p-0.5 shadow dark:border-purple-700 dark:shadow-neutral-100/10">
        <img
          src="/assets/avatar.jpg"
          alt="avatar"
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="aspect-square w-32 overflow-hidden rounded-full border-4 border-green-600 p-0.5 shadow dark:border-green-700 dark:shadow-neutral-100/10">
        <img
          src="/assets/avatar.jpg"
          alt="avatar"
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="aspect-square w-32 overflow-hidden rounded-full border-4 border-blue-600 p-0.5 shadow dark:border-blue-700 dark:shadow-neutral-100/10">
        <img
          src="/assets/avatar.jpg"
          alt="avatar"
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="aspect-square w-32 overflow-hidden rounded-full border-4 border-yellow-600 p-0.5 shadow dark:border-yellow-700 dark:shadow-neutral-100/10">
        <img
          src="/assets/avatar.jpg"
          alt="avatar"
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="aspect-square w-32 overflow-hidden rounded-full border-4 border-orange-600 p-0.5 shadow dark:border-orange-700 dark:shadow-neutral-100/10">
        <img
          src="/assets/avatar.jpg"
          alt="avatar"
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="aspect-square w-32 overflow-hidden rounded-full border-4 border-red-600 p-0.5 shadow dark:border-red-700 dark:shadow-neutral-100/10">
        <img
          src="/assets/avatar.jpg"
          alt="avatar"
          className="h-full w-full rounded-full"
        />
      </div>
    </div>
  );
};
