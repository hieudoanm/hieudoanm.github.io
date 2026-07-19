import { useEffect, useState } from 'react';
import { ClipItem, clipboard, storage } from './clipboard';

export const useClipboard = () => {
  const [clips, setClips] = useState<ClipItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'history' | 'preview'>('history');
  const [selected, setSelected] = useState<ClipItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadClips = () => {
    const saved = storage.get('clips');
    setClips(saved ?? []);
  };

  const saveClips = (next: ClipItem[]) => {
    setClips(next);
    storage.set('clips', next);
  };

  const addClip = (text: string) => {
    if (!text.trim()) return;
    const next = [
      { id: crypto.randomUUID(), content: text, createdAt: Date.now() },
      ...clips.filter((c) => c.content !== text),
    ].slice(0, 50);
    saveClips(next);
  };

  const capture = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!clipboard.isSupported()) {
        setError('Clipboard API not supported');
        return;
      }
      const text = await clipboard.paste();
      addClip(text);
    } catch {
      setError('Clipboard read blocked (requires user interaction)');
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text: string) => {
    try {
      await clipboard.copy(text);
    } catch {
      setError('Clipboard write failed');
    }
  };

  const remove = (id: string) => {
    const next = clips.filter((c) => c.id !== id);
    saveClips(next);
    if (selected?.id === id) {
      setSelected(null);
      setTab('history');
    }
  };

  const clearAll = () => {
    storage.remove('clips');
    setClips([]);
    setSelected(null);
  };

  useEffect(() => {
    loadClips();
    capture();
  }, []);

  return {
    clips,
    loading,
    tab,
    setTab,
    selected,
    setSelected,
    error,
    capture,
    copy,
    remove,
    clearAll,
  };
};
