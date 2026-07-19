import type { FC } from 'react';
import Link from 'next/link';
import {
  DIVISION_ROUTES,
  REGIONS,
  childrenOf,
  pathTo,
  regionById,
} from '@/games/stem/neuroscience/anatomy/brain-atlas/atlas';
import { depthLabel } from '@/games/stem/neuroscience/anatomy/brain-atlas/region-body';

interface DivisionCard {
  id: string;
  name: string;
  route: string;
  summary: string;
  depth: number;
  count: number;
}

const cards: (DivisionCard & { root: string })[] = DIVISION_ROUTES.map(
  ({ id, route }) => {
    const region = regionById(id);
    return {
      id,
      name: region?.name ?? id,
      route,
      summary: region?.summary ?? '',
      depth: region?.depth ?? 0,
      count: childrenOf(id).length,
      root: pathTo(id)[0]?.id ?? id,
    };
  }
);

const ROOTS = ['cerebrum', 'diencephalon', 'cerebellum', 'brainstem'].map(
  (id) => ({
    id,
    name: regionById(id)?.name ?? id,
    summary: regionById(id)?.summary ?? '',
  })
);

const BrainAtlasPage: FC = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-4 md:p-6">
    <Link
      href="/neuroscience"
      className="text-primary -mb-4 text-sm hover:underline">
      ← Back to Neuroscience
    </Link>

    <header className="flex flex-col items-center gap-3 text-center">
      <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
        Brain Atlas
      </h1>
      <p className="text-base-content/60 max-w-2xl text-sm">
        The rest of this subject is models and instruments: how evidence
        accumulates, how a cortex generates a field, how a vessel turns activity
        into a signal. Those all need somewhere to happen. This is the structure
        they happen in — {REGIONS.length} entries, organised by the same outline
        as the source notes.
      </p>
    </header>

    <Link
      href="/neuroscience/brain-atlas/interactive"
      className="card border-primary/30 hover:bg-primary/5 flex flex-col gap-1 border p-5 transition-colors">
      <h2 className="text-primary text-xl font-bold">Depth Explorer</h2>
      <p className="text-base-content/70 text-sm">
        Scrub a cut from the cortical surface down to the brainstem and watch
        which structures it exposes, then read any of them in place.
      </p>
    </Link>

    {ROOTS.map((root) => (
      <section key={root.id} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-primary text-2xl font-bold tracking-tight">
            {root.name}
          </h2>
          <p className="text-base-content/60 text-sm">{root.summary}</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {cards
            .filter((card) => card.root === root.id)
            .map((card) => (
              <Link
                key={card.id}
                href={card.route}
                className="card border-base-content/10 hover:bg-base-200/40 flex flex-col gap-1 border p-4 transition-colors">
                <span className="text-primary text-base font-bold">
                  {card.name}
                </span>
                <span className="text-base-content/60 text-xs">
                  {card.summary}
                </span>
                <span className="text-base-content/40 text-[10px] uppercase">
                  {depthLabel(card.depth)} ·{' '}
                  {card.count === 1
                    ? '1 structure'
                    : `${card.count} structures`}
                </span>
              </Link>
            ))}
        </div>
      </section>
    ))}
  </div>
);

export default BrainAtlasPage;
