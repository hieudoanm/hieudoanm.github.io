import { EffectCallback, useEffect } from 'react';

export const useEffectOnce = (effectCallback: EffectCallback): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effectCallback, []);
};
