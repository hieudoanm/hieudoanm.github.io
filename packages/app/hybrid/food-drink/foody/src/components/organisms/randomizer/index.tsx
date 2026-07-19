'use client';

import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { CUISINES, FOOD_OPTIONS, FOODS, TOTAL_FOODS } from '@/data';
import { CuisineSelect } from '@/components/molecules/CuisineSelect';
import { Reel } from '@/components/molecules/Reel';
import { useFoodPicker } from '@/hooks/useFoodPicker';

const isTypingTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
};

interface FoodRandomizerProps {
  initialCountry?: string;
  onCountryChange?: (value: string) => void;
}

export const FoodRandomizer: FC<FoodRandomizerProps> = ({
  initialCountry = 'all',
  onCountryChange,
}) => {
  const initialFood = CUISINES.some(
    (cuisine) => cuisine.value === initialCountry
  )
    ? initialCountry
    : 'all';
  const { food, suggestion, spinning, options, selectFood, spin } =
    useFoodPicker({ foodsMap: FOOD_OPTIONS, initialFood });
  const [spins, setSpins] = useState(0);

  const landedFood = FOODS.find((item) => item.label === suggestion);
  const activeCuisine = landedFood
    ? CUISINES.find((cuisine) => cuisine.value === landedFood.category)
    : CUISINES.find((cuisine) => cuisine.value === food);
  const landed = !spinning && suggestion.length > 0;

  const handleSpin = useCallback(() => {
    spin();
    setSpins((count) => count + 1);
  }, [spin]);

  const handleCountryChange = useCallback(
    (value: string) => {
      selectFood(value);
      onCountryChange?.(value);
    },
    [selectFood, onCountryChange]
  );

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
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-primary font-serif text-3xl font-bold tracking-tight">
          Food Randomizer
        </h1>
        <p className="text-base-content/60 text-sm">
          Can&apos;t decide what to eat? Spin the reel and let fate choose.
        </p>
      </div>
      <Reel
        topics={options}
        spinning={spinning}
        landed={landed}
        current={suggestion}
        itemLabel={landedFood?.label}
        cuisineLabel={
          activeCuisine
            ? `${activeCuisine.emoji} ${activeCuisine.label}`
            : undefined
        }
      />

      <button
        type="button"
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
        value={food}
        onChange={handleCountryChange}
      />
    </div>
  );
};
