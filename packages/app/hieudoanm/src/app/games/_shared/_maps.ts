import type { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import type { ModalId } from '@hieudoanm.github.io/components/pages/start/types';

import {
  PiArrowsDownUp,
  PiBank,
  PiBook,
  PiBugDroid,
  PiBuilding,
  PiCards,
  PiCircleDashed,
  PiCoin,
  PiDiceOne,
  PiGameController,
  PiGlobe,
  PiGraph,
  PiGridFour,
  PiHurricane,
  PiLamp,
  PiMapTrifold,
  PiNumberSquareOne,
  PiPaintBrushBroad,
  PiPi,
  PiPuzzlePiece,
  PiQuestion,
  PiRepeat,
  PiScales,
  PiScissors,
  PiShuffle,
  PiSmiley,
  PiSnowflake,
  PiSortAscending,
  PiSquare,
  PiSquaresFour,
  PiTarget,
  PiX,
} from 'react-icons/pi';

export { GAME_CATEGORY_LABELS } from '../constants';

const makeArcade = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Dino Run',
    description: 'Infinite runner',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiGameController,
    onClick: open('dino-run'),
  },
  {
    label: 'RPS',
    description: 'Rock Paper Scissors',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiScissors,
    onClick: open('rps'),
  },
  {
    label: 'Snake',
    description: '12×12 grid',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiBugDroid,
    onClick: open('snake'),
  },
  {
    label: 'T3',
    description: 'Tic-Tac-Toe',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiX,
    onClick: open('t3'),
  },
];

const makeCasino = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Baccarat',
    description: 'Card game',
    tags: ['game', 'fun', 'entertainment', 'gambling'],
    icon: PiBank,
    onClick: open('tai-baccarat'),
  },
  {
    label: 'Blackjack',
    description: 'Cards Counter',
    tags: ['game', 'fun', 'entertainment', 'gambling'],
    icon: PiCards,
    onClick: open('blackjack'),
  },
  {
    label: 'Poker',
    description: 'Odds Calculator',
    tags: ['game', 'fun', 'entertainment', 'gambling'],
    icon: PiCards,
    onClick: open('poker'),
  },
  {
    label: 'Dice Game',
    description: 'Over/Under 7',
    tags: ['game', 'fun', 'entertainment', 'gambling'],
    icon: PiDiceOne,
    onClick: open('dice-game'),
  },
  {
    label: 'Slot Machine',
    description: '3 reels',
    tags: ['game', 'fun', 'entertainment', 'gambling'],
    icon: PiCoin,
    onClick: open('slot-machine'),
  },
];

const makeChess = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Board',
    description: 'Chess board with analysis, engine, and openings browser',
    tags: ['game', 'fun', 'entertainment', 'board-game'],
    icon: PiGameController,
    onClick: open('chess-board'),
  },
  {
    label: 'Insights',
    description:
      'Player distribution by title and rating with percentile comparisons',
    tags: ['game', 'fun', 'entertainment', 'stats'],
    icon: PiGameController,
    onClick: open('chess-stats'),
  },
  {
    label: 'Chess Clock',
    description: 'Chess Timer',
    tags: ['game', 'fun', 'entertainment', 'board-game'],
    icon: PiGameController,
    onClick: open('chess-clock'),
  },
  {
    label: 'Elo',
    description: 'Calculator',
    tags: ['game', 'fun', 'entertainment', 'rating'],
    icon: PiGameController,
    onClick: open('chess-elo'),
  },
];

const makeCountries = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Border',
    description: 'Guess the neighbor',
    tags: ['game', 'fun', 'entertainment', 'geography'],
    icon: PiMapTrifold,
    onClick: open('countries-border'),
  },
  {
    label: 'Connection',
    description: 'Group countries by category',
    tags: ['game', 'fun', 'entertainment', 'geography'],
    icon: PiGridFour,
    onClick: open('countries-connection'),
  },
  {
    label: 'Continents Sort',
    description: 'Drag countries into continents',
    tags: ['game', 'fun', 'entertainment', 'geography'],
    icon: PiSortAscending,
    onClick: open('countries-continents-sort'),
  },
  {
    label: 'Emoji Guesser',
    description: 'Pick the flag',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiSmiley,
    onClick: open('emoji-guesser'),
  },
  {
    label: 'Flag Guesser',
    description: 'Name the country',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiGlobe,
    onClick: open('flag-guesser'),
  },
  {
    label: 'Higher or Lower',
    description: 'Compare populations',
    tags: ['game', 'fun', 'entertainment', 'geography'],
    icon: PiArrowsDownUp,
    onClick: open('countries-higher-lower'),
  },
];

