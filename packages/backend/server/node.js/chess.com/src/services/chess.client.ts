const PROXY_URL = 'https://hieudoanm-reverse-proxy.vercel.app';

const proxy = (url: string) => `${PROXY_URL}/api?url=${url}`;

export const getPlayers = async (title: string): Promise<string[]> => {
  const url = `https://api.chess.com/pub/titled/${title}`;
  const response = await fetch(proxy(url));
  const data: { players: string[] } = await response.json();
  const { players = [] } = data;
  return players;
};

export const getPlayer = async (player: string) => {
  const playerUrl = `https://api.chess.com/pub/player/${player}`;
  const playerResponse = await fetch(proxy(playerUrl));
  const playerData = await playerResponse.json();
  return playerData;
};

export const getStats = async (player: string) => {
  const statsUrl = `https://api.chess.com/pub/player/${player}/stats`;
  const statsResponse = await fetch(proxy(statsUrl));
  const statsData = await statsResponse.json();
  return statsData;
};
