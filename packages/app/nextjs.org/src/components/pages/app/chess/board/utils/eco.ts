import type { GameState } from '@chess/ts';
import { createGame, fromPgn, fromSan, getHeaders, makeMove } from '@chess/ts';
import { openings } from '@hieudoanm.github.io/data/chess/openings';
import type { Opening } from '@hieudoanm.github.io/data/chess/openings';
import GIF from 'gif.js';

export const ecoGroups: string[] = [
  ...new Set(openings.map(({ group }) => group)),
].sort();

export const ecoSubgroups = (group: string): string[] =>
  [
    ...new Set(
      openings.filter((o) => o.group === group).map((o) => o.subgroup ?? '')
    ),
  ].sort();

export const ecoOpenings = (group: string, subgroup: string): Opening[] =>
  openings.filter((o) => o.group === group && (o.subgroup ?? '') === subgroup);

export const replayPGN = (pgn: string): GameState | null => {
  const games = fromPgn(pgn);
  const game = games[0];
  if (!game) return null;

  let state = createGame();
  for (const sanMove of game.moves) {
    const move = fromSan(
      sanMove.san,
      state.board,
      state.turn,
      state.castlingRights,
      state.enPassant
    );
    if (!move) return null;
    state = makeMove(state, move);
  }
  return state;
};

export const downloadGIF = ({
  base64s,
  pgn,
}: {
  base64s: string[];
  pgn: string;
}): Promise<void> =>
  new Promise((resolve) => {
    const gif = new GIF({
      workers: 1,
      quality: 10,
      workerScript: '/workers/gif.worker.js',
    });
    let loaded = 0;

    base64s.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        gif.addFrame(img, { delay: 500 });
        if (++loaded === base64s.length) gif.render();
      };
    });

    gif.on('finished', (blob: Blob) => {
      const headers = getHeaders(pgn);
      const name =
        `${headers['White'] ?? ''} vs ${headers['Black'] ?? ''}`.trim() ||
        'chess';
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${name}.gif`;
      link.click();
      link.remove();
      resolve();
    });

    gif.on('abort', () => resolve());
  });
