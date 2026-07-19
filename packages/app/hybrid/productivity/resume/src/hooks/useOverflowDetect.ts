import { useEffect, useState, type DependencyList } from 'react';

const OVERFLOW_TOLERANCE = 1;

export const useOverflowDetect = (dependencies: DependencyList): boolean => {
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const sheet = document.getElementById('resume-sheet');
    if (!sheet) return;
    const frame = window.requestAnimationFrame(() => {
      setOverflows(
        sheet.scrollHeight > sheet.clientHeight + OVERFLOW_TOLERANCE
      );
    });
    return () => window.cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return overflows;
};
