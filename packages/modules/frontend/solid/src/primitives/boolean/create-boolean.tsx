import { createSignal } from 'solid-js';
import type { Setter } from 'solid-js';

type UseBooleanReturn = {
  value: boolean;
  setValue: Setter<boolean>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
};

export const createBoolean = (defaultValue = false): UseBooleanReturn => {
  if (typeof defaultValue !== 'boolean') {
    throw new Error('defaultValue must be `true` or `false`');
  }
  const [value, setValue] = createSignal(defaultValue);

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  const toggle = () => {
    setValue((x) => !x);
  };

  return {
    get value() {
      return value();
    },
    setValue,
    setTrue,
    setFalse,
    toggle,
  };
};
