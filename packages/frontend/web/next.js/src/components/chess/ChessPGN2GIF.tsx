/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHeaders, getMoves } from '@web/utils/chess';
import { Chess } from 'chess.js';
import GIF from 'gif.js';
import html2canvas from 'html2canvas-pro';
import { FC, useRef, useState } from 'react';
import { Chessboard } from './Chessboard';
import { FaDownload, FaSpinner } from 'react-icons/fa6';
import { INITIAL_PGN } from '@web/constants';

const downloadGIF = ({
  base64s,
  pgn,
}: {
  base64s: string[];
  pgn: string;
}): Promise<void> => {
  return new Promise((resolve) => {
    const gif = new GIF({
      workers: 1,
      quality: 10,
      workerScript: '/workers/gif.worker.js',
    });

    let loadedImages = 0;
    base64s.forEach((base64: string) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        gif.addFrame(img, { delay: 500 }); // 500ms delay per frame
        loadedImages++;

        if (loadedImages === base64s.length) {
          gif.render();
        }
      };
    });

    gif.on('start', () => {
      console.info('start');
    });

    gif.on('progress', (percentage) => {
      console.info('progressing', percentage);
    });

    gif.on('finished', (blob: any) => {
      const gifURL: string = URL.createObjectURL(blob);
      // Create a download link
      const link = document.createElement('a');
      link.href = gifURL;
      const headers = getHeaders(pgn);
      const name: string =
        `${headers['White'] ?? ''} vs ${headers['Black'] ?? ''}`.trim();
      link.download = `${name}.gif`;
      link.click();
      link.remove();
      resolve();
    });

    gif.on('abort', () => {
      resolve();
    });
  });
};

export const ChessPGN2GIF: FC<{ pgn: string }> = ({ pgn = INITIAL_PGN }) => {
  const boardRef = useRef(null);

  const [{ game = new Chess(), loading = false }, setState] = useState<{
    game: Chess;
    loading: boolean;
  }>({
    game: new Chess(),
    loading: false,
  });

  return (
    <div className="relative aspect-square w-full max-w-sm">
      {!loading ? (
        <div className="absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center px-4">
          <button
            type="button"
            disabled={loading}
            className="cursor-pointer rounded-full bg-red-500 p-4 text-center text-gray-100"
            onClick={async () => {
              // Start Loading
              setState((previous) => ({ ...previous, loading: true }));
              const moves = getMoves(pgn);
              const newGame = new Chess();
              setState((previous) => ({ ...previous, game: newGame }));

              const base64s: string[] = [];
              for (const move of moves) {
                setState((previous) => {
                  console.log(previous.game.fen());
                  const newGame = new Chess(previous.game.fen());
                  newGame.move(move);

                  return { ...previous, game: new Chess(newGame.fen()) };
                });

                if (boardRef.current) {
                  const canvas = await html2canvas(boardRef.current);
                  const base64 = canvas.toDataURL('image/png');
                  base64s.push(base64);
                }
              }

              await downloadGIF({ base64s, pgn });
              setState((previous) => ({ ...previous, loading: false }));
            }}>
            {loading ? (
              <FaSpinner className="mx-auto animate-spin" />
            ) : (
              <FaDownload className="mx-auto" />
            )}
          </button>
        </div>
      ) : (
        <div className="absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center px-4">
          <FaSpinner className="animate-spin" />
        </div>
      )}
      <div
        ref={boardRef}
        className="aspect-square w-full overflow-hidden rounded border border-gray-800">
        <Chessboard id="board" position={game.fen()} />
      </div>
    </div>
  );
};
