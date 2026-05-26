import { pokedex } from '@hieudoanm/data/pokedex';
import { createMemo, createSignal } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type Pokemon = {
  id: number;
  name: string;
  type: string;
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
};

type SortKey = 'id' | 'hp' | 'attack' | 'speed';
type SortOrder = 'asc' | 'desc';

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

const TYPE_COLORS: Record<string, string> = {
  fire: 'badge-error',
  water: 'badge-info',
  grass: 'badge-success',
  electric: 'badge-warning',
  rock: 'badge-neutral',
  ground: 'badge-neutral',
  psychic: 'badge-secondary',
  ice: 'badge-info',
  dragon: 'badge-primary',
  dark: 'badge-neutral',
  fairy: 'badge-secondary',
  normal: 'badge-ghost',
  fighting: 'badge-error',
  poison: 'badge-secondary',
  bug: 'badge-success',
  ghost: 'badge-neutral',
  steel: 'badge-ghost',
  flying: 'badge-info',
};

const getTypeColor = (type: string) => TYPE_COLORS[type] ?? 'badge-ghost';

const fuzzyMatch = (text: string, query: string) => {
  if (!query) return 1;
  text = text.toLowerCase();
  query = query.toLowerCase();
  let ti = 0;
  for (let qi = 0; qi < query.length; qi++) {
    let found = false;
    while (ti < text.length) {
      if (text[ti++] === query[qi]) {
        found = true;
        break;
      }
    }
    if (!found) return 0;
  }
  return 1;
};

const data = pokedex as Pokemon[];

/* ------------------------------------------------------------------ */
/* SVG Radar Chart                                                     */
/* ------------------------------------------------------------------ */

