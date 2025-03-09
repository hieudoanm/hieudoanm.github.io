import { copyToClipboard } from '@web/utils/navigator';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

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

const MorsePage: NextPage = () => {
  const [{ text = '', morse = '' }, setState] = useState<{
    text: string;
    morse: string;
  }>({
    text: 'morse',
    morse: convertTextToMorse('morse'),
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-2 grid-rows-1 md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1 row-span-1 h-full">
          <textarea
            id="text"
            name="text"
            placeholder="Text"
            className="h-full w-full p-8"
            value={text}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
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
        <div className="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="morse"
            name="morse"
            placeholder="Morse"
            className="h-full w-full p-8"
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
