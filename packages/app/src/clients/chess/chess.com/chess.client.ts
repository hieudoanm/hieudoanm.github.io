export const getPlayers = async (title: string): Promise<string[]> => {
  const url = `https://api.chess.com/pub/titled/${title}`;
  const response = await fetch(url);
  const data: { players: string[] } = await response.json();
  const { players = [] } = data;
  return players;
};

export const getPlayer = async (player: string) => {
  const playerUrl = `https://api.chess.com/pub/player/${player}`;
  const playerResponse = await fetch(playerUrl);
  const playerData = await playerResponse.json();
  return playerData;
};

export const getStats = async (player: string) => {
  const statsUrl = `https://api.chess.com/pub/player/${player}/stats`;
  const statsResponse = await fetch(statsUrl);
  const statsData = await statsResponse.json();
  return statsData;
};
