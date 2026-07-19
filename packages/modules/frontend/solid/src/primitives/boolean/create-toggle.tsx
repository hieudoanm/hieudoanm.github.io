import { createSignal } from 'solid-js';
import type { Setter } from 'solid-js';

export const createToggle = (
  defaultValue?: boolean
): {
  value: boolean;
  setValue: Setter<boolean>;
  toggle: () => void;
} => {
  const [value, setValue] = createSignal(!!defaultValue);

  const toggle = () => {
    setValue((x) => !x);
  };

  return {
    get value() {
      return value();
    },
    toggle,
    setValue,
  };
};
