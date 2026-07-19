# HISTORY: Through the Years (Digital)

_A timeline-based history game inspired by the physical board/card game HISTORY:
Through the Years._

> **Important**
>
> This project should be an **original implementation** inspired by the gameplay
> mechanics of placing historical events on a timeline. It must not copy
> copyrighted text, card wording, artwork, card layouts, branding, or
> proprietary assets from the physical game. All event descriptions, images, UI,
> and metadata should be independently created or sourced from permissively
> licensed datasets.

---

## Table of Contents

- [HISTORY: Through the Years (Digital)](#history-through-the-years-digital)
  - [Table of Contents](#table-of-contents)
  - [Goal](#goal)
  - [Tech Stack](#tech-stack)
  - [Architecture](#architecture)
  - [Core Gameplay](#core-gameplay)
  - [Timeline Rules](#timeline-rules)
  - [Win Conditions](#win-conditions)
  - [Difficulty Levels](#difficulty-levels)
  - [Event Schema](#event-schema)
  - [Supported Dates](#supported-dates)
  - [Timeline Placement](#timeline-placement)
  - [Scoring](#scoring)
  - [Combo System](#combo-system)
  - [XP](#xp)
  - [Hint System](#hint-system)
  - [Categories](#categories)
  - [Regions](#regions)
  - [Game Modes](#game-modes)
    - [Practice](#practice)
    - [Classic](#classic)
    - [Endless](#endless)
    - [Hardcore](#hardcore)
    - [Blitz](#blitz)
    - [Zen](#zen)
    - [Daily Challenge](#daily-challenge)
  - [Card Component](#card-component)
  - [Timeline Component](#timeline-component)
  - [Animations](#animations)
  - [Sound](#sound)
  - [Statistics](#statistics)
  - [Achievements](#achievements)
  - [Accessibility](#accessibility)
  - [Data](#data)
  - [Event Validation](#event-validation)
  - [Search](#search)
  - [Leaderboards](#leaderboards)
  - [Offline](#offline)
  - [Save Data](#save-data)
  - [Testing](#testing)
  - [Performance](#performance)
  - [Future Features](#future-features)
  - [Milestones](#milestones)
    - [Phase 1](#phase-1)
    - [Phase 2](#phase-2)
    - [Phase 3](#phase-3)
    - [Phase 4](#phase-4)
    - [Phase 5](#phase-5)
  - [Coding Standards](#coding-standards)
  - [Deliverables](#deliverables)

## Goal

Build a polished web game where players arrange historical events in
chronological order.

The experience should be:

- easy to learn
- satisfying
- educational
- highly replayable
- mobile friendly
- offline capable

Think:

- Wordle
- GeoGuessr
- Timeline
- Balatro polish

---

## Tech Stack

- Next.js
- TypeScript
- TailwindCSS
- React
- Zustand
- Framer Motion
- IndexedDB
- PWA
- Vitest
- Playwright

---

## Architecture

```
app/
components/
features/
    game/
    cards/
    timeline/
    scoring/
    stats/
lib/
hooks/
data/
public/
```

Game logic must be completely separated from UI.

```
Game Engine

↓

State Store

↓

React UI
```

Never mix UI with business logic.

---

## Core Gameplay

Each card represents one historical event.

Example:

```
Moon Landing
1969
```

The year is hidden.

The player must place the card on the timeline.

Example

```
1776
↓

1865
↓

?

↓

1989
```

Player drags the card between events.

After placement:

Reveal year.

```
1776

1865

1969 ✓

1989
```

Correct placement:

+1 point

Incorrect:

show correct location.

Continue.

---

## Timeline Rules

The timeline grows after every turn.

Initial timeline:

```
1492
1945
```

Player receives

```
Printing Press
```

Places it

↓

Reveal

```
1450

1492

1945
```

Next card.

Eventually:

```
500 BC

44 BC

1066

1215

1492

1776

1865

1969

1989

2001
```

---

## Win Conditions

Classic

20 cards.

Highest score wins.

---

Endless

Infinite cards.

Game ends on first mistake.

---

Survival

3 lives.

---

Time Attack

5 minutes.

---

Daily Challenge

Same deck for everyone.

One puzzle per day.

---

Multiplayer

Each player receives same cards.

Fastest correct answer wins.

---

## Difficulty Levels

Easy

Only famous events.

Medium

Mix.

Hard

Obscure events.

Expert

Thousands of events.

---

## Event Schema

```ts
type HistoricalEvent = {
  id: string;

  title: string;

  year: number;

  month?: number;

  day?: number;

  description: string;

  category:
    | 'war'
    | 'science'
    | 'politics'
    | 'sports'
    | 'music'
    | 'film'
    | 'technology'
    | 'space'
    | 'culture'
    | 'medicine';

  region: 'world' | 'asia' | 'europe' | 'africa' | 'oceania' | 'americas';

  difficulty: 1 | 2 | 3 | 4 | 5;

  source: string;
};
```

---

## Supported Dates

Need to support

```
450 BC

44 BC

0

476

1066

1776

1945

1969

2025
```

Internally

```
BC = negative years
```

Sorting function must support BC.

---

## Timeline Placement

Algorithm

```
Sort all events by date.

Find insertion index.

Compare player index.

Correct?

Yes

No
```

---

## Scoring

Correct

+100

Perfect streak

+25

Speed bonus

up to +50

Hint used

-25

Wrong

0

---

## Combo System

```
3 correct

Combo x2

5 correct

Combo x3

10 correct

Combo x5
```

---

## XP

Award XP.

Unlock

- avatars
- themes
- achievements

---

## Hint System

Hint 1

Century

```
1800s
```

Hint 2

Decade

```
1860s
```

Hint 3

Reveal neighbouring event.

---

## Categories

Allow filtering.

Examples

- Ancient
- Medieval
- Renaissance
- Exploration
- Revolution
- Industrial
- Modern
- World Wars
- Cold War
- Space
- Internet
- Sports
- Music
- Movies
- Medicine
- Computing

---

## Regions

- World
- Europe
- Asia
- Africa
- Americas
- Oceania

---

## Game Modes

### Practice

Unlimited.

No score.

---

### Classic

20 events.

---

### Endless

Infinite.

---

### Hardcore

One mistake.

---

### Blitz

60 seconds.

---

### Zen

No timer.

---

### Daily Challenge

Seed generated from UTC date.

Everyone gets identical deck.

---

## Card Component

Displays

```
+------------------------+

Title

Description

Category

Difficulty

+------------------------+
```

Never reveal date until placed.

---

## Timeline Component

Horizontal on desktop.

Vertical on mobile.

Supports:

- zoom
- scroll
- animation

---

## Animations

- card flip
- slide
- reveal
- confetti
- streak animation

60 FPS.

---

## Sound

Optional.

Effects

- correct
- incorrect
- combo
- achievement

Mute supported.

---

## Statistics

Store locally.

Track

Games

Wins

Accuracy

Average response time

Longest streak

Favourite category

---

## Achievements

Examples

First Win

100 Correct

1000 Correct

Ancient Master

Science Expert

Perfect Game

No Hints

100-day Streak

---

## Accessibility

Keyboard playable.

Screen reader labels.

High contrast mode.

Reduced motion.

Colour-blind friendly.

---

## Data

JSON.

```
events/

ancient.json

medieval.json

modern.json

science.json

technology.json

```

Lazy load.

---

## Event Validation

Every event must include

- title
- description
- year
- category
- source

Reject duplicates.

---

## Search

Players can browse events.

Search by

- title
- year
- category
- region

---

## Leaderboards

Daily

Weekly

All Time

---

## Offline

Entire game playable offline.

PWA.

---

## Save Data

Persist

- progress
- achievements
- settings
- statistics

IndexedDB.

---

## Testing

Unit

- date sorting
- insertion
- scoring
- combo

Integration

- gameplay flow

E2E

- complete game
- offline mode
- mobile

---

## Performance

Initial JS <250 KB

Lighthouse >95

First Paint <1.5 s

60 FPS

---

## Future Features

- AI-generated quizzes
- Timeline editor
- Community packs
- Custom decks
- Classroom mode
- Teacher dashboard
- Tournament mode
- Multiplayer Elo
- Seasonal events
- Wikipedia integration
- Historical maps
- Images for events
- Audio narration

---

## Milestones

### Phase 1

- Core engine
- Timeline
- Card placement
- Scoring
- Local JSON

### Phase 2

- Animations
- Sound
- Statistics
- Achievements
- Difficulty filters

### Phase 3

- Daily Challenge
- PWA
- Offline
- Search
- Themes

### Phase 4

- Multiplayer
- Leaderboards
- Accounts
- Cloud saves

### Phase 5

- Community content
- AI assistance
- Classroom mode

---

## Coding Standards

- Strict TypeScript
- No `any`
- Arrow functions only (no `function` keyword)
- Functional React components
- Pure game engine
- 100% typed API
- ESLint + Prettier
- Comprehensive unit tests
- Reusable UI components
- Mobile-first responsive design
- Clean architecture with dependency inversion where appropriate

---

## Deliverables

Codex should implement the project in this order:

1. Core game engine (timeline insertion, validation, scoring)
2. Event data model and sample dataset (100 original events)
3. Zustand game store
4. Timeline and card UI
5. Drag-and-drop interactions with keyboard accessibility
6. Game modes (Practice, Classic, Endless)
7. Statistics and achievements
8. Local persistence (IndexedDB)
9. PWA support and offline play
10. Automated tests (unit, integration, Playwright E2E)
11. Performance optimisation and accessibility audit
12. Documentation (README, architecture diagrams, developer guide)
