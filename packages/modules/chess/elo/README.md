# @chess/elo

## Table of Contents

- [@chess/elo](#chesselo)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)

## Installation

```bash
yarn add @chess/elo
npm install @chess/elo
pnpm install @chess/elo
```

## Usage

```typescript
import { calculatePerformance, calculateRating, Score } from '@chess/elo';

const newRating = calculateRating({
  ratingPlayer: 1500,
  ratingOpponent: 1500,
  score: Score.WIN,
  timeClass: 'classical',
  lessThan30Games: true,
  overRating2400: false,
  overAge18: true,
});

const performanceRating = calculatePerformance({
  games: [
    { ratingOpponent: 1700, score: Score.WIN },
    { ratingOpponent: 1900, score: Score.LOSS },
  ],
});
```
