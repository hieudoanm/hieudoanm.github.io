import type { FC } from 'react';

import type { WorldCupYearData } from '../../data/international/world-cup/types';
import type { GroupData, TeamStanding } from './types';
import { KNOCKOUT_DATA as WC_KNOCKOUT_DATA } from '../../data/international/world-cup/knock-out';
import { KNOCKOUT_DATA as EURO_KNOCKOUT_DATA } from '../../data/international/euro';
import { KNOCKOUT_DATA as COPA_KNOCKOUT_DATA } from '../../data/international/copa';
import { KNOCKOUT_DATA as AFCON_KNOCKOUT_DATA } from '../../data/international/afcon';
import { KNOCKOUT_DATA as AFC_KNOCKOUT_DATA } from '../../data/international/afc';
import { KNOCKOUT_DATA as ASEA_KNOCKOUT_DATA } from '../../data/international/asean';
import { KNOCKOUT_DATA as CONCACAF_KNOCKOUT_DATA } from '../../data/international/concacaf';
import { KNOCKOUT_DATA as PL_KNOCKOUT_DATA } from '../../data/club/premier-league';
import { KNOCKOUT_DATA as CL_KNOCKOUT_DATA } from '../../data/club/champions-league';
import type { TournamentSlug } from '../../data/tournament';
import { KnockoutLink } from '../../components/KnockoutLink';

export const GroupTable: FC<{
  group: GroupData;
  teams: Record<string, { id: string; name: string; iso: string }>;
}> = ({ group, teams }) => {
  const hasStandings = group.standings != null;

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/60">
      <div className="border-b border-neutral-800 bg-neutral-800/40 px-4 py-2.5 font-serif text-sm tracking-widest text-amber-400 uppercase">
        {group.label}
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-neutral-800 text-neutral-500">
            <th className="w-8 px-1 py-2 text-center">#</th>
            <th className="px-2 py-2 text-left">Team</th>
            {hasStandings && (
              <>
                <th className="w-8 px-1 py-2 text-center">Pld</th>
                <th className="w-8 px-1 py-2 text-center">W</th>
                <th className="w-8 px-1 py-2 text-center">D</th>
                <th className="w-8 px-1 py-2 text-center">L</th>
                <th className="w-8 px-1 py-2 text-center">GF</th>
                <th className="w-8 px-1 py-2 text-center">GA</th>
                <th className="w-8 px-1 py-2 text-center">GD</th>
              </>
            )}
            <th
              className={`px-1 py-2 text-center font-semibold ${hasStandings ? 'text-stone-200' : 'text-neutral-500'}`}>
              {hasStandings ? 'Pts' : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {group.teams.map((teamId, i) => {
            const info = teams[teamId];
            const s: TeamStanding | undefined = hasStandings
              ? group.standings![teamId]
              : undefined;
            const advance = i < 2;
            return (
              <tr
                key={teamId}
                className={`border-b border-neutral-800/50 transition-colors ${
                  advance ? 'bg-amber-400/5' : ''
                }`}>
                <td
                  className={`px-1 py-2 text-center font-mono ${advance ? 'text-amber-400' : 'text-neutral-500'}`}>
                  {i + 1}
                </td>
                <td className="flex items-center gap-2 px-2 py-2">
                  {info && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://flagcdn.com/w20/${info.iso}.png`}
                        alt=""
                        className="inline-block h-3 w-4 rounded-sm object-cover"
                      />
                      <span
                        className={
                          advance
                            ? 'font-medium text-stone-200'
                            : 'text-stone-200'
                        }>
                        {info.name}
                      </span>
                    </>
                  )}
                  {!info && <span className="text-neutral-500">{teamId}</span>}
                </td>
                {hasStandings && s && (
                  <>
                    <td className="px-1 py-2 text-center text-neutral-400">
                      {s.pld}
                    </td>
                    <td className="px-1 py-2 text-center text-neutral-400">
                      {s.w}
                    </td>
                    <td className="px-1 py-2 text-center text-neutral-400">
                      {s.d}
                    </td>
                    <td className="px-1 py-2 text-center text-neutral-400">
                      {s.l}
                    </td>
                    <td className="px-1 py-2 text-center text-neutral-400">
                      {s.gf}
                    </td>
                    <td className="px-1 py-2 text-center text-neutral-400">
                      {s.ga}
                    </td>
                    <td
                      className={`px-1 py-2 text-center font-mono ${
                        s.gd > 0
                          ? 'text-green-400'
                          : s.gd < 0
                            ? 'text-red-400'
                            : 'text-neutral-400'
                      }`}>
                      {s.gd > 0 ? `+${s.gd}` : s.gd}
                    </td>
                    <td className="px-1 py-2 text-center font-semibold text-stone-200">
                      {s.pts}
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const KNOCKOUT_DATA_MAP: Record<TournamentSlug, Record<number, unknown>> = {
  'world-cup': WC_KNOCKOUT_DATA,
  euro: EURO_KNOCKOUT_DATA,
  'copa-america': COPA_KNOCKOUT_DATA,
  afcon: AFCON_KNOCKOUT_DATA,
  afc: AFC_KNOCKOUT_DATA,
  concacaf: CONCACAF_KNOCKOUT_DATA,
  asean: ASEA_KNOCKOUT_DATA,
  'premier-league': PL_KNOCKOUT_DATA,
  'champions-league': CL_KNOCKOUT_DATA,
};

export const GroupStagePage: FC<{
  wc: WorldCupYearData;
  tournament?: TournamentSlug;
}> = ({ wc, tournament = 'world-cup' }) => {
  const knockoutData = KNOCKOUT_DATA_MAP[tournament];
  return (
    <>
      {wc.groups.length > 0 ? (
        <>
          {knockoutData[wc.year] && (
            <KnockoutLink year={wc.year} tournament={tournament} />
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {wc.groups.map((group) => (
              <GroupTable key={group.name} group={group} teams={wc.teams} />
            ))}
          </div>
        </>
      ) : (
        <>
          {knockoutData[wc.year] && (
            <KnockoutLink year={wc.year} tournament={tournament} />
          )}
          <div className="mt-12 text-center text-sm text-neutral-500">
            {wc.year} was a straight knockout tournament with no group stage.
          </div>
        </>
      )}
    </>
  );
};
GroupStagePage.displayName = 'GroupStagePage';
