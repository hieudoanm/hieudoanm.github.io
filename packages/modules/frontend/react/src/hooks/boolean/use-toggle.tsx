import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export const useToggle = (
  defaultValue?: boolean
): {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
} => {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = useCallback(() => {
    setValue((x) => !x);
  }, []);

  return { value, toggle, setValue };
};
