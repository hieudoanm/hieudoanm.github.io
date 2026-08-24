'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const MIN_SPIN_MS = 800;
const MAX_SPIN_MS = 1800;

interface UseFoodPickerOptions {
  foodsMap: Record<string, string[]>;
}

export const useFoodPicker = ({ foodsMap }: UseFoodPickerOptions) => {
  const [food, setFood] = useState('all');
  const [suggestion, setSuggestion] = useState('');
  const [spinning, setSpinning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const options = useMemo(() => foodsMap[food] ?? [], [food, foodsMap]);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    },
    []
  );

  const selectFood = useCallback((value: string) => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setFood(value);
    setSuggestion('');
    setSpinning(false);
  }, []);

  const spin = useCallback(() => {
    if (spinning || options.length === 0) return;
    setSpinning(true);
    const duration = MIN_SPIN_MS + Math.random() * (MAX_SPIN_MS - MIN_SPIN_MS);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setSuggestion(options[Math.floor(Math.random() * options.length)]);
      setSpinning(false);
    }, duration);
  }, [options, spinning]);

  return { food, suggestion, spinning, options, selectFood, spin };
};
