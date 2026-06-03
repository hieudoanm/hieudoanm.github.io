import { createSignal } from 'solid-js';

export const useToggle = (defaultValue?: boolean) => {
  const [value, setValue] = createSignal(!!defaultValue);
  const toggle = () => setValue((x) => !x);

  return { value, toggle, setValue };
};
