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

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-6">
      <div className="text-base-content mb-4 text-center text-sm font-bold">
        {headline}
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {members.slice(0, 9).map((m, i) => (
          <div
            key={i}
            className="bg-accent/5 border-base-300 flex flex-col items-center gap-1 rounded border p-2">
            <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full">
              <span className="text-primary text-xs font-bold">
                {m.name.charAt(0)}
              </span>
            </div>
            <span className="text-base-content text-[10px] font-bold">
              {m.name}
            </span>
            <span className="text-neutral text-[9px]">{m.role}</span>
            {m.number != null && (
              <span className="text-primary text-[10px] font-bold">
                #{m.number}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

TeamRoster.displayName = 'TeamRoster';
