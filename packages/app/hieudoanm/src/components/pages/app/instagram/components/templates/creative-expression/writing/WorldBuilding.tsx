import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface WorldAspect {
  name: string;
  detail: string;
}

export const WorldBuilding: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'World Building';
  const worldName = (data.worldName as string) ?? 'New World';
  const description = (data.description as string) ?? '';
  const aspects = (data.aspects as WorldAspect[]) ?? [
    { name: 'Geography', detail: 'Diverse landscapes and climates' },
    { name: 'Culture', detail: 'Unique traditions and beliefs' },
    { name: 'Technology', detail: 'Level of advancement' },
  ];
  const rules = (data.rules as string[]) ?? [
    'Magic has a cost',
    'Actions have consequences',
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-1 text-2xl font-black tracking-tight">
        {worldName}
      </h1>
      <p className="text-primary mb-2 text-xs font-semibold tracking-wider uppercase">
        {title}
      </p>
      {description && (
        <p className="text-neutral mb-5 max-w-sm text-sm leading-relaxed">
          {description}
        </p>
      )}
      <div className="mb-5 grid w-full max-w-md grid-cols-2 gap-3">
        {aspects.map((a) => (
          <div key={a.name} className="bg-base-200 rounded-lg p-3 text-left">
            <span className="text-base-content text-xs font-bold">
              {a.name}
            </span>
            <p className="text-neutral text-[11px] leading-relaxed">
              {a.detail}
            </p>
          </div>
        ))}
      </div>
      {rules.length > 0 && (
        <div className="w-full max-w-md text-left">
          <span className="text-base-content mb-2 block text-xs font-bold tracking-wider uppercase">
            World Rules
          </span>
          <ul className="space-y-1">
            {rules.map((rule) => (
              <li
                key={rule}
                className="text-neutral flex items-start gap-2 text-xs">
                <span className="text-primary mt-0.5">&#10003;</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

WorldBuilding.displayName = 'WorldBuilding';
