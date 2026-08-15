'use client';

import { ShirtBadge } from '@/components/atoms/ShirtBadge';
import { groupSlotsByLine, pitchPosition } from '@/lib/formations';
import { Formation, Player } from '@/types/football';
import { DragEvent, FC, RefObject, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

interface PitchProps {
  formation: Formation;
  selectedSlotId: string | null;
  onSelectSlot: (slotId: string) => void;
  getSlotPlayers: (slotId: string) => Player[];
  onSwapSlots?: (fromSlotId: string, toSlotId: string) => void;
  pitchRef?: RefObject<HTMLDivElement | null>;
}

const badgeNumber = (players: Player[], fallback: number): number =>
  players.length > 0 ? players[0].number : fallback;

export const Pitch: FC<PitchProps> = ({
  formation,
  selectedSlotId,
  onSelectSlot,
  getSlotPlayers,
  onSwapSlots,
  pitchRef,
}) => {
  const [dragSlotId, setDragSlotId] = useState<string | null>(null);
  const lines = groupSlotsByLine(formation.slots);
  const selectedSlot =
    formation.slots.find((slot) => slot.id === selectedSlotId) ?? null;
  const selectedPlayers = selectedSlot ? getSlotPlayers(selectedSlot.id) : [];
  const selectedNumber = selectedSlot
    ? badgeNumber(selectedPlayers, selectedSlot.number)
    : 0;

  const handleDragStart = (
    event: DragEvent<HTMLButtonElement>,
    slotId: string
  ): void => {
    setDragSlotId(slotId);
    event.dataTransfer.effectAllowed = 'move';
    try {
      event.dataTransfer.setData('text/plain', slotId);
    } catch {
      // dataTransfer may be unavailable in tests — the state still drives the drop
    }
  };

  const handleDrop = (
    event: DragEvent<HTMLButtonElement>,
    slotId: string
  ): void => {
    event.preventDefault();
    if (dragSlotId === null || dragSlotId === slotId || !onSwapSlots) return;
    onSwapSlots(dragSlotId, slotId);
    setDragSlotId(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-2 md:w-[30rem] md:max-w-none print:w-full print:max-w-none">
      <div
        ref={pitchRef}
        data-testid="pitch"
        className="relative aspect-[3/4] w-full overflow-hidden border border-white/20"
        style={{
          background:
            'linear-gradient(180deg, #14532d 0%, #166534 60%, #15803d 100%)',
        }}>
        <div
          aria-hidden={true}
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent 0 16px, rgba(255,255,255,0.08) 16px 17px)',
          }}
        />
        <div
          aria-hidden={true}
          className="absolute inset-0 border border-white/20"
        />
        <div
          aria-hidden={true}
          className="absolute top-1/2 right-0 left-0 h-px bg-white/20"
        />
        <div
          aria-hidden={true}
          className="absolute top-0 right-10 left-10 h-16 border-x border-b border-white/20 md:right-14 md:left-14 md:h-26"
        />
        <div
          aria-hidden={true}
          className="absolute right-10 bottom-0 left-10 h-16 border-x border-t border-white/20 md:right-14 md:left-14 md:h-26"
        />
        <div
          aria-hidden={true}
          className="absolute top-0 right-28 left-28 h-6 border-x border-b border-white/20 md:right-40 md:left-40 md:h-10"
        />
        <div
          aria-hidden={true}
          className="absolute right-28 bottom-0 left-28 h-6 border-x border-t border-white/20 md:right-40 md:left-40 md:h-10"
        />
        <div
          aria-hidden={true}
          className="absolute top-1/2 left-1/2 aspect-square w-22 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 md:w-34"
        />
        <div
          aria-hidden={true}
          className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 md:size-2"
        />

        {lines.map((line) =>
          line.map((slot) => {
            const { x, y } = pitchPosition(slot, line, lines.length);
            const players = getSlotPlayers(slot.id);
            const selected = selectedSlotId === slot.id;
            return (
              <button
                key={slot.id}
                type="button"
                aria-label={`Position ${slot.label} ${slot.number}`}
                aria-pressed={selected}
                draggable={players.length > 0}
                onDragStart={(event) => handleDragStart(event, slot.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, slot.id)}
                onClick={() => onSelectSlot(slot.id)}
                className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5 rounded-lg p-1 ${
                  selected
                    ? 'ring-base-content ring-2 ring-offset-2'
                    : 'hover:brightness-125'
                } ${dragSlotId === slot.id ? 'opacity-50' : ''}`}
                style={{ left: `${x * 100}%`, top: `${y * 100}%` }}>
                <span className="flex items-center gap-1">
                  <span className="relative">
                    <ShirtBadge
                      number={badgeNumber(players, slot.number)}
                      label={slot.label}
                      size="sm"
                    />
                    {players.length > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                        {players.length}
                      </span>
                    )}
                  </span>
                  <span className="text-base-content/80 text-[10px] font-bold">
                    {slot.label}
                  </span>
                </span>
                {players.length > 0 ? (
                  <span className="text-base-content max-w-20 truncate text-center text-[10px] font-medium">
                    {players
                      .slice(0, 2)
                      .map((player) => player.name)
                      .join(', ')}
                    {players.length > 2 ? ` +${players.length - 2}` : ''}
                  </span>
                ) : (
                  <span className="text-base-content/40 flex items-center gap-0.5 text-[10px]">
                    <FiPlus className="size-2.5" />
                    Empty
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>

      {selectedSlot && (
        <div
          data-testid="pitch-selection"
          className="border-base-300 rounded-box bg-base-200/60 flex items-center gap-3 border p-2 print:hidden">
          <ShirtBadge number={selectedNumber} label={selectedSlot.label} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold">{selectedSlot.label}</span>
              <span className="text-base-content/50 text-[10px]">
                shirt #{selectedNumber}
              </span>
            </div>
            {selectedPlayers.length > 0 ? (
              <p className="text-base-content/80 truncate text-[10px]">
                {selectedPlayers.map((player) => player.name).join(', ')}
              </p>
            ) : (
              <p className="text-base-content/40 text-[10px]">
                No players assigned yet
              </p>
            )}
          </div>
          <span className="badge badge-outline badge-sm">
            {selectedPlayers.length}
          </span>
        </div>
      )}
      {onSwapSlots && (
        <p className="text-base-content/40 text-center text-[10px] print:hidden">
          Tip: drag a player marker onto another position to swap them.
        </p>
      )}
    </div>
  );
};

Pitch.displayName = 'Pitch';
