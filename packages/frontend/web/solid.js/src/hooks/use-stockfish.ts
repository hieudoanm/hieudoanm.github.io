import { createSignal, onMount } from 'solid-js';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

export const useStockfish = () => {
  const [engineOutput, setEngineOutput] = createSignal<{
    cp: string;
    bestMove: string;
  }>({
    cp: '0',
    bestMove: '',
  });
  const [engine, setEngine] = createSignal<Worker | null>(null);

  onMount(() => {
    if (typeof window !== 'undefined') {
      // Load Stockfish from the public folder
      const scriptURL: string =
        NODE_ENV === 'development'
          ? '/workers/stockfish.js'
          : '/chess/workers/stockfish.js';
      const stockfishWorker = new Worker(scriptURL);
      setEngine(stockfishWorker);

      stockfishWorker.onmessage = (event) => {
        const message: string = event.data;
        const messages: string[] = message.split(' ');
        if (messages.indexOf('cp') > -1) {
          const cp: string = messages[messages.indexOf('cp') + 1];
          setEngineOutput((previous) => ({ ...previous, cp }));
        } else if (messages.indexOf('bestmove') > -1) {
          const bestMove: string = messages[messages.indexOf('bestmove') + 1];
          setEngineOutput((previous) => ({ ...previous, bestMove }));
        }
      };

      return () => stockfishWorker.terminate();
    }
  });

  const sendCommand = (command: string) => {
    if (engine()) {
      engine()?.postMessage(command);
    }
  };

  const analysePosition = (fen: string, depth: number) => {
    sendCommand('uci'); // Initialize Stockfish
    sendCommand(`position fen ${fen}`); // Set position
    sendCommand(`go depth ${depth}`); // Analyze at depth
  };

  return { engineOutput, analysePosition };
};
