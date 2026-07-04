import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const ProfileHeader: FC<TemplateProps> = ({ data }) => {
  const name = (data.name as string) ?? 'Alex Chen';
  const title = (data.title as string) ?? 'Senior Product Designer';
  const tagline =
    (data.tagline as string) ??
    'Designing meaningful experiences at the intersection of simplicity and functionality.';
  const email = (data.email as string) ?? 'alex@example.com';
  const phone = (data.phone as string) ?? '+1 (555) 123-4567';
  const location = (data.location as string) ?? 'San Francisco, CA';
  const website = (data.website as string) ?? 'alexchen.design';
  const github = (data.github as string) ?? '';
  const linkedin = (data.linkedin as string) ?? '';
  const instagram = (data.instagram as string) ?? '';
  const x = (data.x as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-10">
      <div className="bg-primary flex aspect-square h-16 w-16 items-center justify-center rounded-full text-2xl font-black text-white">
        {name.charAt(0)}
      </div>

      <h1 className="text-base-content mt-4 text-2xl font-bold">{name}</h1>
      <span className="text-accent mt-1 text-xs font-semibold">{title}</span>

      <p className="text-neutral mt-3 max-w-[280px] text-center text-xs leading-relaxed">
        {tagline}
      </p>

      <div className="bg-base-200 mt-5 flex flex-col gap-2 rounded-lg px-5 py-3">
        {email && (
          <div className="flex items-center gap-2">
            <span className="text-accent text-[10px]">✉</span>
            <span className="text-base-content text-[11px]">{email}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-2">
            <span className="text-accent text-[10px]">☎</span>
            <span className="text-base-content text-[11px]">{phone}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center gap-2">
            <span className="text-accent text-[10px]">◎</span>
            <span className="text-base-content text-[11px]">{location}</span>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-2">
            <span className="text-accent text-[10px]">⊞</span>
            <span className="text-base-content text-[11px]">{website}</span>
          </div>
        )}
        {github && (
          <div className="flex items-center gap-2">
            <span className="text-accent text-[10px]">⌘</span>
            <span className="text-base-content text-[11px]">
              github.com/{github}
            </span>
          </div>
        )}
        {linkedin && (
          <div className="flex items-center gap-2">
            <span className="text-accent text-[10px]">◫</span>
            <span className="text-base-content text-[11px]">
              linkedin.com/in/{linkedin}
            </span>
          </div>
        )}
        {instagram && (
          <div className="flex items-center gap-2">
            <span className="text-accent text-[10px]">◎</span>
            <span className="text-base-content text-[11px]">@{instagram}</span>
          </div>
        )}
        {x && (
          <div className="flex items-center gap-2">
            <span className="text-accent text-[10px]">✕</span>
            <span className="text-base-content text-[11px]">@{x}</span>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileHeader.displayName = 'ProfileHeader';
