import { useState } from 'react';

export const WidgetGamesFlipism = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState('Heads or Tails'); // "Heads" or "Tails"

  const flipCoin = () => {
    if (isFlipping) return; // Prevent multiple clicks while flipping

    setIsFlipping(true);

    // Simulate coin flip logic
    const outcomes = ['Heads', 'Tails'];
    const randomResult = outcomes[Math.floor(Math.random() * outcomes.length)];

    // Simulate the flipping duration (2 seconds)
    setTimeout(() => {
      setResult(randomResult); // Set the flip result
      setIsFlipping(false); // Stop flipping
    }, 2000);
  };

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-full bg-neutral-900 text-neutral-100">
      <div className="h-full w-full p-4">
        <button
          className={`flex h-full w-full items-center justify-center rounded-full border-4 border-red-700 bg-red-500 text-xl font-bold transition-transform duration-500 ${
            isFlipping ? 'animate-flip' : ''
          }`}
          onAnimationEnd={() => !isFlipping && setResult('')} // Reset if flipping stops
          disabled={isFlipping}
          onClick={flipCoin}>
          {isFlipping ? 'Spinning' : result}
        </button>
      </div>
    </div>
  );
};
