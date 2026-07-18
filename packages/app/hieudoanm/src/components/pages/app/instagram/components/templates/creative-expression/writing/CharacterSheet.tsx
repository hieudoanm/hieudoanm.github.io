import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const CharacterSheet: FC<TemplateProps> = ({ data }) => {
  const name = (data.name as string) ?? 'Character';
  const role = (data.role as string) ?? 'Protagonist';
  const description = (data.description as string) ?? '';
  const traits = (data.traits as string[]) ?? ['Brave', 'Curious', 'Flawed'];
  const motivation = (data.motivation as string) ?? '';
  const flaw = (data.flaw as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-0.5 text-4xl font-black tracking-tight">
        {name}
      </h1>
      <span className="badge badge-primary badge-sm mb-3">{role}</span>
      {description && (
        <p className="text-neutral mb-2 max-w-sm text-xs leading-relaxed">
          {description}
        </p>
      )}
      <ul className="mb-2 flex flex-wrap justify-center gap-1">
        {traits.map((trait) => (
          <li key={trait} className="badge badge-outline badge-sm">
            {trait}
          </li>
        ))}
      </ul>
      {motivation && (
        <p className="text-base-content mb-0.5 max-w-sm text-xs">
          <strong className="font-bold">Motivation:</strong> {motivation}
        </p>
      )}
      {flaw && (
        <p className="text-error max-w-sm text-xs">
          <strong className="font-bold">Flaw:</strong> {flaw}
        </p>
      )}
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};

CharacterSheet.displayName = 'CharacterSheet';
