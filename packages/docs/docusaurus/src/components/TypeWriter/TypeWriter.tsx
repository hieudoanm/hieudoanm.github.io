import React, { useEffect, useState } from 'react';

const words = ['Engineers', 'Everything'];

type State = {
  wordIndex: number;
  charIndex: number;
  isDeleting: boolean;
  text: string;
};

export const TypeWriter: React.FC = () => {
  const [state, setState] = useState<State>({
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
    text: '',
  });

  useEffect(() => {
    const { wordIndex } = state;
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        setState((prev) => {
          if (!prev.isDeleting) {
            const nextChar = prev.charIndex + 1;

            if (nextChar === currentWord.length) {
              setTimeout(
                () => setState((p) => ({ ...p, isDeleting: true })),
                1000
              );
            }

            return {
              ...prev,
              charIndex: nextChar,
              text: currentWord.slice(0, nextChar),
            };
          }

          const nextChar = prev.charIndex - 1;

          if (nextChar === 0) {
            return {
              ...prev,
              charIndex: 0,
              text: '',
              isDeleting: false,
              wordIndex: (prev.wordIndex + 1) % words.length,
            };
          }

          return {
            ...prev,
            charIndex: nextChar,
            text: currentWord.slice(0, nextChar),
          };
        });
      },
      state.isDeleting ? 60 : 100
    );

    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <span className="typewriter">
      {state.text}
      <span className="cursor-block" />
    </span>
  );
};
