import { FC, ReactNode, useState } from 'react';
import { Code } from './Code';

export const Preview: FC<{
  id: string;
  name: string;
  code: string;
  component: ReactNode;
}> = ({ id = '', name = '', code = '', component = <></> }) => {
  const [preview, setPreview] = useState<boolean>(true);

  return (
    <div id={id} className="flex flex-col gap-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{name}</h3>
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white shadow hover:bg-red-800 focus:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 dark:bg-red-700 dark:shadow-neutral-100/10"
          onClick={() => setPreview((previous: boolean) => !previous)}>
          {preview ? 'Preview' : 'Code'}
        </button>
      </div>
      <div className="flex items-center justify-center rounded-lg border border-neutral-200 p-8 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
        {preview ? <>{component}</> : <Code code={code} lang="html" />}{' '}
      </div>
    </div>
  );
};
