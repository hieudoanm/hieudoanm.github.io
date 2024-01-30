import axios from 'axios';

const PUBLIC_URL: string = 'https://api.chess.com/pub';

export const getTitledPlayers = async (title: string): Promise<string[]> => {
  const url = `${PUBLIC_URL}/titled/${title}`;
  const { data } = await axios.get<{ players: string[] }>(url);
  const { players = [] } = data;
  return players;
};
