import { useEffect, useRef, useState } from 'react';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

export const useStockfish = () => {
  const workerRef = useRef<Worker | null>(null);
  const sideToMoveRef = useRef<'w' | 'b'>('w');

  const [bestMove, setBestMove] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<number | null>(null);

  useEffect(() => {
    const scriptURL =
      NODE_ENV === 'development'
        ? '/workers/stockfish-18-lite-single.js'
        : '/chess/workers/stockfish-18-lite-single.js';

    workerRef.current = new Worker(scriptURL);
    const worker = workerRef.current;

    worker.onmessage = (e: MessageEvent) => {
      const line: string = e.data;

      if (line.startsWith('bestmove')) {
        const move = line.split(' ')[1] ?? null;
        setBestMove(move);
      }

      if (line.includes('score cp')) {
        const match = line.match(/score cp (-?\d+)/);
        if (match && match[1]) {
          const cp = parseInt(match[1], 10);
          const whiteCP = sideToMoveRef.current === 'b' ? -cp : cp;
          setEvaluation(whiteCP);
        }
      }
    };

    worker.postMessage('uci');
    worker.postMessage('isready');

    return () => {
      worker.terminate();
    };
  }, []);

  const analyze = (fen: string, depth = 15) => {
    if (!workerRef.current) return;

    const fenSideToMove = fen.split(' ')[1] as 'w' | 'b';
    sideToMoveRef.current = fenSideToMove ?? 'w';

    workerRef.current.postMessage('stop');
    workerRef.current.postMessage('ucinewgame');
    workerRef.current.postMessage(`position fen ${fen}`);
    workerRef.current.postMessage(`go depth ${depth}`);
  };

  return { analyze, bestMove, evaluation };
};
