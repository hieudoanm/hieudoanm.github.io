'use client';

import { ShirtBadge } from '@/components/atoms/ShirtBadge';
import { FormationSlot, Player } from '@/types/football';
import { FC, useState } from 'react';
import { FiArrowUpRight, FiRepeat, FiTrash2, FiUsers } from 'react-icons/fi';

interface PlayerPickerProps {
  slot: FormationSlot;
  assigned: Player[];
  allPlayers: Player[];
  benchPlayers?: Player[];
  slots?: FormationSlot[];
  onToggle: (slotId: string, playerId: string) => void;
  onClear: (slotId: string) => void;
  onSwap?: (fromSlotId: string, toSlotId: string) => void;
  onSubstitute?: (slotId: string, benchPlayerId: string) => void;
}

export const PlayerPicker: FC<PlayerPickerProps> = ({
  slot,
  assigned,
  allPlayers,
  benchPlayers = [],
  slots = [],
  onToggle,
  onClear,
  onSwap,
  onSubstitute,
}) => {
  const [swapTarget, setSwapTarget] = useState('');
  const otherSlots = slots.filter((item) => item.id !== slot.id);
  const target = swapTarget || otherSlots[0]?.id || '';

  const performSwap = (): void => {
    if (!target || !onSwap) return;
    onSwap(slot.id, target);
    setSwapTarget('');
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShirtBadge number={slot.number} label={slot.label} />
          <div>
            <span className="text-sm font-bold">{slot.label}</span>
            <span className="text-base-content/50 ml-2 text-xs">
              shirt #{slot.number}
            </span>
          </div>
        </div>
        <span className="badge badge-outline badge-sm">
          <FiUsers className="size-3" />
          {assigned.length}
        </span>
      </div>

      {assigned.length > 0 && (
        <ul className="flex list-none flex-col gap-1">
          {assigned.map((player) => (
            <li
              key={player.id}
              className="border-base-300 flex items-center gap-2 rounded border p-1">
              <ShirtBadge
                number={player.number}
                label={player.role}
                size="sm"
              />
              <span className="min-w-0 flex-1 truncate text-xs">
                {player.name}
              </span>
              <span className="text-base-content/50 text-[10px] uppercase">
                {player.role}
              </span>
              <button
                type="button"
                aria-label={`Unassign ${player.name}`}
                onClick={() => onToggle(slot.id, player.id)}
                className="btn btn-ghost btn-xs">
                <FiTrash2 className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {assigned.length > 0 ? (
        <button
          type="button"
          onClick={() => onClear(slot.id)}
          className="btn btn-ghost btn-xs self-start">
          Clear position
        </button>
      ) : (
        <p className="text-base-content/40 text-xs">
          No players assigned yet. Pick players below.
        </p>
      )}

      {assigned.length > 0 && onSwap && otherSlots.length > 0 && (
        <div className="flex items-center gap-2">
          <select
            aria-label="Swap with position"
            value={target}
            onChange={(e) => setSwapTarget(e.target.value)}
            className="select select-bordered select-xs min-w-0 flex-1">
            {otherSlots.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label} #{item.number}
              </option>
            ))}
          </select>
          <button
            type="button"
            aria-label="Swap players"
            onClick={performSwap}
            className="btn btn-outline btn-xs">
            <FiRepeat className="size-3" />
            Swap
          </button>
        </div>
      )}

      {onSubstitute && benchPlayers.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-base-content/50 text-xs font-bold uppercase">
            Bench · {benchPlayers.length}
          </span>
          <ul className="flex max-h-40 list-none flex-col gap-1 overflow-y-auto">
            {benchPlayers.map((player) => (
              <li
                key={player.id}
                className="border-base-300 flex items-center gap-2 rounded border p-1">
                <ShirtBadge
                  number={player.number}
                  label={player.role}
                  size="sm"
                />
                <span className="min-w-0 flex-1 truncate text-xs">
                  {player.name}
                </span>
                <button
                  type="button"
                  aria-label={`Bring on ${player.name}`}
                  onClick={() => onSubstitute(slot.id, player.id)}
                  className="btn btn-outline btn-xs">
                  <FiArrowUpRight className="size-3" />
                  Bring on
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {allPlayers.length === 0 ? (
        <p className="text-base-content/40 text-xs">
          No players in the squad yet. Add players to assign them here.
        </p>
      ) : (
        <ul className="flex max-h-64 list-none flex-col gap-1 overflow-y-auto">
          {allPlayers.map((player) => {
            const checked = assigned.some((item) => item.id === player.id);
            return (
              <li key={player.id}>
                <label className="border-base-300 flex cursor-pointer items-center gap-2 rounded border p-1">
                  <input
                    type="checkbox"
                    aria-label={`Assign ${player.name}`}
                    checked={checked}
                    onChange={() => onToggle(slot.id, player.id)}
                    className="checkbox checkbox-sm"
                  />
                  <ShirtBadge
                    number={player.number}
                    label={player.role}
                    size="sm"
                  />
                  <span className="min-w-0 flex-1 truncate text-xs">
                    {player.name}
                  </span>
                  <span className="text-base-content/50 text-[10px] uppercase">
                    {player.role}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

PlayerPicker.displayName = 'PlayerPicker';
