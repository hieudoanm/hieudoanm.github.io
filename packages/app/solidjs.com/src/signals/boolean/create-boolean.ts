import { createSignal } from 'solid-js';

type Setter<T> = (v: T | ((prev: T) => T)) => void;

type UseBooleanReturn = {
  value: boolean;
  setValue: Setter<boolean>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
};

export const useBoolean = (defaultValue = false): UseBooleanReturn => {
  if (typeof defaultValue !== 'boolean') {
    throw new Error('defaultValue must be `true` or `false`');
  }

  const [value, setValue] = createSignal(defaultValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((x) => !x);

  return { value, setValue, setTrue, setFalse, toggle };
};
