/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chess } from 'chess.js';
import GIF from 'gif.js';
import html2canvas from 'html2canvas-pro';
import { createSignal } from 'solid-js';
import { Chessboard } from '~/components/Chessboard';
import { getMovesFromPGN } from '~/utils/chess';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

const initial = `[Event "Norway Chess 2017"]
[Site "Stavanger"]
[Date "2017.06.08"]
[Round "3.1"]
[White "Carlsen, Magnus"]
[Black "Nakamura, Hikaru"]
[Result "1/2-1/2"]
[ECO "B90"]
[WhiteElo "2832"]
[BlackElo "2785"]
[PlyCount "80"]
[EventDate "2017.??.??"]
[Whiteclock "0:50:59"]
[Blackclock "0:09:35"]
[Link "https://www.chess.com/news/view/norway-carlsen-nakamura-clash-ends-in-draw-1116"]

1. e4 c5 2. Nf3 ({Last year in Bilbao Carlsen used the move order} 2. Ne2 d6 3.
Nbc3 a6 4. g3 g6 5. Bg2 Bg7 6. d4 cxd4 7. Nxd4 {and eventually Nakaura would win
his first ever classical game against him.}) 2... d6 3. d4 cxd4 4. Nxd4 Nf6 5.
Nc3 a6 6. h3 g6 7. g3 {Nakamura expected this.} 7... Nc6 8. Be3 Bg7 9. Bg2 O-O
10. O-O Nd7 11. b3 {Carlsen said he was "ashamed" of this move as he "didn't
grasp Hikaru's idea at all."} 11... Nxd4 12. Bxd4 Bxd4 13. Qxd4 b6 14. Nd5 Bb7
15. c4 e5 16. Qe3 (16. Qd2) 16... b5 ({Also possible was} 16... Bxd5 17. cxd5 a5
18. Rac1 Nc5 19. a3 a4 20. b4 Nb3 21. Rc6 Nd4 22. Rfc1 {and now} 22... b5 {is
safer than taking the exchange.}) 17. Rac1 bxc4 18. Rxc4 Bxd5 19. exd5 a5 20.
Rfc1 Nc5 {is the same.} 21. a3 f5 {"What he did was insanely risky."
(Carlsen)} ({The world champ expected} 21... a4) 22. b4 axb4 23. axb4 Nd7 (23...
f4 {doesn't work because of} 24. gxf4 exf4 25. Qf3) 24. Rc6 {"Perhaps not such
a good practical choice," said Carlsen.} ({He regretted that he didn't play}
24. b5 {with the idea} 24... Nc5 25. Rxc5 dxc5 26. Qxe5 Re8 27. Qf4) 24... f4
25. gxf4 exf4 26. Qe6+ Rf7 27. Qxd6 ({Carlsen "didn't see anything better" but
Nakamura was a bit concerned about} 27. Rc7 {and rightly so. The engine says}
27... Ra1 $1 {is the only move for an equal position} ({although} 27... f3 28.
Bxf3 Qg5+ 29. Bg2 Qf4 {doesn't look bad either.})) 27... Qg5 28. Kh1 $6 {Carlsen
said he started to miss things here.} ({A slightly better try was} 28. Rc8+ Rxc8
29. Rxc8+ Kg7 {and only then} 30. Kh1 (30. h4 Qg4 $1 (30... Qxh4 31. Rc7))) 28...
f3 29. Bf1 Nf6 {Here Nakamura started to get "really optimistic."} 30. Qe6 Kg7
{Carlsen "completely missed" this move.} ({He was fixated at} 30... Re8 31.
Rc8 Kg7 32. Rxe8 Qxc1 33. Qe1 Qxe1 34. Rxe1) 31. Rc7 $6 ({Here a better try was}
31. d6 Re8 32. Qb3 {and now Black's best try is probably} (32. Qc4 Re4 33. Qc2
Rg4 $1 34. Rc5 $1 Rg1+ 35. Kh2 Rg2+ 36. Kh1 {is a draw}) 32... Re2 {with a mess.})
31... Rxc7 32. Rxc7+ Kh6 33. Qe1 Ra2 34. Re7 Ng4 {Forcing the draw.} ({After the
game Carlsen asked Nakamura why he didn't play} 34... Nxd5 {but the American
player didn't see much of an advantage after} 35. Re5 Qd2 36. Qxd2+ Rxd2 37. b5)
35. hxg4 Qh4+ 36. Kg1 Qxg4+ 37. Kh1 Qh4+ 38. Kg1 Qg4+ 39. Kh1 Qh4+ 40. Kg1 Qg4+
1/2-1/2`;

const downloadGIF = (dataURLs: string[]): void => {
  const gif = new GIF({
    workers: 1,
    quality: 10,
    workerScript:
      NODE_ENV === 'development'
        ? '/workers/gif.worker.js'
        : '/nothing/workers/gif.worker.js',
  });

  let loadedImages = 0;
  dataURLs.forEach((dataUrl) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      gif.addFrame(img, { delay: 500 }); // 500ms delay per frame
      loadedImages++;

      if (loadedImages === dataURLs.length) {
        gif.render();
      }
    };
  });

  gif.on('finished', (blob: any) => {
    const gifURL: string = URL.createObjectURL(blob);
    // Create a download link
    const link = document.createElement('a');
    link.href = gifURL;
    link.download = 'pgn.gif';
    link.click();
    link.remove();
  });
};

const PgnToGifPage = () => {
  const [signal, setSignal] = createSignal<{
    pgn: string;
    loading: boolean;
  }>({
    pgn: initial,
    loading: false,
  });
  const [game, setGame] = createSignal(new Chess());
  let boardRef: HTMLDivElement | undefined;

  return (
    <div class="min-h-screen bg-gray-100 text-gray-900">
      <div class="container mx-auto px-8">
        <div class="mx-auto flex h-full max-w-md flex-col items-center justify-center gap-y-4 py-4 md:gap-y-8 md:py-8">
          <h1 class="text-2xl md:text-4xl">PGN to GIF</h1>
          <div class="w-full rounded bg-gray-900 p-4 text-red-500">
            <textarea
              id="pgn"
              name="pgn"
              class="w-full"
              rows={4}
              placeholder={initial}
              value={signal().pgn}
              onChange={(event) =>
                setSignal((previous) => ({
                  ...previous,
                  pgn: event.target.value,
                }))
              }
            />
          </div>
          <div
            ref={(el) => (boardRef = el)}
            class="aspect-square w-full overflow-hidden rounded">
            <Chessboard id="board" position={game().fen()} />
          </div>
          <button
            type="button"
            class="w-full cursor-pointer rounded bg-gray-900 px-4 py-2 text-red-500"
            onClick={async () => {
              const moves = getMovesFromPGN(signal().pgn);
              const resetGame = new Chess();
              setGame(resetGame);

              const dataURLs: string[] = [];
              for (const move of moves) {
                setGame((previous) => {
                  console.log(previous.fen());
                  const newGame = new Chess(previous.fen());
                  newGame.move(move);

                  return new Chess(newGame.fen());
                });
                if (boardRef) {
                  const canvas = await html2canvas(boardRef);
                  const dataURL = canvas.toDataURL('image/png');
                  dataURLs.push(dataURL);
                }
              }

              downloadGIF(dataURLs);
            }}>
            {signal().loading ? 'Downloading' : 'Download'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PgnToGifPage;
