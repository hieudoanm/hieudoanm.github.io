import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const NetworkingTip: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Networking Tip';
  const tip = (data.tip as string) ?? '';
  const description = (data.description as string) ?? '';
  const doList = (data.doList as string[]) ?? [];
  const dontList = (data.dontList as string[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-primary mb-2 text-3xl font-bold">{title}</h1>
      <p className="text-accent mb-2 text-xl font-semibold italic">"{tip}"</p>
      <p className="text-base-content/70 mb-6 max-w-lg text-sm leading-relaxed">
        {description}
      </p>
      <div className="flex w-full max-w-lg gap-4">
        <div className="bg-success/10 flex-1 rounded-xl p-4 text-left">
          <p className="text-success mb-2 text-sm font-bold">✓ Do</p>
          <ul className="space-y-1">
            {doList.map((item, index) => (
              <li key={index} className="text-base-content/70 text-xs">
                • {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-error/10 flex-1 rounded-xl p-4 text-left">
          <p className="text-error mb-2 text-sm font-bold">✗ Don't</p>
          <ul className="space-y-1">
            {dontList.map((item, index) => (
              <li key={index} className="text-base-content/70 text-xs">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
NetworkingTip.displayName = 'NetworkingTip';