const RadarSvg = (props: { data: { stat: string; value: number }[] }) => {
  const n = props.data.length;
  const cx = 120;
  const cy = 120;
  const maxR = 100;
  const point = (i: number, r: number) => {
    const angle = (Math.PI / 180) * (-90 + i * (360 / n));
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };
  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const maxVal = Math.max(...props.data.map((d) => d.value), 1);
  return (
    <svg viewBox="0 0 240 240" class="h-full w-full">
      {gridLevels.map((level) => {
        const pts = Array.from({ length: n }, (_, i) => {
          const { x, y } = point(i, maxR * level);
          return `${x},${y}`;
        }).join(' ');
        return (
          <polygon
            points={pts}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.12}
            strokeWidth={1}
          />
        );
      })}
      {Array.from({ length: n }, (_, i) => {
        const { x, y } = point(i, maxR);
        return (
          <line
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="currentColor"
            strokeOpacity={0.12}
            strokeWidth={1}
          />
        );
      })}
      <polygon
        points={props.data
          .map((d, i) => {
            const { x, y } = point(i, (d.value / maxVal) * maxR);
            return `${x},${y}`;
          })
          .join(' ')}
        fill="#60a5fa"
        fillOpacity={0.4}
        stroke="#60a5fa"
        strokeWidth={2}
      />
      {props.data.map((d, i) => {
        const { x, y } = point(i, maxR + 14);
        return (
          <text
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline={
              y < 110 ? 'auto' : y > 130 ? 'hanging' : 'central'
            }
            fill="currentColor"
            fontSize={10}
            opacity={0.6}>
            {d.stat}
          </text>
        );
      })}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* Detail sheet (inner modal)                                          */
/* ------------------------------------------------------------------ */

const PokemonDetail = ({ p, onClose }: { p: Pokemon; onClose: () => void }) => {
  const radarData = [
    { stat: 'HP', value: p.hp },
    { stat: 'ATK', value: p.attack },
    { stat: 'DEF', value: p.defense },
    { stat: 'SP.A', value: p.special_attack },
    { stat: 'SP.D', value: p.special_defense },
    { stat: 'SPD', value: p.speed },
  ];

  const total =
    p.hp +
    p.attack +
    p.defense +
    p.special_attack +
    p.special_defense +
    p.speed;

  return (
    <dialog class="modal modal-open" style={{ zIndex: 1001 }}>
      <div class="modal-box w-full max-w-sm">
        <button
          onClick={onClose}
          class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
          ✕
        </button>

        <div class="mb-3 flex items-center gap-3">
          <img
            src={`https://raw.githubusercontent.com/hieudoanm/hieudoanm/master/packages/data/pokemon/images/${p.name}.png`}
            class="h-16 w-16"
            alt={p.name}
          />
          <div>
            <p class="text-xs opacity-40">#{p.id}</p>
            <h3 class="text-lg font-bold capitalize">
              {p.name.replaceAll('-', ' ')}
            </h3>
            <span class={`badge badge-sm ${getTypeColor(p.type)}`}>
              {p.type}
            </span>
          </div>
        </div>

        {/* Radar */}
        <div class="h-52 w-full">
          <RadarSvg data={radarData} />
        </div>

        {/* Stat bars */}
        <div class="mt-2 space-y-1.5">
          {radarData.map(({ stat, value }) => (
            <div key={stat} class="flex items-center gap-2 text-xs">
              <span class="w-10 opacity-50">{stat}</span>
              <progress
                class="progress progress-info flex-1"
                value={value}
                max={255}
              />
              <span class="w-8 text-right font-mono font-bold">{value}</span>
            </div>
          ))}
          <div class="flex justify-between pt-1 text-xs">
            <span class="opacity-40">Total</span>
            <span class="font-mono font-bold">{total}</span>
          </div>
        </div>
      </div>
      <div class="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

export const PokedexModal = ({ onClose }: { onClose: () => void }) => {
  const [search, setSearch] = createSignal('');
  const [typeFilter, setTypeFilter] = createSignal('');
  const [sortKey, setSortKey] = createSignal<SortKey>('id');
  const [sortOrder, setSortOrder] = createSignal<SortOrder>('asc');
  const [selected, setSelected] = createSignal<Pokemon | null>(null);

  const allTypes = createMemo(() =>
    Array.from(new Set(data.map((p) => p.type))).sort()
  );

  const filtered = createMemo(() => {
    let result = data;
    if (search())
      result = result.filter((p) => fuzzyMatch(p.name, search()) > 0);
    if (typeFilter()) result = result.filter((p) => p.type === typeFilter());
    return [...result].sort((a, b) => {
      const diff = (a[sortKey()] as number) - (b[sortKey()] as number);
      return sortOrder() === 'asc' ? diff : -diff;
    });
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey() === key) setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <>
      <ModalWrapper
        onClose={onClose}
        title="Pokédex"
        size="max-w-3xl"
        fullHeight>
        {/* Toolbar */}
        <div class="border-base-300 flex flex-wrap items-center gap-2 border-b px-4 py-2">
          <input
            class="input input-bordered input-sm w-40"
            placeholder="Search…"
            value={search()}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            class="select select-bordered select-sm"
            value={typeFilter()}
            onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All types</option>
            {allTypes().map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <div class="flex gap-1">
            {(['id', 'hp', 'attack', 'speed'] as SortKey[]).map((key) => (
              <button
                key={key}
                onClick={() => toggleSort(key)}
                class={`btn btn-xs ${sortKey() === key ? 'btn-primary' : 'btn-ghost'}`}>
                {key.toUpperCase()}
                {sortKey() === key && (
                  <span class="ml-0.5">
                    {sortOrder() === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            ))}
          </div>

          <span class="ml-auto text-xs opacity-40">
            {filtered().length} Pokémon
          </span>
        </div>

        {/* Grid */}
        <div class="min-h-0 flex-1 overflow-y-auto p-4">
          <div class="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {filtered().map((p) => (
              <div
                key={p.id}
                onClick={() => setSelected(p)}
                class="bg-base-200 hover:bg-base-300 flex cursor-pointer flex-col items-center rounded-xl p-2 text-center transition hover:-translate-y-0.5">
                <img
                  src={`https://raw.githubusercontent.com/hieudoanm/pokedex/master/packages/data/pokemon/images/${p.name}.png`}
                  class="h-12 w-12"
                  alt={p.name}
                  loading="lazy"
                />
                <p class="text-[10px] opacity-40">#{p.id}</p>
                <p class="text-xs leading-tight capitalize">
                  {p.name.replaceAll('-', ' ')}
                </p>
                <span class={`badge badge-xs mt-1 ${getTypeColor(p.type)}`}>
                  {p.type}
                </span>
              </div>
            ))}
          </div>

          {filtered().length === 0 && (
            <p class="py-12 text-center text-xs opacity-30">No Pokémon found</p>
          )}
        </div>
      </ModalWrapper>

      {selected() && (
        <PokemonDetail p={selected()} onClose={() => setSelected(null)} />
      )}
    </>
  );
};
