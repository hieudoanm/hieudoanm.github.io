import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const NetworkingTip: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Networking Tip';
  const tip = (data.tip as string) ?? '';
  const description = (data.description as string) ?? '';
  const doList = (data.doList as string[]) ?? [];
  const dontList = (data.dontList as string[]) ?? [];

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-primary mb-1 text-4xl font-bold">{title}</h1>
      <p className="text-accent mb-1 text-2xl font-semibold italic">"{tip}"</p>
      <p className="text-base-content/70 mb-3 max-w-lg text-xs leading-relaxed">
        {description}
      </p>
      <div className="flex w-full max-w-lg gap-3">
        <div className="bg-success/10 flex-1 rounded-lg p-2 text-left">
          <p className="text-success mb-1 text-xs font-bold">✓ Do</p>
          <ul className="space-y-0.5">
            {doList.map((item, index) => (
              <li key={index} className="text-base-content/70 text-xs">
                • {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-error/10 flex-1 rounded-lg p-2 text-left">
          <p className="text-error mb-1 text-xs font-bold">✗ Don't</p>
          <ul className="space-y-0.5">
            {dontList.map((item, index) => (
              <li key={index} className="text-base-content/70 text-xs">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};
NetworkingTip.displayName = 'NetworkingTip';
