import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { getAccuracy } from './accuracy/service';
import { getGames } from './games/service';
import { InsightsDto } from './model';
import { getOpponents } from './opponents/service';
import { getResults } from './results/service';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export const getInsights = async (username: string): Promise<InsightsDto> => {
  const accuracy = await getAccuracy(username);
  const games = await getGames(username);
  const opponents = await getOpponents(username);
  const results = await getResults(username);
  await getPrismaClient().$disconnect();
  return { username, accuracy, games, opponents, results };
};
