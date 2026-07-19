import type { ReactNode } from 'react';

import { GAME_NAME as MAZE_NAME } from '../Maze/types';
import { GAME_NAME as SNAKE_NAME } from '../Snake/types';
import { GAME_NAME as DINORUN_NAME } from '../DinoRun/types';
import { GAME_NAME as RPS_NAME } from '../RockPaperScissors/types';

const MazeVisualization = () => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="grid gap-px"
      style={{ gridTemplateColumns: 'repeat(4, 1fr)', width: '80px' }}>
      {[
        { wall: 'border-l-2 border-t-2', bg: 'bg-primary/30' },
        { wall: 'border-t-2', bg: 'bg-primary/30' },
        { wall: 'border-t-2 border-r-2', bg: 'bg-primary/30' },
        { wall: 'border-r-2', bg: 'bg-primary/30' },
        { wall: 'border-l-2', bg: 'bg-base-200' },
        { wall: '', bg: 'bg-base-content/20' },
        { wall: '', bg: 'bg-base-200' },
        { wall: 'border-r-2', bg: 'bg-base-200' },
        { wall: 'border-l-2 border-b-2', bg: 'bg-base-200' },
        { wall: 'border-b-2', bg: 'bg-base-200' },
        { wall: '', bg: 'bg-base-content/20' },
        { wall: 'border-r-2', bg: 'bg-base-200' },
        { wall: 'border-l-2 border-b-2', bg: 'bg-base-200' },
        { wall: 'border-b-2', bg: 'bg-base-200' },
        { wall: 'border-b-2', bg: 'bg-base-200' },
        { wall: 'border-b-2 border-r-2', bg: 'bg-primary/60' },
      ].map((cell, i) => (
        <div
          key={i}
          className={`flex aspect-square items-center justify-center ${cell.wall} ${cell.bg}`}
        />
      ))}
    </div>
    <span className="text-base-content/40 text-[8px]">RED: START / END</span>
  </div>
);

const SnakeVisualization = () => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="grid gap-px"
      style={{ gridTemplateColumns: 'repeat(4, 1fr)', width: '80px' }}>
      {[
        { bg: 'bg-base-200' },
        { bg: 'bg-base-200' },
        { bg: 'bg-base-200' },
        { bg: 'bg-base-200' },
        { bg: 'bg-base-200' },
        { bg: 'bg-base-content/30' },
        { bg: 'bg-base-content/20' },
        { bg: 'bg-base-content/20' },
        { bg: 'bg-base-200' },
        { bg: 'bg-base-200' },
        { bg: 'bg-base-200' },
        { bg: 'bg-primary/70' },
        { bg: 'bg-base-200' },
        { bg: 'bg-base-200' },
        { bg: 'bg-base-200' },
        { bg: 'bg-base-200' },
      ].map((cell, i) => (
        <div
          key={i}
          className={`flex aspect-square items-center justify-center ${cell.bg}`}
        />
      ))}
    </div>
    <span className="text-base-content/40 text-[8px]">
      WHITE: SNAKE / RED: FOOD
    </span>
  </div>
);

const DinoRunVisualization = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="bg-base-200 border-base-content/10 flex h-16 w-48 items-end border p-2">
      <span className="text-2xl">{'\uD83E\uDD95'}</span>
      <div className="flex-1" />
      <span className="text-xl">{'\uD83C\uDF35'}</span>
      <span className="text-xl">{'\uD83E\uDD85'}</span>
    </div>
    <span className="text-base-content/40 text-[8px]">JUMP OVER OBSTACLES</span>
  </div>
);

const RPSVisualization = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex gap-4 text-2xl">
      <span>{'\uD83E\uDEA8'}</span>
      <span className="text-base-content/20">VS</span>
      <span>{'\uD83D\uDCC4'}</span>
      <span className="text-base-content/20">VS</span>
      <span>{'\u2702\uFE0F'}</span>
    </div>
    <span className="text-base-content/40 text-[8px]">
      PICK ONE TO BEAT THE BOT
    </span>
  </div>
);

export interface GameData {
  title: string;
  subtitle: string;
  instructions: string[];
  visualization: ReactNode;
}

export const GAME_DATA: Record<string, GameData> = {
  maze: {
    title: MAZE_NAME.en,
    subtitle: MAZE_NAME.ja,
    instructions: [
      'A RANDOM PERFECT MAZE IS GENERATED.',
      'RED CELLS ARE START AND END.',
      'CLICK SOLVE TO ANIMATE THE SHORTEST PATH.',
      'USE THE SLIDER TO CHANGE SIZE.',
      'R NEW MAZE / S SOLVE / ESC BACK.',
    ],
    visualization: <MazeVisualization />,
  },
  snake: {
    title: SNAKE_NAME.en,
    subtitle: SNAKE_NAME.ja,
    instructions: [
      'USE ARROW KEYS TO STEER.',
      'EAT FOOD TO GROW AND SCORE.',
      'HIT A WALL OR YOURSELF TO DIE.',
      'SPACE OR P TO PAUSE.',
      'ADJUST SPEED WITH THE SLIDER.',
    ],
    visualization: <SnakeVisualization />,
  },
  'dino-run': {
    title: DINORUN_NAME.en,
    subtitle: DINORUN_NAME.ja,
    instructions: [
      'THE DINO AUTO-RUNS.',
      'PRESS SPACE, CLICK, OR UP TO JUMP.',
      'JUMP OVER CACTI, ROCKS, AND BIRDS.',
      'LANDING ON AN OBSTACLE ENDS THE ROUND.',
      'PRESS R TO RESTART.',
    ],
    visualization: <DinoRunVisualization />,
  },
  'rock-paper-scissors': {
    title: RPS_NAME.en,
    subtitle: RPS_NAME.ja,
    instructions: [
      'PICK ROCK, PAPER, OR SCISSORS.',
      'THE BOT PICKS RANDOMLY.',
      'ROCK BEATS SCISSORS.',
      'PAPER BEATS ROCK.',
      'SCISSORS BEATS PAPER.',
    ],
    visualization: <RPSVisualization />,
  },
};
