import type { FC } from 'react';
import type { TemplateProps } from '../common';

interface TeamMember {
  name: string;
  role: string;
  imageUrl?: string;
}

export const TeamRow: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const members = (data.members as TeamMember[]) ?? [];
  const team =
    members.length > 0
      ? members
      : [
          { name: 'Alice', role: 'Designer' },
          { name: 'Bob', role: 'Developer' },
          { name: 'Carol', role: 'Manager' },
        ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <h1 className="text-base-content mb-8 text-center text-2xl font-bold tracking-tight">
        {headline || 'Our Team'}
      </h1>
      <div className="flex flex-1 items-center justify-center gap-6">
        {team.slice(0, 4).map((member, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            {member.imageUrl ? (
              <div
                className="ring-accent/20 h-16 w-16 rounded-full bg-cover bg-center ring-2"
                style={{ backgroundImage: `url(${member.imageUrl})` }}
              />
            ) : (
              <div className="bg-accent/10 ring-accent/20 flex h-16 w-16 items-center justify-center rounded-full ring-2">
                <span className="text-accent text-lg font-bold">
                  {member.name.charAt(0) || '?'}
                </span>
              </div>
            )}
            <span className="text-base-content text-sm font-bold">
              {member.name}
            </span>
            <span className="text-neutral text-xs">{member.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

TeamRow.displayName = 'TeamRow';
