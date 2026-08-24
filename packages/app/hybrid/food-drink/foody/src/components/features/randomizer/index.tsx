'use client';

import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { PiQuestion } from 'react-icons/pi';
import { CUISINES, FOOD_OPTIONS, FOODS, TOTAL_FOODS } from './constants';
import { CuisineSelect } from './components/CuisineSelect';
import { HowToModal } from './components/HowToModal';
import { Reel } from './components/Reel';
import { useFoodPicker } from './hooks/useFoodPicker';

const HOW_TO_STEPS = [
  'Pick a cuisine or leave it on All Cuisines.',
  'Hit the spin button or press Space / Enter to roll the reel.',
  'Craving something specific? Search and lock a dish before spinning.',
  'Still stuck after a spin? Trust the reel and go eat!',
];

const isTypingTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
};

export const FoodRandomizer: FC = () => {
  const { food, suggestion, spinning, options, selectFood, spin } =
    useFoodPicker({ foodsMap: FOOD_OPTIONS });
  const [spins, setSpins] = useState(0);
  const [howToOpen, setHowToOpen] = useState(false);

  const activeFood = FOODS.find((item) => item.value === food);
  const activeCuisine = CUISINES.find(
    (cuisine) => cuisine.value === activeFood?.category
  );
  const landed = !spinning && suggestion.length > 0;

  const handleSpin = useCallback(() => {
    spin();
    setSpins((count) => count + 1);
  }, [spin]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      if ((event.code === 'Space' || event.code === 'Enter') && !spinning) {
        event.preventDefault();
        handleSpin();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleSpin, spinning]);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <Reel
        topics={options}
        spinning={spinning}
        landed={landed}
        current={suggestion}
        itemLabel={activeFood?.label}
        cuisineLabel={
          activeCuisine
            ? `${activeCuisine.emoji} ${activeCuisine.label}`
            : undefined
        }
      />

      <button
        onClick={handleSpin}
        disabled={spinning}
        data-testid="spin-button"
        className="btn btn-primary btn-lg rounded-full px-10 text-base font-bold tracking-wide">
        {spinning ? 'Rolling…' : '🍽️ Spin'}
      </button>

      <p data-testid="stats-line" className="text-base-content/50 m-0 text-xs">
        Press Space or Enter to spin · {TOTAL_FOODS} dishes ·{' '}
        <span data-testid="spin-count">{spins}</span> spins
      </p>

      <CuisineSelect
        cuisines={CUISINES}
        foods={FOODS}
        value={food}
        onChange={selectFood}
      />

      <button
        onClick={() => setHowToOpen(true)}
        data-testid="how-to-button"
        className="btn btn-ghost btn-sm text-base-content/60">
        <PiQuestion className="h-4 w-4" /> How to play
      </button>

      <HowToModal
        open={howToOpen}
        onClose={() => setHowToOpen(false)}
        title="How to play"
        steps={HOW_TO_STEPS}
      />
    </div>
  );
};
