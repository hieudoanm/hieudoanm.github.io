import { ComponentType } from 'react';
import {
  PiArrowsDownUp,
  PiBank,
  PiBook,
  PiBrain,
  PiBugDroid,
  PiBuilding,
  PiCards,
  PiCircleDashed,
  PiCode,
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

export interface GameItem {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  toolId: string;
  tags?: string[];
}

export interface GameSection {
  label: string;
  slug: string;
  items: GameItem[];
}

export const GAME_SECTIONS: GameSection[] = [
  {
    label: 'Arcade',
    slug: 'arcade',
    items: [
      {
        label: 'Dino Run',
        description: 'Infinite runner',
        icon: PiGameController,
        toolId: 'dino-run',
      },
      {
        label: 'RPS',
        description: 'Rock Paper Scissors',
        icon: PiScissors,
        toolId: 'rps',
      },
      {
        label: 'Snake',
        description: '12×12 grid',
        icon: PiBugDroid,
        toolId: 'snake',
      },
    ],
  },
  {
    label: 'Tic-Tac-Toe',
    slug: 'tic-tac-toe',
    items: [
      {
        label: 'Classic',
        description: 'Traditional rules',
        icon: PiX,
        toolId: 'classic',
      },
      {
        label: 'Duck',
        description: 'Place mark, move duck',
        icon: PiX,
        toolId: 'duck',
      },
      {
        label: 'Notakto',
        description: 'X only, 3 in a row loses',
        icon: PiX,
        toolId: 'notakto',
      },
      {
        label: 'Reverse',
        description: '3 in a row loses',
        icon: PiX,
        toolId: 'reverse',
      },
      {
        label: 'T3',
        description: 'Max 3 marks each',
        icon: PiX,
        toolId: 't3',
      },

      {
        label: 'Wild',
        description: 'Choose X or O each turn',
        icon: PiX,
        toolId: 'wild',
      },
    ],
  },
  {
    label: 'Casino',
    slug: 'casino',
    items: [
      {
        label: 'Baccarat',
        description: 'Card game',
        icon: PiBank,
        toolId: 'tai-baccarat',
      },
      {
        label: 'Blackjack',
        description: 'Cards Counter',
        icon: PiCards,
        toolId: 'blackjack',
      },
      {
        label: 'Poker',
        description: 'Odds Calculator',
        icon: PiCards,
        toolId: 'poker',
      },
      {
        label: 'Dice Game',
        description: 'Over/Under 7',
        icon: PiDiceOne,
        toolId: 'dice-game',
      },
      {
        label: 'Slot Machine',
        description: '3 reels',
        icon: PiCoin,
        toolId: 'slot-machine',
      },
    ],
  },
  {
    label: 'Chess',
    slug: 'chess',
    items: [
      {
        label: 'Board',
        description: 'Chess board with analysis, engine, and openings browser',
        icon: PiGameController,
        toolId: 'chess-board',
      },
      {
        label: 'Insights',
        description:
          'Player distribution by title and rating with percentile comparisons',
        icon: PiGameController,
        toolId: 'chess-stats',
      },
      {
        label: 'Chess Clock',
        description: 'Chess Timer',
        icon: PiGameController,
        toolId: 'chess-clock',
      },
      {
        label: 'Elo',
        description: 'Calculator',
        icon: PiGameController,
        toolId: 'chess-elo',
      },
    ],
  },
  {
    label: 'Countries',
    slug: 'countries',
    items: [
      {
        label: 'Border',
        description: 'Guess the neighbor',
        icon: PiMapTrifold,
        toolId: 'countries-border',
      },
      {
        label: 'Connection',
        description: 'Group countries by category',
        icon: PiGridFour,
        toolId: 'countries-connection',
      },
      {
        label: 'Continents Sort',
        description: 'Drag countries into continents',
        icon: PiSortAscending,
        toolId: 'countries-continents-sort',
      },
      {
        label: 'Emoji Guesser',
        description: 'Pick the flag',
        icon: PiSmiley,
        toolId: 'emoji-guesser',
      },
      {
        label: 'Flag Guesser',
        description: 'Name the country',
        icon: PiGlobe,
        toolId: 'flag-guesser',
      },
      {
        label: 'Higher or Lower',
        description: 'Compare populations',
        icon: PiArrowsDownUp,
        toolId: 'countries-higher-lower',
      },
    ],
  },
  {
    label: 'Memory',
    slug: 'memory',
    items: [
      {
        label: 'Memory Match',
        description: 'Find matching pairs',
        icon: PiBrain,
        toolId: 'memory-match',
      },
      {
        label: 'N-Back',
        description: 'Working memory',
        icon: PiNumberSquareOne,
        toolId: 'n-back',
      },
      { label: 'PI', description: 'Memorization', icon: PiPi, toolId: 'pi' },
      {
        label: 'Quizify',
        description: 'Quiz',
        icon: PiQuestion,
        toolId: 'quizify',
      },
      {
        label: 'Recall',
        description: 'Memorization',
        icon: PiCode,
        toolId: 'recall',
      },
    ],
  },
  {
    label: 'Nikoli',
    slug: 'nikoli',
    items: [
      {
        label: 'Fillomino',
        description: 'Fill with matching regions',
        icon: PiSquaresFour,
        toolId: 'fillomino',
      },
      {
        label: 'Heyawake',
        description: 'Shade rooms by rules',
        icon: PiGraph,
        toolId: 'heyawake',
      },
      {
        label: 'Masyu',
        description: 'Loop through pearls',
        icon: PiCircleDashed,
        toolId: 'masyu',
      },
      {
        label: 'Norinori',
        description: 'Shade domino halves',
        icon: PiTarget,
        toolId: 'norinori',
      },
      {
        label: 'Nurikabe',
        description: 'Paint islands black',
        icon: PiPaintBrushBroad,
        toolId: 'nurikabe',
      },
      {
        label: 'Shikaku',
        description: 'Divide into rectangles',
        icon: PiGridFour,
        toolId: 'shikaku',
      },
      {
        label: 'Sudoku',
        description: '4×4 & 9×9',
        icon: PiPuzzlePiece,
        toolId: 'sudoku',
      },
    ],
  },
  {
    label: 'Puzzle',
    slug: 'puzzle',
    items: [
      {
        label: '2048',
        description: 'Merge tiles',
        icon: PiNumberSquareOne,
        toolId: 'game2048',
      },
      {
        label: 'Lights Out',
        description: 'Toggle all lights off',
        icon: PiLamp,
        toolId: 'lights-out',
      },
      {
        label: 'Maze',
        description: 'Gen & solve',
        icon: PiHurricane,
        toolId: 'maze',
      },
      {
        label: 'Sliding Puzzle',
        description: 'Upload & slide tiles',
        icon: PiSnowflake,
        toolId: 'sliding-puzzle',
      },
      {
        label: 'Towers',
        description: 'Towers of Hanoi',
        icon: PiBuilding,
        toolId: 'towers',
      },
    ],
  },
  {
    label: 'Trivia',
    slug: 'trivia',
    items: [
      { label: 'PD', description: '', icon: PiScales, toolId: 'pd' },
      {
        label: 'Pokedex',
        description: 'Pokemon',
        icon: PiBook,
        toolId: 'pokedex',
      },
    ],
  },
  {
    label: 'Word',
    slug: 'word',
    items: [
      {
        label: 'Palindrome',
        description: 'Palindrome',
        icon: PiRepeat,
        toolId: 'palindrome',
      },
      {
        label: 'Typoglycemia',
        description: 'Scrambled text',
        icon: PiShuffle,
        toolId: 'typoglycemia',
      },
      {
        label: 'Wordle',
        description: 'Guess the word',
        icon: PiSquare,
        toolId: 'wordle',
      },
    ],
  },
];
