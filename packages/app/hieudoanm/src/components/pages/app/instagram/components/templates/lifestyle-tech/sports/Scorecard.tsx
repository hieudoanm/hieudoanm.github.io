import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Scorer {
  name: string;
  minute: string;
  team: string;
}

interface Stat {
  label: string;
  home: string;
  away: string;
}

export const Scorecard: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? 'Match Result';
  const text = (data.text as string) ?? '';
  const homeTeam = (data.homeTeam as string) ?? 'Home';
  const awayTeam = (data.awayTeam as string) ?? 'Away';
  const homeScore = (data.homeScore as number) ?? 0;
  const awayScore = (data.awayScore as number) ?? 0;
  const date = (data.date as string) ?? '';
  const venue = (data.venue as string) ?? '';
  const scorers = (data.scorers as Scorer[]) ?? [];
  const stats = (data.stats as Stat[]) ?? [
    { label: 'Possession', home: '55%', away: '45%' },
    { label: 'Shots', home: '12', away: '8' },
    { label: 'On Target', home: '5', away: '3' },
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-4 text-center">
        <div className="text-neutral text-xs font-semibold tracking-widest uppercase">
          {headline}
        </div>
        {text && <div className="text-neutral mt-1 text-xs">{text}</div>}
      </div>

      <div className="flex items-center justify-center gap-6 py-4">
        <div className="flex flex-1 flex-col items-end">
          <span className="text-base-content text-base font-bold">
            {homeTeam}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-base-content text-3xl font-black">
            {homeScore}
          </span>
          <span className="text-neutral text-base">-</span>
          <span className="text-base-content text-3xl font-black">
            {awayScore}
          </span>
        </div>
        <div className="flex flex-1 flex-col items-start">
          <span className="text-base-content text-base font-bold">
            {awayTeam}
          </span>
        </div>
      </div>

      {(date || venue) && (
        <div className="text-neutral mb-4 text-center text-xs">
          {date}
          {date && venue ? ' · ' : ''}
          {venue}
        </div>
      )}

      {scorers.length > 0 && (
        <div className="mb-4 flex justify-center gap-8">
          <div className="flex flex-col items-end gap-1">
            {scorers
              .filter((s) => s.team === 'home')
              .map((s, i) => (
                <span key={i} className="text-base-content text-xs">
                  {s.name} {s.minute}&apos;
                </span>
              ))}
          </div>
          <div className="flex flex-col items-start gap-1">
            {scorers
              .filter((s) => s.team === 'away')
              .map((s, i) => (
                <span key={i} className="text-base-content text-xs">
                  {s.name} {s.minute}&apos;
                </span>
              ))}
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col justify-center gap-2">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-base-content w-10 text-right text-xs font-semibold">
              {s.home}
            </span>
            <div className="bg-neutral/20 h-1.5 flex-1 overflow-hidden rounded-full">
              <div
                className="bg-accent h-full rounded-full"
                style={{ width: '60%' }}
              />
            </div>
            <span className="text-neutral w-20 text-center text-xs">
              {s.label}
            </span>
            <div className="bg-neutral/20 h-1.5 flex-1 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full"
                style={{ width: '40%' }}
              />
            </div>
            <span className="text-base-content w-10 text-left text-xs font-semibold">
              {s.away}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

Scorecard.displayName = 'Scorecard';
