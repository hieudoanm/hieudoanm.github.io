'use client';

import { pokedex } from '@hieudoanm/data/pokedex';
import { FC, useMemo, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

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
/* Detail sheet (inner modal)                                          */
/* ------------------------------------------------------------------ */

const PokemonDetail: FC<{ p: Pokemon; onClose: () => void }> = ({
  p,
  onClose,
}) => {
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
    <dialog className="modal modal-open" style={{ zIndex: 1001 }}>
      <div className="modal-box w-full max-w-sm">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
          ✕
        </button>

        <div className="mb-3 flex items-center gap-3">
          <img
            src={`https://raw.githubusercontent.com/hieudoanm/hieudoanm/master/packages/data/pokemon/images/${p.name}.png`}
            className="h-16 w-16"
            alt={p.name}
          />
          <div>
            <p className="text-xs opacity-40">#{p.id}</p>
            <h3 className="text-lg font-bold capitalize">
              {p.name.replaceAll('-', ' ')}
            </h3>
            <span className={`badge badge-sm ${getTypeColor(p.type)}`}>
              {p.type}
            </span>
          </div>
        </div>

        {/* Radar */}
        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="stat" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar
                dataKey="value"
                stroke="#60a5fa"
                fill="#60a5fa"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Stat bars */}
        <div className="mt-2 space-y-1.5">
          {radarData.map(({ stat, value }) => (
            <div key={stat} className="flex items-center gap-2 text-xs">
              <span className="w-10 opacity-50">{stat}</span>
              <progress
                className="progress progress-info flex-1"
                value={value}
                max={255}
              />
              <span className="w-8 text-right font-mono font-bold">
                {value}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-1 text-xs">
            <span className="opacity-40">Total</span>
            <span className="font-mono font-bold">{total}</span>
          </div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

export const PokedexModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selected, setSelected] = useState<Pokemon | null>(null);

  const allTypes = useMemo(
    () => Array.from(new Set(data.map((p) => p.type))).sort(),
    []
  );

  const filtered = useMemo(() => {
    let result = data;
    if (search) result = result.filter((p) => fuzzyMatch(p.name, search) > 0);
    if (typeFilter) result = result.filter((p) => p.type === typeFilter);
    return [...result].sort((a, b) => {
      const diff = (a[sortKey] as number) - (b[sortKey] as number);
      return sortOrder === 'asc' ? diff : -diff;
    });
  }, [search, typeFilter, sortKey, sortOrder]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <>
      <dialog className="modal modal-open">
        <div className="modal-box flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden p-0">
          {/* Header */}
          <div className="border-base-300 flex items-center justify-between border-b px-4 py-3">
            <h3 className="font-bold">Pokédex</h3>
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost">
              ✕
            </button>
          </div>

          {/* Toolbar */}
          <div className="border-base-300 flex flex-wrap items-center gap-2 border-b px-4 py-2">
            <input
              className="input input-bordered input-sm w-40"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="select select-bordered select-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All types</option>
              {allTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <div className="flex gap-1">
              {(['id', 'hp', 'attack', 'speed'] as SortKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => toggleSort(key)}
                  className={`btn btn-xs ${sortKey === key ? 'btn-primary' : 'btn-ghost'}`}>
                  {key.toUpperCase()}
                  {sortKey === key && (
                    <span className="ml-0.5">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <span className="ml-auto text-xs opacity-40">
              {filtered.length} Pokémon
            </span>
          </div>

          {/* Grid */}
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="bg-base-200 hover:bg-base-300 flex cursor-pointer flex-col items-center rounded-xl p-2 text-center transition hover:-translate-y-0.5">
                  <img
                    src={`https://raw.githubusercontent.com/hieudoanm/pokedex/master/packages/data/pokemon/images/${p.name}.png`}
                    className="h-12 w-12"
                    alt={p.name}
                    loading="lazy"
                  />
                  <p className="text-[10px] opacity-40">#{p.id}</p>
                  <p className="text-xs leading-tight capitalize">
                    {p.name.replaceAll('-', ' ')}
                  </p>
                  <span
                    className={`badge badge-xs mt-1 ${getTypeColor(p.type)}`}>
                    {p.type}
                  </span>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="py-12 text-center text-xs opacity-30">
                No Pokémon found
              </p>
            )}
          </div>
        </div>

        <div className="modal-backdrop" onClick={onClose} />
      </dialog>

      {selected && (
        <PokemonDetail p={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};
