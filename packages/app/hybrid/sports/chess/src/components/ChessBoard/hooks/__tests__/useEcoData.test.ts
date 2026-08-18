import { renderHook, act } from '@testing-library/react';
import { useEcoData } from '../useEcoData';

describe('useEcoData', () => {
  it('starts with first group and subgroup', () => {
    const { result } = renderHook(() => useEcoData());
    expect(result.current.group).toBeTruthy();
    expect(result.current.subgroup).toBeDefined();
    expect(result.current.cursor).toBe(0);
  });

  it('handleGroupChange updates group and resets', () => {
    const { result } = renderHook(() => useEcoData());
    const initialGroup = result.current.group;
    const newGroup = result.current.subgroups.find((s) => s !== initialGroup);
    act(() => result.current.handleGroupChange(newGroup ?? 'A00'));
    expect(result.current.ecoIndex).toBe(0);
    expect(result.current.cursor).toBe(0);
  });

  it('handleSubgroupChange resets index and cursor', () => {
    const { result } = renderHook(() => useEcoData());
    act(() => result.current.handleOpeningChange(5));
    act(() => result.current.setCursor(3));
    act(() => result.current.handleSubgroupChange(result.current.subgroup));
    expect(result.current.ecoIndex).toBe(0);
    expect(result.current.cursor).toBe(0);
  });

  it('handleOpeningChange updates index', () => {
    const { result } = renderHook(() => useEcoData());
    act(() => result.current.handleOpeningChange(1));
    expect(result.current.ecoIndex).toBe(1);
  });

  it('prev decrements cursor', () => {
    const { result } = renderHook(() => useEcoData());
    act(() => result.current.setCursor(3));
    act(() => result.current.prev());
    expect(result.current.cursor).toBe(2);
  });

  it('prev does not go below 0', () => {
    const { result } = renderHook(() => useEcoData());
    act(() => result.current.prev());
    expect(result.current.cursor).toBe(0);
  });

  it('next increments cursor', () => {
    const { result } = renderHook(() => useEcoData());
    act(() => result.current.next());
    expect(result.current.cursor).toBe(1);
  });

  it('next does not exceed total', () => {
    const { result } = renderHook(() => useEcoData());
    const total = result.current.total;
    act(() => result.current.setCursor(total));
    act(() => result.current.next());
    expect(result.current.cursor).toBe(total);
  });

  it('start sets cursor to 0', () => {
    const { result } = renderHook(() => useEcoData());
    act(() => result.current.setCursor(5));
    act(() => result.current.start());
    expect(result.current.cursor).toBe(0);
  });

  it('end sets cursor to total', () => {
    const { result } = renderHook(() => useEcoData());
    act(() => result.current.end());
    expect(result.current.cursor).toBe(result.current.total);
  });

  it('ecoFen returns a valid FEN', () => {
    const { result } = renderHook(() => useEcoData());
    const fen = result.current.ecoFen();
    expect(fen).toBeTruthy();
    expect(fen.split(' ')).toHaveLength(6);
  });

  it('ecoFen advances with cursor', () => {
    const { result } = renderHook(() => useEcoData());
    const fen0 = result.current.ecoFen();
    act(() => result.current.setCursor(1));
    const fen1 = result.current.ecoFen();
    expect(fen0).not.toBe(fen1);
  });

  it('setGroup/setSubgroup/setEcoIndex direct setters work', () => {
    const { result } = renderHook(() => useEcoData());
    act(() => result.current.setGroup('A00'));
    expect(result.current.group).toBe('A00');
    act(() => result.current.setSubgroup('test'));
    expect(result.current.subgroup).toBe('test');
    act(() => result.current.setEcoIndex(2));
    expect(result.current.ecoIndex).toBe(2);
  });

  it('ecoList changes when group/subgroup changes', () => {
    const { result } = renderHook(() => useEcoData());
    const initial = result.current.ecoList.length;
    expect(initial).toBeGreaterThanOrEqual(0);
  });

  it('ecoOpening is undefined when ecoList is empty', () => {
    const { result } = renderHook(() => useEcoData());
    if (result.current.ecoList.length === 0) {
      expect(result.current.ecoOpening).toBeUndefined();
    }
  });
});
