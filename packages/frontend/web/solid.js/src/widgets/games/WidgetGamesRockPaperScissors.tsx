import { FaSolidHand, FaSolidHandFist, FaSolidHandPeace } from 'solid-icons/fa';
import { createEffect, createSignal } from 'solid-js';

export const WidgetGamesRockPaperScissors = () => {
  const [seconds, setSeconds] = createSignal(0);
  const [index, setIndex] = createSignal(0);

  createEffect(() => {
    if (seconds() <= 0) {
      const randomIndex: number = Math.floor(Math.random() * 2);
      setIndex(randomIndex);
      return; // Stop when countdown reaches 0
    }

    const timer = setInterval(() => {
      setSeconds((previous) => previous - 1); // Decrement the countdown
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on unmount or re-run
  });

  const rockPaperScissors = [
    <FaSolidHandFist title="rock" class="text-9xl" />,
    <FaSolidHand title="paper" class="text-9xl" />,
    <FaSolidHandPeace title="scissors" class="text-9xl" />,
  ];

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-full bg-gray-900 text-gray-100">
      <button
        type="button"
        class="flex h-full w-full items-center justify-center text-9xl text-red-500"
        disabled={seconds() !== 0}
        onClick={() => {
          setSeconds(2);
        }}>
        {seconds() === 0 ? rockPaperScissors[index()] : seconds()}
      </button>
    </div>
  );
};
