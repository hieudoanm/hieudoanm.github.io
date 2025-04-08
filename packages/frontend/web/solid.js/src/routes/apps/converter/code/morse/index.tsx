import { createSignal } from 'solid-js';
import { copyToClipboard } from '~/utils/navigator';

const morse: Record<string, string> = {
  a: '.-',
  b: '-...',
  c: '-.-.',
  d: '-..',
  e: '.',
  f: '..-.',
  g: '--.',
  h: '....',
  i: '..',
  j: '.---',
  k: '-.-',
  l: '.-..',
  m: '--',
  n: '-.',
  o: '---',
  p: '.--.',
  q: '--.-',
  r: '.-.',
  s: '...',
  t: '-',
  u: '..-',
  v: '...-',
  w: '.--',
  x: '-..-',
  y: '-.--',
  z: '--..',

  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '0': '-----',

  '.': '.-.-.-',
  ',': '--..--',
  ';': '-.-.-.',
  ':': '---...',
  '!': '-.-.--',
  '?': '..--..',
  "'": '.----.',
  '-': '-....-',
  '(': '-.--.',
  ')': '-.--.-',
  '"': '.-..-.',
  '/': '-..-.',
};

const convertTextToMorse = (text: string) => {
  return text
    .split('')
    .map((character: string) => {
      const code = morse[character.toLowerCase()];
      return code ?? character;
    })
    .join('');
};

const MorsePage = () => {
  const [{ text = '', morse = '' }, setState] = createSignal<{
    text: string;
    morse: string;
  }>({
    text: 'morse',
    morse: convertTextToMorse('morse'),
  });

  return (
    <div class="h-screen w-screen">
      <div class="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div class="col-span-1 row-span-1 h-full bg-gray-100 text-gray-900">
          <textarea
            id="text"
            name="text"
            placeholder="Text"
            class="h-full w-full p-8"
            value={text}
            onChange={(event) => {
              const newText = event.target.value;
              const newMorse = convertTextToMorse(newText);
              setState((previous) => ({
                ...previous,
                text: newText,
                morse: newMorse,
              }));
            }}
          />
        </div>
        <div class="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="morse"
            name="morse"
            placeholder="Morse"
            class="h-full w-full p-8"
            value={morse}
            onClick={() => {
              copyToClipboard(morse);
            }}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default MorsePage;
