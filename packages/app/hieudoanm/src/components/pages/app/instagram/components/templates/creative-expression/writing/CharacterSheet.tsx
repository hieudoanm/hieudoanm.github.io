import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const CharacterSheet: FC<TemplateProps> = ({ data }) => {
  const name = (data.name as string) ?? 'Character';
  const role = (data.role as string) ?? 'Protagonist';
  const description = (data.description as string) ?? '';
  const traits = (data.traits as string[]) ?? ['Brave', 'Curious', 'Flawed'];
  const motivation = (data.motivation as string) ?? '';
  const flaw = (data.flaw as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-1 text-2xl font-black tracking-tight">
        {name}
      </h1>
      <span className="badge badge-primary badge-sm mb-3">{role}</span>
      {description && (
        <p className="text-neutral mb-4 max-w-sm text-sm leading-relaxed">
          {description}
        </p>
      )}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {traits.map((trait) => (
          <span key={trait} className="badge badge-outline badge-sm">
            {trait}
          </span>
        ))}
      </div>
      {motivation && (
        <p className="text-base-content mb-1 max-w-sm text-xs">
          <span className="font-bold">Motivation:</span> {motivation}
        </p>
      )}
      {flaw && (
        <p className="text-error max-w-sm text-xs">
          <span className="font-bold">Flaw:</span> {flaw}
        </p>
      )}
    </div>
  );
};

CharacterSheet.displayName = 'CharacterSheet';
