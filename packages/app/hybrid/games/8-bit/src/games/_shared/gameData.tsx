import type { ReactNode } from 'react';

import { GAME_NAME as MAZE_NAME } from '../Maze/types';
import { GAME_NAME as SNAKE_NAME } from '../Snake/types';
import { GAME_NAME as DINORUN_NAME } from '../DinoRun/types';

const MazeVisualization = () => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="grid gap-px"
      style={{ gridTemplateColumns: 'repeat(4, 1fr)', width: '80px' }}>
      {[
        { wall: 'border-l-2 border-t-2', bg: 'bg-primary/20' },
        { wall: 'border-t-2', bg: 'bg-primary/20' },
        { wall: 'border-t-2 border-r-2', bg: 'bg-primary/20' },
        { wall: 'border-r-2', bg: 'bg-primary/20' },
        { wall: 'border-l-2', bg: 'bg-base-100' },
        { wall: '', bg: 'bg-success/30' },
        { wall: '', bg: 'bg-base-100' },
        { wall: 'border-r-2', bg: 'bg-base-100' },
        { wall: 'border-l-2 border-b-2', bg: 'bg-base-100' },
        { wall: 'border-b-2', bg: 'bg-base-100' },
        { wall: '', bg: 'bg-success/30' },
        { wall: 'border-r-2', bg: 'bg-base-100' },
        { wall: 'border-l-2 border-b-2', bg: 'bg-base-100' },
        { wall: 'border-b-2', bg: 'bg-base-100' },
        { wall: 'border-b-2', bg: 'bg-base-100' },
        { wall: 'border-b-2 border-r-2', bg: 'bg-error/40' },
      ].map((cell, i) => (
        <div
          key={i}
          className={`flex aspect-square items-center justify-center rounded-sm text-[10px] ${cell.wall} ${cell.bg}`}
        />
      ))}
    </div>
    <span className="text-[10px] opacity-50">
      Blue: start · Green: path · Red: end
    </span>
  </div>
);

const SnakeVisualization = () => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="grid gap-px"
      style={{ gridTemplateColumns: 'repeat(4, 1fr)', width: '80px' }}>
      {[
        { bg: 'bg-base-200/30' },
        { bg: 'bg-base-200/30' },
        { bg: 'bg-base-200/30' },
        { bg: 'bg-base-200/30' },
        { bg: 'bg-base-200/30' },
        { bg: 'bg-success' },
        { bg: 'bg-success/60' },
        { bg: 'bg-success/60' },
        { bg: 'bg-base-200/30' },
        { bg: 'bg-base-200/30' },
        { bg: 'bg-base-200/30' },
        { bg: 'bg-error/70' },
        { bg: 'bg-base-200/30' },
        { bg: 'bg-base-200/30' },
        { bg: 'bg-base-200/30' },
        { bg: 'bg-base-200/30' },
      ].map((cell, i) => (
        <div
          key={i}
          className={`flex aspect-square items-center justify-center rounded-sm ${cell.bg}`}
        />
      ))}
    </div>
    <span className="text-[10px] opacity-50">Green: snake · Red: food</span>
  </div>
);

const DinoRunVisualization = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="bg-base-300 flex h-16 w-48 items-end rounded-lg p-2">
      <span className="text-2xl">\uD83E\uDD95</span>
      <div className="flex-1" />
      <span className="text-xl">\uD83C\uDF35</span>
      <span className="text-xl">\uD83E\uDD85</span>
    </div>
    <span className="text-[10px] opacity-50">Jump over obstacles to score</span>
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
      'A random perfect maze is generated on a grid.',
      'The blue cell is the start (top-left); the red cell is the end (bottom-right).',
      'Click "Solve" to animate the shortest path found by BFS.',
      'Use the slider to change the maze size from 5×5 to 20×20.',
      'Press R for a new maze, S to solve, Esc to go back.',
    ],
    visualization: <MazeVisualization />,
  },
  snake: {
    title: SNAKE_NAME.en,
    subtitle: SNAKE_NAME.ja,
    instructions: [
      'Use arrow keys to steer the snake.',
      'Eating food grows the snake and adds a point.',
      'Hitting a wall or your own body ends the game.',
      'Space or P toggles pause.',
      'Adjust the speed slider (1–5) to change the tick rate.',
    ],
    visualization: <SnakeVisualization />,
  },
  'dino-run': {
    title: DINORUN_NAME.en,
    subtitle: DINORUN_NAME.ja,
    instructions: [
      'The dino auto-runs and gains speed over time.',
      'Press Space, click, or ArrowUp to jump.',
      'Jump over cacti, rocks, and birds.',
      'Landing on an obstacle ends the round.',
      'Press R to restart after game over.',
    ],
    visualization: <DinoRunVisualization />,
  },
};
