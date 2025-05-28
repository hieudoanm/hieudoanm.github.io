import { FC, ReactNode, useState } from 'react';
import { Code } from './typography/Code';

export const Preview: FC<{
  id: string;
  name: string;
  code: string;
  component: ReactNode;
}> = ({ id = '', name = '', code = '', component = <></> }) => {
  const [preview, setPreview] = useState<boolean>(true);

  return (
    <div id={id} className="flex flex-col gap-y-4 md:gap-y-8">
      <div className="flex items-center justify-between gap-x-2">
        <h3 className="w-48 truncate text-xl font-bold whitespace-nowrap md:text-2xl">
          {name}
        </h3>
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white shadow dark:bg-red-700 dark:shadow-neutral-100/10"
          onClick={() => setPreview((previous: boolean) => !previous)}>
          {preview ? 'Preview' : 'Code'}
        </button>
      </div>
      <div className="flex items-center justify-center overflow-hidden rounded-lg border border-neutral-200 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
        {preview ? (
          <div className="w-full p-4 md:p-8">{component}</div>
        ) : (
          <Code code={code} lang="html" />
        )}
      </div>
    </div>
  );
};
