import { act, renderHook, waitFor } from '@testing-library/react';
import { useProgress } from '../useProgress';
import { awardXp, getProgress } from '@/lib/progress';

describe('useProgress', () => {
  it('starts with empty defaults before storage resolves', () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.progress.xp).toBe(0);
  });

  it('loads stored progress on mount', async () => {
    const seeded = await awardXp(15);
    const { result } = renderHook(() => useProgress());

    await waitFor(() => {
      expect(result.current.progress.xp).toBe(seeded.xp);
    });
  });

  it('awards xp and refreshes state', async () => {
    const before = await getProgress();
    const { result } = renderHook(() => useProgress());

    await act(async () => {
      result.current.awardXp(25);
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(result.current.progress.xp).toBe(before.xp + 25);
    });
  });
});
