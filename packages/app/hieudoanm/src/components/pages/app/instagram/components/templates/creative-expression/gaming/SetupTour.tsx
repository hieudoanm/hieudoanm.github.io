import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

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

  const citation = (data.citation as string) ?? '';
  return (
    <Background>
      <h1 className="text-accent mb-0.5 text-4xl font-bold">{title}</h1>
      <p className="text-neutral mb-2 text-xs">{description}</p>
      <ul className="mb-2 flex flex-1 flex-col gap-2">
        {components.map((item, i) => (
          <li
            key={i}
            className="bg-base-200 flex items-center justify-between rounded-lg px-2 py-2">
            <span className="text-base-content text-xs font-semibold">
              {item.name}
            </span>
            <span className="text-neutral text-xs">{item.spec}</span>
          </li>
        ))}
      </ul>
      <div className="border-t-base-200 border-t pt-2 text-right">
        <span className="text-base-300 text-xs tracking-wider uppercase">
          Total
        </span>
        <p className="text-primary text-xs font-extrabold">{totalCost}</p>
      </div>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

SetupTour.displayName = 'SetupTour';
