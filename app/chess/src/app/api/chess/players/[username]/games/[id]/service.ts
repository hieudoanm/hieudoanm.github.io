import { Game } from '@chess/common/clients/chess.com/chess.dto';
import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import {
  ChessCastling,
  ChessPieceType,
  ChessSide,
} from '@chess/common/types/chess';
import {
  ChessGame,
  ChessOpening,
  ChessPhrase,
  ChessVariant,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import { Chess } from 'chess.js';
import { GameResponse, Move } from './model';

const getPieceFromMove = (
  move: string
): { piece: ChessPieceType; castling: ChessCastling } => {
  if (move === 'O-O') return { piece: 'king', castling: 'short' };
  if (move === 'O-O-O') return { piece: 'king', castling: 'long' };
  const pieceSymbol = move.at(0);
  if (pieceSymbol === 'K') return { piece: 'king', castling: '' };
  if (pieceSymbol === 'Q') return { piece: 'queen', castling: '' };
  if (pieceSymbol === 'R') return { piece: 'rook', castling: '' };
  if (pieceSymbol === 'B') return { piece: 'bishop', castling: '' };
  if (pieceSymbol === 'N') return { piece: 'knight', castling: '' };
  return { piece: 'pawn', castling: '' };
};

const getPiecesFromMoves = (moves: Move[]) => {
  const pieces: Record<ChessSide, Record<ChessPieceType, number>> = {
    white: { king: 0, queen: 0, rook: 0, bishop: 0, knight: 0, pawn: 0 },
    black: { king: 0, queen: 0, rook: 0, bishop: 0, knight: 0, pawn: 0 },
  };
  const castling: Record<ChessSide, ChessCastling> = { white: '', black: '' };
  for (const move of moves) {
    const { piece, side, castling: sideCastling } = move;
    pieces[side][piece] += 1;
    if (sideCastling !== '') {
      castling[side] = sideCastling;
    }
  }
  return { pieces, castling };
};

export const analyzeGame = async (game: Game | ChessGame) => {
  try {
    // const initial = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const { pgn } = game;
    const initialSetup =
      (game as any).initialSetup ?? (game as any).initial_setup ?? '';
    if (game.rules !== ChessVariant.chess) {
      return {
        eco: '',
        opening: '',
        endPhrase: null,
        castling: { white: '' as ChessCastling, black: '' as ChessCastling },
        pieces: {
          white: { king: 0, queen: 0, rook: 0, bishop: 0, knight: 0, pawn: 0 },
          black: { king: 0, queen: 0, rook: 0, bishop: 0, knight: 0, pawn: 0 },
        },
        moves: [],
      };
    }
    const chess: Chess = new Chess();
    chess.loadPgn(pgn);
    const newChess: Chess = new Chess(initialSetup);
    let moves: Move[] = chess.history().map((move: string, index: number) => {
      newChess.move(move);
      const fen: string = newChess.fen();
      const no: number = Math.floor(index / 2) + 1;
      const side: ChessSide = index % 2 === 0 ? 'white' : 'black';
      const numberOfMajorAndMinorPieces = getNumberOfMajorAndMinorPieces(fen);
      const { piece, castling } = getPieceFromMove(move);
      return {
        no,
        side,
        move,
        fen,
        eco: '',
        opening: '',
        piece,
        castling,
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

    const { castling, pieces } = getPiecesFromMoves(moves);

    return { eco, opening, endPhrase, castling, pieces, moves };
  } catch (error) {
    const url = game.url;
    logger.error(`analyzeGame url=${url} error=${error}`);
    return {
      eco: '',
      opening: '',
      endPhrase: null,
      castling: { white: '' as ChessCastling, black: '' as ChessCastling },
      pieces: {
        white: { king: 0, queen: 0, rook: 0, bishop: 0, knight: 0, pawn: 0 },
        black: { king: 0, queen: 0, rook: 0, bishop: 0, knight: 0, pawn: 0 },
      },
      moves: [],
    };
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
  const { eco, opening, endPhrase, castling, pieces, moves } =
    await analyzeGame(game);
  return { ...game, eco, opening, endPhrase, castling, pieces, moves };
};
