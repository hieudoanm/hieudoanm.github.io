import { Chessboard } from '@nothing/components/Chessboard';
import html2canvas from 'html2canvas-pro';
import { NextPage } from 'next';
import { useRef, useState } from 'react';

const FenToPngPage: NextPage = () => {
  const initial: string =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const [{ fen = initial, loading = false }, setState] = useState<{
    fen: string;
    loading: boolean;
  }>({
    fen: initial,
    loading: false,
  });
  const boardRef = useRef(null);

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
        <div
          ref={boardRef}
          className="aspect-square w-full overflow-hidden rounded">
          <Chessboard id="board" position={fen} arePiecesDraggable={false} />
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
