const withTimeout = (promise: Promise<Response>, ms = 15000): Promise<Response> => {
  const timeout = new Promise<never>((_, reject) => {
    window.setTimeout(() => reject(new Error('Request timed out')), ms);
  });
  return Promise.race([promise, timeout]);
};

export const fetchLichessPgn = async (username: string, max = 20): Promise<string> => {
  const url = `https://lichess.org/api/games/${encodeURIComponent(username)}?max=${max}&as_pgn=1`;
  const response = await withTimeout(fetch(url));
  if (!response.ok) throw new Error(`Lichess returned ${response.status}`);
  return response.text();
};

export const fetchChessComPgn = async (username: string, max = 20): Promise<string> => {
  const archivesUrl = `https://api.chess.com/pub/player/${encodeURIComponent(
    username
  )}/games/archives`;
  const archivesResponse = await withTimeout(fetch(archivesUrl));
  if (!archivesResponse.ok) throw new Error(`Chess.com returned ${archivesResponse.status}`);
  const archives = (await archivesResponse.json()) as { archives?: string[] };
  const months = (archives.archives ?? []).slice(-4);

  const games: string[] = [];
  for (const month of months) {
    if (games.length >= max) break;
    const monthResponse = await withTimeout(fetch(month));
    if (!monthResponse.ok) continue;
    const payload = (await monthResponse.json()) as { games?: { pgn?: string }[] };
    for (const entry of payload.games ?? []) {
      if (!entry.pgn) continue;
      games.push(entry.pgn);
      if (games.length >= max) break;
    }
  }
  if (!games.length) throw new Error('No games found for this player');
  return games.join('\n\n');
};
