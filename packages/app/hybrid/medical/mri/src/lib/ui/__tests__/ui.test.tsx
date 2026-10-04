import { act, render, renderHook, screen } from '@testing-library/react';

import { Badge } from '@/components/atoms/Badge';
import { formatDate, formatTimestamp } from '@/lib/format/dates';
import {
  parseCsvParam,
  parseJsonParam,
  serialiseCsvParam,
  serialiseJsonParam,
  useQueryState,
} from '@/lib/ui/use-query-state';

beforeEach(() => {
  window.history.replaceState(null, '', '/');
});

describe('Badge', () => {
  test('uses the neutral tone when none is given', () => {
    const { container } = render(<Badge>pending</Badge>);
    expect(container.firstElementChild).toHaveClass('badge-neutral');
  });

  test('maps each tone to a class', () => {
    const { container } = render(<Badge tone="error">failed</Badge>);
    expect(container.firstElementChild).toHaveClass('badge-error');
  });

  test('keeps a title for screen readers when one is given', () => {
    render(<Badge title="blocking">failed</Badge>);
    expect(screen.getByTitle('blocking')).toBeInTheDocument();
  });
});

describe('date formatting', () => {
  test('shows a dash for a missing date', () => {
    expect(formatDate(null)).toBe('—');
    expect(formatTimestamp(undefined)).toBe('—');
  });

  test('passes an unparsable date through so the reader sees the raw value', () => {
    expect(formatDate('2026-13-45')).toBe('2026-13-45');
  });

  test('formats a valid date', () => {
    expect(formatDate('2026-10-05T10:00:00Z')).not.toBe('2026-10-05T10:00:00Z');
  });
});

describe('query parameters', () => {
  test('splits and rejoins a CSV list', () => {
    expect(parseCsvParam('a, b ,c')).toEqual(['a', 'b', 'c']);
    expect(parseCsvParam(' , ')).toEqual([]);
    expect(serialiseCsvParam(['a', 'b'])).toBe('a,b');
  });

  test('round-trips a JSON value and survives broken input', () => {
    expect(parseJsonParam<{ runId: string }>('{"runId":"r_1"}')).toEqual({
      runId: 'r_1',
    });
    expect(parseJsonParam('not json')).toBeNull();
    expect(serialiseJsonParam({ runId: 'r_1' })).toBe('{"runId":"r_1"}');
    expect(serialiseJsonParam(null)).toBe('null');
  });
});

describe('useQueryState', () => {
  const state = () =>
    useQueryState(
      'run',
      'none',
      (raw) => raw,
      (value) => value
    );

  test('reads the initial value from the URL', () => {
    window.history.replaceState(null, '', '/runs?run=r_1');
    const { result } = renderHook(state);
    expect(result.current[0]).toBe('r_1');
  });

  test('falls back when the URL carries no value', () => {
    const { result } = renderHook(state);
    expect(result.current[0]).toBe('none');
  });

  test('falls back when the stored value cannot be parsed', () => {
    window.history.replaceState(null, '', '/runs?run=not-json');
    const { result } = renderHook(() =>
      useQueryState(
        'run',
        'none',
        (raw) => {
          const parsed = parseJsonParam<{ runId: string }>(raw);
          if (!parsed) throw new Error('unreadable parameter');
          return parsed.runId;
        },
        serialiseJsonParam
      )
    );
    expect(result.current[0]).toBe('none');
  });

  test('writes a chosen value into the URL', () => {
    const { result } = renderHook(state);
    act(() => result.current[1]('r_2'));
    expect(result.current[0]).toBe('r_2');
    expect(window.location.search).toBe('?run=r_2');
  });

  test('removes the parameter when the value returns to the default', () => {
    window.history.replaceState(null, '', '/runs?run=r_2');
    const { result } = renderHook(state);
    act(() => result.current[1]('none'));
    expect(window.location.search).toBe('');
  });

  test('keeps other parameters when one value changes', () => {
    window.history.replaceState(null, '', '/compare?a=r_1');
    const { result } = renderHook(state);
    act(() => result.current[1]('r_2'));
    expect(window.location.search).toContain('a=r_1');
    expect(window.location.search).toContain('run=r_2');
  });

  test('follows the browser back button', () => {
    const { result } = renderHook(state);
    act(() => result.current[1]('r_2'));
    act(() => {
      window.history.replaceState(null, '', '/runs?run=r_3');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    expect(result.current[0]).toBe('r_3');
  });

  test('stops listening once the screen is gone', () => {
    const { unmount } = renderHook(state);
    unmount();
    expect(() =>
      window.dispatchEvent(new PopStateEvent('popstate'))
    ).not.toThrow();
  });
});
