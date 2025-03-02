import {
  CloudEvaluation,
  getCloudEvaluation,
} from '@nothing/clients/lichess.org/lichess.client';
import { Chessboard } from '@nothing/components/Chessboard';
import { useQuery } from '@tanstack/react-query';
import { Chess } from 'chess.js';
import html2canvas from 'html2canvas-pro';
import { NextPage } from 'next';
import { useRef, useState } from 'react';
import { Square } from 'react-chessboard/dist/chessboard/types';

const getEvaluation = ({ mate = 0, pawn = 0 }) => {
  if (mate === 0) return { percentage: 50 - pawn, display: pawn };
  if (mate > 0) return { percentage: 0, display: `M${mate}` };
  return { percentage: 100, display: `M${mate}` };
};

const FenToPngPage: NextPage = () => {
  const boardRef = useRef(null);

  const initial: string =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const [
    { fen = initial, game = new Chess(initial), loading = false },
    setState,
  ] = useState<{
    fen: string;
    game: Chess;
    loading: boolean;
  }>({
    fen: initial,
    game: new Chess(initial),
    loading: false,
  });

  const { error: queryError, data } = useQuery<CloudEvaluation>({
    queryKey: [`get-cloud-evaluation-${fen}`],
    queryFn: async () => {
      const cloudEvaluation = await getCloudEvaluation({ fen });
      console.log('cloudEvaluation', cloudEvaluation);
      return cloudEvaluation;
    },
  });

  console.error('queryError', queryError);

  const pawn: number = (data?.pvs?.at(0)?.cp ?? 0) / 100;
  const mate: number = data?.pvs?.at(0)?.mate ?? 0;
  const error: string = data?.error ?? '';
  console.info('pawn and mate and error', { pawn, mate, error });

  const makeMove = (move: { from: Square; to: Square; promotion: string }) => {
    const result = game.move(move);
    if (move !== null) {
      setState((previous) => ({
        ...previous,
        game,
        fen: game.fen(),
      }));
    }
    return result; // null if the move was illegal, the move object if the move was legal
  };

  const onPieceDrop = (sourceSquare: Square, targetSquare: Square) => {
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    return true;
  };

  return (
    <div className="container mx-auto px-8">
      <div className="mx-auto flex h-full max-w-md flex-col items-center justify-center gap-y-4 py-4 md:gap-y-8 md:py-8">
        <h1 className="text-2xl md:text-4xl">FEN to PNG</h1>
        <div className="w-full rounded bg-gray-900 p-4 text-red-500">
          <input
            id="fen"
            name="fen"
            className="w-full"
            placeholder={initial}
            value={fen}
            onChange={(event) =>
              setState((previous) => ({
                ...previous,
                fen: event.target.value,
              }))
            }
          />
        </div>
        <div className="relative aspect-square w-full">
          <div ref={boardRef} className="h-full w-full overflow-hidden rounded">
            <Chessboard
              id="board"
              position={fen}
              arePiecesDraggable={true}
              onPieceDrop={onPieceDrop}
            />
          </div>
          {!game.isCheckmate() ? (
            <div className="absolute top-0 -right-12 h-full w-8 overflow-hidden rounded border border-gray-900">
              <div
                className={`w-full bg-gray-900 text-center text-[8px] text-gray-100 transition-all ${getEvaluation({ pawn, mate }).percentage === 0 ? 'text-gray-900' : 'text-gray-100'}`}
                style={{
                  height: `${getEvaluation({ pawn, mate }).percentage}%`,
                }}>
                {getEvaluation({ pawn, mate }).display}
              </div>
            </div>
          ) : (
            <div className="absolute top-0 right-0 bottom-0 left-0 flex h-full w-full items-center justify-center">
              <div className="rounded border border-gray-700 bg-gray-900 px-4 py-2 text-gray-100">
                Checkmate
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          className="w-full cursor-pointer rounded bg-gray-900 px-4 py-2 text-red-500"
          disabled={loading}
          onClick={async () => {
            try {
              setState((previous) => ({
                ...previous,
                loading: true,
              }));
              if (boardRef.current) {
                await new Promise((resolve) => requestAnimationFrame(resolve)); // Wait for rendering
                const canvas = await html2canvas(boardRef.current);
                const dataURL = canvas.toDataURL('image/png');
                // Create a download link
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = `${fen}.png`;
                link.click();
                link.remove();
                setState((previous) => ({
                  ...previous,
                  loading: false,
                }));
              }
            } catch (error) {
              console.error(error);
              alert((error as Error).message);
            } finally {
              setState((previous) => ({
                ...previous,
                loading: false,
              }));
            }
          }}>
          {loading ? 'Downloading' : 'Download'}
        </button>
      </div>
    </div>
  );
};

export default FenToPngPage;
