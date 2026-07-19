import { createSignal, onCleanup, onMount } from 'solid-js';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

export const createStockfish = () => {
  let workerRef: Worker | null = null;
  let sideToMoveRef: 'w' | 'b' = 'w';

  const [bestMove, setBestMove] = createSignal<string | null>(null);
  const [evaluation, setEvaluation] = createSignal<number | null>(null);

  onMount(() => {
    const scriptURL =
      NODE_ENV === 'development'
        ? '/workers/stockfish-18-lite-single.js'
        : '/chess/workers/stockfish-18-lite-single.js';

    workerRef = new Worker(scriptURL);
    const worker = workerRef;

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
          const whiteCP = sideToMoveRef === 'b' ? -cp : cp;
          setEvaluation(whiteCP);
        }
      }
    };

    worker.postMessage('uci');
    worker.postMessage('isready');
  });

  onCleanup(() => {
    workerRef?.terminate();
  });

  const analyze = (fen: string, depth = 15) => {
    if (!workerRef) return;

    const fenSideToMove = fen.split(' ')[1] as 'w' | 'b';
    sideToMoveRef = fenSideToMove ?? 'w';

    workerRef.postMessage('stop');
    workerRef.postMessage('ucinewgame');
    workerRef.postMessage(`position fen ${fen}`);
    workerRef.postMessage(`go depth ${depth}`);
  };

  return { analyze, bestMove, evaluation };
};
