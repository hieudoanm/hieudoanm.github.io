import { HIKARU_CHESS_USERNAME } from '@chess/common/constants/chess.constants';
import { NextRequest, NextResponse } from 'next/server';
import { GameResponse } from './model';
import { getGame } from './service';

type GamesParameters = { params: { username: string; id: string } };

export const GET = async (
  _request: NextRequest,
  { params }: GamesParameters
): Promise<NextResponse<GameResponse>> => {
  const username: string = params?.username ?? '';
  const id: string = params?.id ?? '';

  const game: GameResponse = await getGame(username, id);
  return NextResponse.json<GameResponse>(game, { status: 200 });
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const generateStaticParams = () => {
  return [
    {
      username: HIKARU_CHESS_USERNAME,
      id: '2f9fd93a-9e93-11ee-8c7e-6cfe544c0428',
    },
  ];
};
