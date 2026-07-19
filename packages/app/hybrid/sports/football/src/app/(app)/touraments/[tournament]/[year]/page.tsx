import {
  Breadcrumbs,
  GroupStageTemplate,
  PageHeader,
  PageShell,
} from './_client';
import type { WorldCupYearData } from '@/data/touraments/international/world-cup/types';
import { ALL_WORLD_CUPS } from '@/data/touraments/international/world-cup';
import { ALL_EUROS } from '@/data/touraments/international/euro';
import { ALL_COPA } from '@/data/touraments/international/copa';
import { ALL_AFCON } from '@/data/touraments/international/afcon';
import { ALL_AFC } from '@/data/touraments/international/afc';
import { ALL_ASEAN } from '@/data/touraments/international/asean';
import { ALL_CONCACAF } from '@/data/touraments/international/concacaf';
import { ALL_PREMIER_LEAGUE } from '@/data/touraments/club/premier-league';
import { ALL_LA_LIGA } from '@/data/touraments/club/la-liga';
import { ALL_BUNDESLIGA } from '@/data/touraments/club/bundesliga';
import { ALL_CHAMPIONS_LEAGUE } from '@/data/touraments/club/champions-league';
import {
  TOURNAMENT_CONFIG,
  isValidTournament,
} from '@/data/touraments/tournament';
import type { TournamentSlug } from '@/data/touraments/tournament';
import { notFound } from 'next/navigation';

const ALL_DATA: Record<TournamentSlug, WorldCupYearData[]> = {
  'world-cup': ALL_WORLD_CUPS,
  euro: ALL_EUROS as unknown as WorldCupYearData[],
  'copa-america': ALL_COPA as unknown as WorldCupYearData[],
  afcon: ALL_AFCON as unknown as WorldCupYearData[],
  afc: ALL_AFC as unknown as WorldCupYearData[],
  concacaf: ALL_CONCACAF as unknown as WorldCupYearData[],
  asean: ALL_ASEAN as unknown as WorldCupYearData[],
  'premier-league': ALL_PREMIER_LEAGUE as unknown as WorldCupYearData[],
  'la-liga': ALL_LA_LIGA as unknown as WorldCupYearData[],
  bundesliga: ALL_BUNDESLIGA as unknown as WorldCupYearData[],
  'champions-league': ALL_CHAMPIONS_LEAGUE as unknown as WorldCupYearData[],
};

interface Params {
  tournament: string;
  year: string;
}

const TournamentYearPage = async ({ params }: { params: Promise<Params> }) => {
  const { tournament, year } = await params;
  if (!isValidTournament(tournament)) notFound();

  const yearNum = Number(year);
  if (Number.isNaN(yearNum)) notFound();

  const data = ALL_DATA[tournament];
  const wc = data.find((c) => c.year === yearNum);
  if (!wc) notFound();

  const config = TOURNAMENT_CONFIG[tournament];

  return (
    <PageShell>
      <div className="mb-6 flex justify-center">
        <Breadcrumbs
          crumbs={[
            { label: 'Football', href: '/touraments' },
            {
              label: config.label,
              href: config.hrefPrefix,
            },
            {
              label: String(wc.year),
              href: `${config.hrefPrefix}/${wc.year}`,
              years: data.map((c) => ({
                year: c.year,
                href: `${config.hrefPrefix}/${c.year}`,
              })),
            },
          ]}
        />
      </div>

      <PageHeader
        subtitle={`${wc.year} ${config.label} · ${wc.host}`}
        title={wc.champion ? `Champion: ${wc.champion}` : wc.host}>
        {wc.champion && (
          <div className="mb-2 text-sm font-medium text-amber-400/70">
            {wc.champion}
          </div>
        )}
      </PageHeader>

      <GroupStageTemplate wc={wc} tournament={tournament} />
    </PageShell>
  );
};

export function generateStaticParams() {
  return [
    ...ALL_WORLD_CUPS.map((c) => ({
      tournament: 'world-cup',
      year: String(c.year),
    })),
    ...ALL_EUROS.map((c) => ({ tournament: 'euro', year: String(c.year) })),
    ...ALL_COPA.map((c) => ({
      tournament: 'copa-america',
      year: String(c.year),
    })),
    ...ALL_AFCON.map((c) => ({ tournament: 'afcon', year: String(c.year) })),
    ...ALL_AFC.map((c) => ({ tournament: 'afc', year: String(c.year) })),
    ...ALL_CONCACAF.map((c) => ({
      tournament: 'concacaf',
      year: String(c.year),
    })),
    ...ALL_ASEAN.map((c) => ({ tournament: 'asean', year: String(c.year) })),
    ...ALL_PREMIER_LEAGUE.map((c) => ({
      tournament: 'premier-league',
      year: String(c.year),
    })),
    ...ALL_LA_LIGA.map((c) => ({
      tournament: 'la-liga',
      year: String(c.year),
    })),
    ...ALL_BUNDESLIGA.map((c) => ({
      tournament: 'bundesliga',
      year: String(c.year),
    })),
    ...ALL_CHAMPIONS_LEAGUE.map((c) => ({
      tournament: 'champions-league',
      year: String(c.year),
    })),
  ];
}

export default TournamentYearPage;
