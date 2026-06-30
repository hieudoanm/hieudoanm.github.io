import { FC } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

import { Pokemon } from '../types';
import { getTypeColor } from '../constants';

export const PokemonDetail: FC<{ p: Pokemon; onClose: () => void }> = ({
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
            loading="lazy"
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
PokemonDetail.displayName = 'PokemonDetail';
