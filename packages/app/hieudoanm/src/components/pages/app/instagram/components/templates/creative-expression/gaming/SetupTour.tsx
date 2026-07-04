import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface SetupComponent {
  name: string;
  spec: string;
}

export const SetupTour: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'My Gaming Setup';
  const description =
    (data.description as string) ?? 'The ultimate gaming station';
  const components =
    (data.components as SetupComponent[]) ??
    ([
      { name: 'Monitor', spec: '27" 4K 144Hz' },
      { name: 'Keyboard', spec: 'Mechanical RGB' },
    ] as SetupComponent[]);
  const totalCost = (data.totalCost as string) ?? '$2,500';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <h1 className="text-accent mb-1 text-2xl font-bold">{title}</h1>
      <p className="text-neutral mb-4 text-xs">{description}</p>
      <div className="mb-4 flex flex-1 flex-col gap-3">
        {components.map((item, i) => (
          <div
            key={i}
            className="bg-base-200 flex items-center justify-between rounded-lg px-4 py-3">
            <span className="text-base-content text-sm font-semibold">
              {item.name}
            </span>
            <span className="text-neutral text-xs">{item.spec}</span>
          </div>
        ))}
      </div>
      <div className="border-t-base-200 border-t pt-3 text-right">
        <span className="text-base-300 text-[10px] tracking-wider uppercase">
          Total
        </span>
        <p className="text-primary text-lg font-extrabold">{totalCost}</p>
      </div>
    </div>
  );
};

SetupTour.displayName = 'SetupTour';
