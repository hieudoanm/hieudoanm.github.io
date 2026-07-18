import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Member {
  name: string;
  role: string;
  number?: number;
}

export const TeamRoster: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? 'Team Roster';
  const members = (data.members as Member[]) ?? [
    { name: 'Alice', role: 'Captain', number: 10 },
    { name: 'Bob', role: 'Striker', number: 9 },
    { name: 'Carol', role: 'Defender', number: 4 },
    { name: 'Dave', role: 'Midfielder', number: 8 },
    { name: 'Eve', role: 'Goalkeeper', number: 1 },
    { name: 'Frank', role: 'Winger', number: 7 },
  ];

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <h2 className="text-base-content mb-4 text-center text-xs font-bold">
        {headline}
      </h2>
      <ul className="grid flex-1 grid-cols-3 gap-1">
        {members.slice(0, 9).map((m, i) => (
          <li
            key={i}
            className="bg-accent/5 border-base-300 flex flex-col items-center gap-1 rounded border p-1">
            <div className="bg-primary/20 flex h-4 w-4 items-center justify-center rounded-full">
              <span className="text-primary text-xs font-bold">
                {m.name.charAt(0)}
              </span>
            </div>
            <span className="text-base-content text-xs font-bold">
              <strong>{m.name}</strong>
            </span>
            <span className="text-neutral text-xs">{m.role}</span>
            {m.number != null && (
              <span className="text-primary text-xs font-bold">
                #{m.number}
              </span>
            )}
          </li>
        ))}
      </ul>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};

TeamRoster.displayName = 'TeamRoster';