const makeNikoli = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Fillomino',
    description: 'Fill with matching regions',
    tags: ['game', 'fun', 'entertainment', 'nikoli'],
    icon: PiSquaresFour,
    onClick: open('fillomino'),
  },
  {
    label: 'Heyawake',
    description: 'Shade rooms by rules',
    tags: ['game', 'fun', 'entertainment', 'nikoli'],
    icon: PiGraph,
    onClick: open('heyawake'),
  },
  {
    label: 'Masyu',
    description: 'Loop through pearls',
    tags: ['game', 'fun', 'entertainment', 'nikoli'],
    icon: PiCircleDashed,
    onClick: open('masyu'),
  },
  {
    label: 'Norinori',
    description: 'Shade domino halves',
    tags: ['game', 'fun', 'entertainment', 'nikoli'],
    icon: PiTarget,
    onClick: open('norinori'),
  },
  {
    label: 'Nurikabe',
    description: 'Paint islands black',
    tags: ['game', 'fun', 'entertainment', 'nikoli'],
    icon: PiPaintBrushBroad,
    onClick: open('nurikabe'),
  },
  {
    label: 'Shikaku',
    description: 'Divide into rectangles',
    tags: ['game', 'fun', 'entertainment', 'nikoli'],
    icon: PiGridFour,
    onClick: open('shikaku'),
  },
  {
    label: 'Sudoku',
    description: '4×4 & 9×9',
    tags: ['game', 'fun', 'entertainment', 'nikoli'],
    icon: PiPuzzlePiece,
    onClick: open('sudoku'),
  },
];

const makeMemory = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Memory Match',
    description: 'Find matching pairs',
    tags: ['game', 'fun', 'entertainment', 'memory'],
    icon: PiGameController,
    onClick: open('memory-match'),
  },
  {
    label: 'N-Back',
    description: 'Working memory',
    tags: ['game', 'fun', 'entertainment', 'memory'],
    icon: PiNumberSquareOne,
    onClick: open('n-back'),
  },
  {
    label: 'PI',
    description: 'Memorization',
    tags: ['game', 'fun', 'entertainment', 'memory'],
    icon: PiPi,
    onClick: open('pi'),
  },
  {
    label: 'Quizify',
    description: 'Quiz',
    tags: ['game', 'fun', 'entertainment', 'memory'],
    icon: PiQuestion,
    onClick: open('quizify'),
  },
  {
    label: 'Recall',
    description: 'Memorization',
    tags: ['game', 'fun', 'entertainment', 'memory'],
    icon: PiGameController,
    onClick: open('recall'),
  },
];

const makePuzzle = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: '2048',
    description: 'Merge tiles',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiNumberSquareOne,
    onClick: open('game2048'),
  },
  {
    label: 'Lights Out',
    description: 'Toggle all lights off',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiLamp,
    onClick: open('lights-out'),
  },
  {
    label: 'Maze',
    description: 'Gen & solve',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiHurricane,
    onClick: open('maze'),
  },
  {
    label: 'Sliding Puzzle',
    description: 'Upload & slide tiles',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiSnowflake,
    onClick: open('sliding-puzzle'),
  },
  {
    label: 'Towers',
    description: 'Towers of Hanoi',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiBuilding,
    onClick: open('towers'),
  },
];

const makeTrivia = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'PD',
    description: '',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiScales,
    onClick: open('pd'),
  },
  {
    label: 'Pokedex',
    description: 'Pokemon',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiBook,
    onClick: open('pokedex'),
  },
];

const makeWord = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Palindrome',
    description: 'Palindrome',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiRepeat,
    onClick: open('palindrome'),
  },
  {
    label: 'Typoglycemia',
    description: 'Scrambled text',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiShuffle,
    onClick: open('typoglycemia'),
  },
  {
    label: 'Wordle',
    description: 'Guess the word',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiSquare,
    onClick: open('wordle'),
  },
];

export const CATEGORY_CONFIGS: Record<
  string,
  {
    make: (open: (id: ModalId) => () => void) => Tool[];
  }
> = {
  arcade: { make: makeArcade },
  casino: { make: makeCasino },
  chess: { make: makeChess },
  countries: { make: makeCountries },
  nikoli: { make: makeNikoli },
  memory: { make: makeMemory },
  puzzle: { make: makePuzzle },
  trivia: { make: makeTrivia },
  word: { make: makeWord },
};
