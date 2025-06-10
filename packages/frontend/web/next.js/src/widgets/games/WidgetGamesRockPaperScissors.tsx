import { useEffect, useState } from 'react';
import { FaHand, FaHandFist, FaHandPeace } from 'react-icons/fa6';

export const WidgetGamesRockPaperScissors = () => {
  const [seconds, setSeconds] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (seconds <= 0) {
      const randomIndex: number = Math.floor(Math.random() * 2);
      setIndex(randomIndex);
      return; // Stop when countdown reaches 0
    }

    const timer = setInterval(() => {
      setSeconds((previous) => previous - 1); // Decrement the countdown
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on unmount or re-run
  }, [seconds]);

  const rockPaperScissors = [
    <FaHandFist key="rock" className="text-9xl" />,
    <FaHand key="paper" className="text-9xl" />,
    <FaHandPeace key="scissors" className="text-9xl" />,
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-full bg-neutral-900 text-neutral-100">
      <button
        type="button"
        className="flex h-full w-full items-center justify-center text-9xl text-red-500"
        disabled={seconds !== 0}
        onClick={() => {
          setSeconds(2);
        }}>
        {seconds === 0 ? rockPaperScissors[index] : seconds}
      </button>
    </div>
  );
};
