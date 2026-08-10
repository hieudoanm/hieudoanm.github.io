import { act, renderHook } from '@testing-library/react';
import { useEcoData } from '../useEcoData';

describe('useEcoData', () => {
  it('initializes with first group and subgroup', () => {
    const { result } = renderHook(() => useEcoData());
    expect(result.current.group).toBeTruthy();
    expect(result.current.subgroup).toBeTruthy();
    expect(result.current.ecoIndex).toBe(0);
    expect(result.current.cursor).toBe(0);
    expect(result.current.subgroups.length).toBeGreaterThan(0);
    expect(result.current.ecoList.length).toBeGreaterThan(0);
    expect(result.current.total).toBeGreaterThan(0);
  });

  it('changes group and resets subgroup/index/cursor', () => {
    const { result } = renderHook(() => useEcoData());
    const g = result.current.group;
    act(() => result.current.handleOpeningChange(1));
    act(() => result.current.end());
    expect(result.current.cursor).toBe(result.current.total);

    act(() => result.current.handleGroupChange(g));
    expect(result.current.ecoIndex).toBe(0);
    expect(result.current.cursor).toBe(0);
  });

  it('changes subgroup and resets index/cursor', () => {
    const { result } = renderHook(() => useEcoData());
    const s = result.current.subgroup;
    act(() => result.current.next());
    act(() => result.current.handleSubgroupChange(s));
    expect(result.current.ecoIndex).toBe(0);
    expect(result.current.cursor).toBe(0);
  });

  it('moves cursor within bounds', () => {
    const { result } = renderHook(() => useEcoData());
    const total = result.current.total;

    act(() => result.current.start());
    expect(result.current.cursor).toBe(0);
    act(() => result.current.prev());
    expect(result.current.cursor).toBe(0);

    act(() => result.current.next());
    expect(result.current.cursor).toBe(1);

    act(() => result.current.end());
    expect(result.current.cursor).toBe(total);
    act(() => result.current.next());
    expect(result.current.cursor).toBe(total);
  });

  it('builds an eco fen from current cursor', () => {
    const { result } = renderHook(() => useEcoData());
    act(() => result.current.next());
    expect(result.current.ecoFen()).toBeTruthy();
  });
});
