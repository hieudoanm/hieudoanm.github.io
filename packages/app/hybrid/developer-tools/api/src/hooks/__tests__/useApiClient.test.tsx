import { act, renderHook } from '@testing-library/react';
import { useApiClient } from '@/hooks/useApiClient';
import { emptyRequest } from '@/lib/http';

describe('useApiClient', () => {
  beforeEach(() => {
    localStorage.clear();
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      statusText: 'OK',
      url: 'https://api.example.com/users',
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => '{"ok":true}',
    });
  });

  it('moves to the previous tab when closing the active tab', () => {
    const { result } = renderHook(() => useApiClient());
    const firstId = result.current.activeId;

    act(() => result.current.onAddTab());
    expect(result.current.activeId).not.toBe(firstId);

    act(() => result.current.onCloseTab(result.current.activeId));
    expect(result.current.activeId).toBe(firstId);
  });

  it('keeps the only tab when closing it', () => {
    const { result } = renderHook(() => useApiClient());
    const onlyId = result.current.activeId;
    act(() => result.current.onCloseTab(onlyId));
    expect(result.current.tabs).toHaveLength(1);
    expect(result.current.activeId).toBe(onlyId);
  });

  it('ignores keydown events without a modifier', () => {
    const { result } = renderHook(() => useApiClient());
    const url = result.current.request.url;
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'l' }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });
    expect(result.current.request.url).toBe(url);
  });

  it('stores cookies received from a Set-Cookie header', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      statusText: 'OK',
      url: 'https://api.example.com/users',
      headers: new Headers({ 'set-cookie': 'sid=abc; Path=/' }),
      text: async () => '{"ok":true}',
    });
    const { result } = renderHook(() => useApiClient());

    act(() => {
      result.current.onRequestChange({
        ...emptyRequest(),
        url: 'https://api.example.com/users',
      });
    });
    await act(async () => {
      await result.current.onSend();
    });

    const saved = JSON.parse(
      localStorage.getItem('api-client:cookies') ?? '[]'
    );
    expect(saved.some((c: { name: string }) => c.name === 'sid')).toBe(true);
  });

  it('updates cookies, protocol and files via callbacks', () => {
    const { result } = renderHook(() => useApiClient());

    act(() => result.current.onCookieChange([]));
    expect(result.current.cookies).toEqual([]);

    act(() => result.current.onProtocolChange('websocket'));
    expect(result.current.protocol).toBe('websocket');
    expect(result.current.response).toBeNull();

    act(() => result.current.onProtocolChange('http'));
    expect(result.current.protocol).toBe('http');

    const file = new File(['abc'], 'data.txt', { type: 'text/plain' });
    act(() => result.current.onFilesChange({ '1': file }));
    expect(result.current.files['1']).toBe(file);
  });
});
