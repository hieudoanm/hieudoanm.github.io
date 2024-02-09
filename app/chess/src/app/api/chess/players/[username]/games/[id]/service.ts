import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import {
  ChessGame,
  ChessOpening,
  ChessPhrase,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import { Chess } from 'chess.js';
import { GameResponse, Move } from './model';
import { logger } from '@chess/common/libs/logger';

export const analyzeGame = async (game: ChessGame) => {
  try {
    const chess = new Chess();
    chess.loadPgn(game.pgn);
    const newChess = new Chess();
    let moves: Move[] = chess.history().map((move: string, index: number) => {
      newChess.move(move);
      const fen: string = newChess.fen();
      const no: number = Math.floor(index / 2) + 1;
      const side: 'white' | 'black' = index % 2 === 0 ? 'white' : 'black';
      const numberOfMajorAndMinorPieces = getNumberOfMajorAndMinorPieces(fen);
      return {
        no,
        side,
        move,
        fen,
        eco: '',
        opening: '',
        phrase: null,
        numberOfMajorAndMinorPieces,
      };
    });
    const fens: string[] = moves.map(({ fen }) => fen);
    const prismaClient: PrismaClient = getPrismaClient();
    const openings: ChessOpening[] = await prismaClient.chessOpening.findMany({
      where: { fen: { in: fens } },
    });
    moves = moves.map((move: Move) => {
      const { fen, numberOfMajorAndMinorPieces } = move;
      const { eco = '', name: opening = '' } = openings.find(
        (opening) => opening.fen === fen
      ) ?? { eco: '', name: '' };
      let phrase: ChessPhrase =
        eco.length > 0 ? ChessPhrase.opening : ChessPhrase.middlegame;
      phrase = numberOfMajorAndMinorPieces <= 6 ? ChessPhrase.endgame : phrase;
      return { ...move, eco, opening, phrase };
    });
    const openingMoves = moves.filter(
      ({ eco, opening }) => eco !== '' && opening !== ''
    );
    const { eco, opening } = openingMoves.at(-1) ?? { eco: '', opening: '' };
    const { phrase: endPhrase } = moves.at(-1) ?? { phrase: '' as ChessPhrase };

    return { eco, opening, endPhrase, moves };
  } catch (error) {
    logger.error(`analyzeGame id=${game.id} error=${error}`);
    return { eco: '', opening: '', endPhrase: null, moves: [] };
  }
};

export const getNumberOfMajorAndMinorPieces = (fen: string): number => {
  const [board] = fen.split(' ');
  const pieces: string = board.replaceAll('/', '').replaceAll(/\d+/g, '');
  const majorAndMinorPieces = pieces.replaceAll(/[KPkp]/g, '');
  return majorAndMinorPieces.length;
};

export const getGame = async (
  username: string,
  id: string
): Promise<GameResponse> => {
  const prismaClient: PrismaClient = getPrismaClient();
  const where: Prisma.ChessGameWhereInput = {
    id,
    OR: [{ whiteUsername: username }, { blackUsername: username }],
  };
  const game: ChessGame = await prismaClient.chessGame.findFirstOrThrow({
    where,
  });
  const { eco, opening, endPhrase, moves } = await analyzeGame(game);
  return { ...game, eco, opening, endPhrase, moves };
};
