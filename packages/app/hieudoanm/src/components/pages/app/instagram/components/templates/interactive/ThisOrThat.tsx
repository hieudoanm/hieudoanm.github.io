import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const ThisOrThat: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const optionA = (data.optionA as string) ?? '';
  const optionB = (data.optionB as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <h1 className="text-base-content mb-6 text-center text-lg font-bold">
        {headline}
      </h1>
      <div className="flex flex-1 items-stretch gap-3">
        <div className="rounded-box border-accent/20 flex flex-1 items-center justify-center border px-4">
          <p className="text-base-content text-center text-sm font-bold">
            {optionA}
          </p>
        </div>
        <div className="flex items-center">
          <span className="text-accent text-2xl font-bold">VS</span>
        </div>
        <div className="rounded-box border-accent/20 flex flex-1 items-center justify-center border px-4">
          <p className="text-base-content text-center text-sm font-bold">
            {optionB}
          </p>
        </div>
      </div>
      <p className="text-neutral mt-4 text-center text-[10px]">
        Which one do you prefer?
      </p>
    </div>
  );
};

ThisOrThat.displayName = 'ThisOrThat';
