import { useCallback, useEffect } from 'react';

interface ShareDeps {
  fen: string;
  pgn: string;
  onLoad: (params: { fen: string | null; pgn: string | null }) => void;
}

export const useShare = ({ fen, pgn, onLoad }: ShareDeps) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    onLoad({ fen: params.get('fen'), pgn: params.get('pgn') });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyShareLink = useCallback(async () => {
    const params = new URLSearchParams();
    if (pgn) params.set('pgn', pgn);
    else params.set('fen', fen);
    const url = `${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt('Copy link', url);
    }
  }, [fen, pgn]);

  return { copyShareLink };
};
