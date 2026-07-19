# TREE

```text
├── __mocks__/
│   └── [chess-ts.js](./__mocks__/chess-ts.js)
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── public/
│   ├── db/
│   │   └── [chess.db](./public/db/chess.db)
│   ├── icons/
│   │   ├── [icon-128x128.png](./public/icons/icon-128x128.png)
│   │   ├── [icon-144x144.png](./public/icons/icon-144x144.png)
│   │   ├── [icon-152x152.png](./public/icons/icon-152x152.png)
│   │   ├── [icon-16x16.png](./public/icons/icon-16x16.png)
│   │   ├── [icon-180x180.png](./public/icons/icon-180x180.png)
│   │   ├── [icon-192x192.png](./public/icons/icon-192x192.png)
│   │   ├── [icon-256x256.png](./public/icons/icon-256x256.png)
│   │   ├── [icon-32x32.png](./public/icons/icon-32x32.png)
│   │   ├── [icon-384x384.png](./public/icons/icon-384x384.png)
│   │   ├── [icon-48x48.png](./public/icons/icon-48x48.png)
│   │   ├── [icon-512x512.png](./public/icons/icon-512x512.png)
│   │   ├── [icon-64x64.png](./public/icons/icon-64x64.png)
│   │   ├── [icon-72x72.png](./public/icons/icon-72x72.png)
│   │   ├── [icon-96x96.png](./public/icons/icon-96x96.png)
│   │   └── [icon.svg](./public/icons/icon.svg)
│   ├── workers/
│   │   └── [gif.worker.js](./public/workers/gif.worker.js)
│   ├── [apple-touch-icon.png](./public/apple-touch-icon.png)
│   ├── [favicon.ico](./public/favicon.ico)
│   ├── [robots.txt](./public/robots.txt)
│   └── [sitemap.xml](./public/sitemap.xml)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── forget-password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(auth)/forget-password/page.tsx)
│   │   │   ├── profile/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(auth)/profile/page.tsx)
│   │   │   ├── reset-password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(auth)/reset-password/page.tsx)
│   │   │   ├── sign-in/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(auth)/sign-in/page.tsx)
│   │   │   └── sign-up/
│   │   │       ├── __tests__/
│   │   │       │   └── [page.test.tsx](./src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │       └── [page.tsx](./src/app/(auth)/sign-up/page.tsx)
│   │   ├── (info)/
│   │   │   ├── about/
│   │   │   │   └── [page.tsx](./src/app/(info)/about/page.tsx)
│   │   │   ├── downloads/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(info)/downloads/page.tsx)
│   │   │   └── version/
│   │   │       └── [page.tsx](./src/app/(info)/version/page.tsx)
│   │   ├── __tests__/
│   │   │   ├── [error.test.tsx](./src/app/__tests__/error.test.tsx)
│   │   │   ├── [forbidden.test.tsx](./src/app/__tests__/forbidden.test.tsx)
│   │   │   ├── [global-error.test.tsx](./src/app/__tests__/global-error.test.tsx)
│   │   │   ├── [layout.test.tsx](./src/app/__tests__/layout.test.tsx)
│   │   │   ├── [loading.test.tsx](./src/app/__tests__/loading.test.tsx)
│   │   │   ├── [not-found.test.tsx](./src/app/__tests__/not-found.test.tsx)
│   │   │   ├── [page.test.tsx](./src/app/__tests__/page.test.tsx)
│   │   │   ├── [robots.test.ts](./src/app/__tests__/robots.test.ts)
│   │   │   ├── [template.test.tsx](./src/app/__tests__/template.test.tsx)
│   │   │   └── [unauthorized.test.tsx](./src/app/__tests__/unauthorized.test.tsx)
│   │   ├── board/
│   │   │   └── [page.tsx](./src/app/board/page.tsx)
│   │   ├── clock/
│   │   │   └── [page.tsx](./src/app/clock/page.tsx)
│   │   ├── elo/
│   │   │   └── [page.tsx](./src/app/elo/page.tsx)
│   │   ├── library/
│   │   │   └── [page.tsx](./src/app/library/page.tsx)
│   │   ├── pairing/
│   │   │   └── [page.tsx](./src/app/pairing/page.tsx)
│   │   ├── review/
│   │   │   └── [page.tsx](./src/app/review/page.tsx)
│   │   ├── stats/
│   │   │   └── [page.tsx](./src/app/stats/page.tsx)
│   │   ├── trainer/
│   │   │   └── [page.tsx](./src/app/trainer/page.tsx)
│   │   ├── [default.tsx](./src/app/default.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
│   │   ├── [favicon.ico](./src/app/favicon.ico)
│   │   ├── [forbidden.tsx](./src/app/forbidden.tsx)
│   │   ├── [global-error.tsx](./src/app/global-error.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   ├── [loading.tsx](./src/app/loading.tsx)
│   │   ├── [not-found.tsx](./src/app/not-found.tsx)
│   │   ├── [page.tsx](./src/app/page.tsx)
│   │   ├── [robots.ts](./src/app/robots.ts)
│   │   ├── [template.tsx](./src/app/template.tsx)
│   │   └── [unauthorized.tsx](./src/app/unauthorized.tsx)
│   ├── components/
│   │   ├── ChessBoard/
│   │   │   ├── __tests__/
│   │   │   │   ├── [EnginePanel.test.tsx](./src/components/ChessBoard/__tests__/EnginePanel.test.tsx)
│   │   │   │   ├── [EvalChart.test.tsx](./src/components/ChessBoard/__tests__/EvalChart.test.tsx)
│   │   │   │   ├── [MovesPanel.test.tsx](./src/components/ChessBoard/__tests__/MovesPanel.test.tsx)
│   │   │   │   ├── [SetupPanel.test.tsx](./src/components/ChessBoard/__tests__/SetupPanel.test.tsx)
│   │   │   │   ├── [index.test.tsx](./src/components/ChessBoard/__tests__/index.test.tsx)
│   │   │   │   └── [pieceSets.test.ts](./src/components/ChessBoard/__tests__/pieceSets.test.ts)
│   │   │   ├── components/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   ├── [EcoPanel.test.tsx.snap](./src/components/ChessBoard/components/__tests__/__snapshots__/EcoPanel.test.tsx.snap)
│   │   │   │   │   │   ├── [EnginePanel.test.tsx.snap](./src/components/ChessBoard/components/__tests__/__snapshots__/EnginePanel.test.tsx.snap)
│   │   │   │   │   │   ├── [ExportPanel.test.tsx.snap](./src/components/ChessBoard/components/__tests__/__snapshots__/ExportPanel.test.tsx.snap)
│   │   │   │   │   │   ├── [Header.test.tsx.snap](./src/components/ChessBoard/components/__tests__/__snapshots__/Header.test.tsx.snap)
│   │   │   │   │   │   └── [PositionPanel.test.tsx.snap](./src/components/ChessBoard/components/__tests__/__snapshots__/PositionPanel.test.tsx.snap)
│   │   │   │   │   ├── [BoardSection.test.tsx](./src/components/ChessBoard/components/__tests__/BoardSection.test.tsx)
│   │   │   │   │   ├── [EcoPanel.test.tsx](./src/components/ChessBoard/components/__tests__/EcoPanel.test.tsx)
│   │   │   │   │   ├── [EnginePanel.test.tsx](./src/components/ChessBoard/components/__tests__/EnginePanel.test.tsx)
│   │   │   │   │   ├── [ExportPanel.test.tsx](./src/components/ChessBoard/components/__tests__/ExportPanel.test.tsx)
│   │   │   │   │   ├── [Header.test.tsx](./src/components/ChessBoard/components/__tests__/Header.test.tsx)
│   │   │   │   │   ├── [PositionPanel.test.tsx](./src/components/ChessBoard/components/__tests__/PositionPanel.test.tsx)
│   │   │   │   │   └── [SetupPanel.test.tsx](./src/components/ChessBoard/components/__tests__/SetupPanel.test.tsx)
│   │   │   │   ├── [BoardSection.tsx](./src/components/ChessBoard/components/BoardSection.tsx)
│   │   │   │   ├── [EcoPanel.tsx](./src/components/ChessBoard/components/EcoPanel.tsx)
│   │   │   │   ├── [EnginePanel.tsx](./src/components/ChessBoard/components/EnginePanel.tsx)
│   │   │   │   ├── [EvalChart.tsx](./src/components/ChessBoard/components/EvalChart.tsx)
│   │   │   │   ├── [ExportPanel.tsx](./src/components/ChessBoard/components/ExportPanel.tsx)
│   │   │   │   ├── [Header.tsx](./src/components/ChessBoard/components/Header.tsx)
│   │   │   │   ├── [MovesPanel.tsx](./src/components/ChessBoard/components/MovesPanel.tsx)
│   │   │   │   ├── [PositionPanel.tsx](./src/components/ChessBoard/components/PositionPanel.tsx)
│   │   │   │   └── [SetupPanel.tsx](./src/components/ChessBoard/components/SetupPanel.tsx)
│   │   │   ├── hooks/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [boardReducer.extended.test.ts](./src/components/ChessBoard/hooks/__tests__/boardReducer.extended.test.ts)
│   │   │   │   │   ├── [boardReducer.test.ts](./src/components/ChessBoard/hooks/__tests__/boardReducer.test.ts)
│   │   │   │   │   ├── [useAnalysisLines.test.ts](./src/components/ChessBoard/hooks/__tests__/useAnalysisLines.test.ts)
│   │   │   │   │   ├── [useBoardHandlers.test.ts](./src/components/ChessBoard/hooks/__tests__/useBoardHandlers.test.ts)
│   │   │   │   │   ├── [useChessBoard.test.ts](./src/components/ChessBoard/hooks/__tests__/useChessBoard.test.ts)
│   │   │   │   │   ├── [useEcoData.test.ts](./src/components/ChessBoard/hooks/__tests__/useEcoData.test.ts)
│   │   │   │   │   ├── [useEngineIntegration.test.ts](./src/components/ChessBoard/hooks/__tests__/useEngineIntegration.test.ts)
│   │   │   │   │   ├── [useEvalHistory.test.ts](./src/components/ChessBoard/hooks/__tests__/useEvalHistory.test.ts)
│   │   │   │   │   ├── [useExport.test.ts](./src/components/ChessBoard/hooks/__tests__/useExport.test.ts)
│   │   │   │   │   ├── [useKeyboardNav.test.ts](./src/components/ChessBoard/hooks/__tests__/useKeyboardNav.test.ts)
│   │   │   │   │   ├── [useSetup.test.ts](./src/components/ChessBoard/hooks/__tests__/useSetup.test.ts)
│   │   │   │   │   └── [useShare.test.ts](./src/components/ChessBoard/hooks/__tests__/useShare.test.ts)
│   │   │   │   ├── [boardReducer.ts](./src/components/ChessBoard/hooks/boardReducer.ts)
│   │   │   │   ├── [useAnalysisLines.ts](./src/components/ChessBoard/hooks/useAnalysisLines.ts)
│   │   │   │   ├── [useBoardHandlers.ts](./src/components/ChessBoard/hooks/useBoardHandlers.ts)
│   │   │   │   ├── [useChessBoard.ts](./src/components/ChessBoard/hooks/useChessBoard.ts)
│   │   │   │   ├── [useEcoData.ts](./src/components/ChessBoard/hooks/useEcoData.ts)
│   │   │   │   ├── [useEngineIntegration.ts](./src/components/ChessBoard/hooks/useEngineIntegration.ts)
│   │   │   │   ├── [useEvalHistory.ts](./src/components/ChessBoard/hooks/useEvalHistory.ts)
│   │   │   │   ├── [useExport.ts](./src/components/ChessBoard/hooks/useExport.ts)
│   │   │   │   ├── [useKeyboardNav.ts](./src/components/ChessBoard/hooks/useKeyboardNav.ts)
│   │   │   │   ├── [useSetup.ts](./src/components/ChessBoard/hooks/useSetup.ts)
│   │   │   │   └── [useShare.ts](./src/components/ChessBoard/hooks/useShare.ts)
│   │   │   ├── utils/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [eco.test.ts](./src/components/ChessBoard/utils/__tests__/eco.test.ts)
│   │   │   │   │   ├── [fen.test.ts](./src/components/ChessBoard/utils/__tests__/fen.test.ts)
│   │   │   │   │   └── [pgn.test.ts](./src/components/ChessBoard/utils/__tests__/pgn.test.ts)
│   │   │   │   ├── [eco.ts](./src/components/ChessBoard/utils/eco.ts)
│   │   │   │   ├── [fen.ts](./src/components/ChessBoard/utils/fen.ts)
│   │   │   │   └── [pgn.ts](./src/components/ChessBoard/utils/pgn.ts)
│   │   │   ├── [AGENTS.md](./src/components/ChessBoard/AGENTS.md)
│   │   │   ├── [constants.ts](./src/components/ChessBoard/constants.ts)
│   │   │   ├── [index.tsx](./src/components/ChessBoard/index.tsx)
│   │   │   ├── [pieceSets.tsx](./src/components/ChessBoard/pieceSets.tsx)
│   │   │   └── [types.ts](./src/components/ChessBoard/types.ts)
│   │   ├── ChessClock/
│   │   │   ├── __tests__/
│   │   │   │   └── [index.test.tsx](./src/components/ChessClock/__tests__/index.test.tsx)
│   │   │   ├── components/
│   │   │   │   └── [icons.tsx](./src/components/ChessClock/components/icons.tsx)
│   │   │   ├── utils/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [clock.test.ts](./src/components/ChessClock/utils/__tests__/clock.test.ts)
│   │   │   │   │   └── [sound.test.ts](./src/components/ChessClock/utils/__tests__/sound.test.ts)
│   │   │   │   ├── [clock.ts](./src/components/ChessClock/utils/clock.ts)
│   │   │   │   └── [sound.ts](./src/components/ChessClock/utils/sound.ts)
│   │   │   ├── [AGENTS.md](./src/components/ChessClock/AGENTS.md)
│   │   │   ├── [constants.ts](./src/components/ChessClock/constants.ts)
│   │   │   ├── [index.test.tsx](./src/components/ChessClock/index.test.tsx)
│   │   │   ├── [index.tsx](./src/components/ChessClock/index.tsx)
│   │   │   └── [types.ts](./src/components/ChessClock/types.ts)
│   │   ├── ChessElo/
│   │   │   ├── __tests__/
│   │   │   │   ├── [Elo.test.tsx](./src/components/ChessElo/__tests__/Elo.test.tsx)
│   │   │   │   ├── [PerformanceTab.test.tsx](./src/components/ChessElo/__tests__/PerformanceTab.test.tsx)
│   │   │   │   └── [RatingTab.test.tsx](./src/components/ChessElo/__tests__/RatingTab.test.tsx)
│   │   │   ├── [AGENTS.md](./src/components/ChessElo/AGENTS.md)
│   │   │   ├── [PerformanceTab.tsx](./src/components/ChessElo/PerformanceTab.tsx)
│   │   │   ├── [RatingTab.tsx](./src/components/ChessElo/RatingTab.tsx)
│   │   │   ├── [index.tsx](./src/components/ChessElo/index.tsx)
│   │   │   └── [types.ts](./src/components/ChessElo/types.ts)
│   │   ├── ChessLibrary/
│   │   │   ├── __tests__/
│   │   │   │   └── [index.test.tsx](./src/components/ChessLibrary/__tests__/index.test.tsx)
│   │   │   ├── components/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ExplorerTab.test.tsx](./src/components/ChessLibrary/components/__tests__/ExplorerTab.test.tsx)
│   │   │   │   │   ├── [LibraryTab.test.tsx](./src/components/ChessLibrary/components/__tests__/LibraryTab.test.tsx)
│   │   │   │   │   └── [StudyView.test.tsx](./src/components/ChessLibrary/components/__tests__/StudyView.test.tsx)
│   │   │   │   ├── [ExplorerTab.tsx](./src/components/ChessLibrary/components/ExplorerTab.tsx)
│   │   │   │   ├── [LibraryTab.tsx](./src/components/ChessLibrary/components/LibraryTab.tsx)
│   │   │   │   └── [StudyView.tsx](./src/components/ChessLibrary/components/StudyView.tsx)
│   │   │   ├── utils/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [fetchers.test.ts](./src/components/ChessLibrary/utils/__tests__/fetchers.test.ts)
│   │   │   │   │   └── [library.test.ts](./src/components/ChessLibrary/utils/__tests__/library.test.ts)
│   │   │   │   ├── [fetchers.ts](./src/components/ChessLibrary/utils/fetchers.ts)
│   │   │   │   └── [library.ts](./src/components/ChessLibrary/utils/library.ts)
│   │   │   ├── [index.tsx](./src/components/ChessLibrary/index.tsx)
│   │   │   └── [types.ts](./src/components/ChessLibrary/types.ts)
│   │   ├── ChessPairing/
│   │   │   ├── utils/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [pairing.test.ts](./src/components/ChessPairing/utils/__tests__/pairing.test.ts)
│   │   │   │   └── [pairing.ts](./src/components/ChessPairing/utils/pairing.ts)
│   │   │   ├── [index.tsx](./src/components/ChessPairing/index.tsx)
│   │   │   └── [types.ts](./src/components/ChessPairing/types.ts)
│   │   ├── ChessReview/
│   │   │   ├── __tests__/
│   │   │   │   └── [index.test.tsx](./src/components/ChessReview/__tests__/index.test.tsx)
│   │   │   ├── utils/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [review.test.ts](./src/components/ChessReview/utils/__tests__/review.test.ts)
│   │   │   │   └── [review.ts](./src/components/ChessReview/utils/review.ts)
│   │   │   ├── [index.tsx](./src/components/ChessReview/index.tsx)
│   │   │   └── [types.ts](./src/components/ChessReview/types.ts)
│   │   ├── ChessStats/
│   │   │   ├── __tests__/
│   │   │   │   └── [index.test.tsx](./src/components/ChessStats/__tests__/index.test.tsx)
│   │   │   ├── components/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Analysis.test.tsx](./src/components/ChessStats/components/__tests__/Analysis.test.tsx)
│   │   │   │   │   ├── [HistogramBar.test.tsx](./src/components/ChessStats/components/__tests__/HistogramBar.test.tsx)
│   │   │   │   │   ├── [Percentile.test.tsx](./src/components/ChessStats/components/__tests__/Percentile.test.tsx)
│   │   │   │   │   ├── [SearchBar.test.tsx](./src/components/ChessStats/components/__tests__/SearchBar.test.tsx)
│   │   │   │   │   ├── [StatCard.test.tsx](./src/components/ChessStats/components/__tests__/StatCard.test.tsx)
│   │   │   │   │   └── [TitleSection.test.tsx](./src/components/ChessStats/components/__tests__/TitleSection.test.tsx)
│   │   │   │   ├── [Analysis.tsx](./src/components/ChessStats/components/Analysis.tsx)
│   │   │   │   ├── [HistogramBar.tsx](./src/components/ChessStats/components/HistogramBar.tsx)
│   │   │   │   ├── [Percentile.tsx](./src/components/ChessStats/components/Percentile.tsx)
│   │   │   │   ├── [SearchBar.tsx](./src/components/ChessStats/components/SearchBar.tsx)
│   │   │   │   ├── [StatCard.tsx](./src/components/ChessStats/components/StatCard.tsx)
│   │   │   │   └── [TitleSection.tsx](./src/components/ChessStats/components/TitleSection.tsx)
│   │   │   ├── data/
│   │   │   │   └── [analysis.json](./src/components/ChessStats/data/analysis.json)
│   │   │   ├── utils/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [percentile.test.ts](./src/components/ChessStats/utils/__tests__/percentile.test.ts)
│   │   │   │   │   └── [sql.test.ts](./src/components/ChessStats/utils/__tests__/sql.test.ts)
│   │   │   │   ├── [percentile.ts](./src/components/ChessStats/utils/percentile.ts)
│   │   │   │   └── [sql.ts](./src/components/ChessStats/utils/sql.ts)
│   │   │   ├── [AGENTS.md](./src/components/ChessStats/AGENTS.md)
│   │   │   ├── [constants.ts](./src/components/ChessStats/constants.ts)
│   │   │   ├── [index.tsx](./src/components/ChessStats/index.tsx)
│   │   │   └── [types.ts](./src/components/ChessStats/types.ts)
│   │   ├── ChessTrainer/
│   │   │   ├── __tests__/
│   │   │   │   └── [index.test.tsx](./src/components/ChessTrainer/__tests__/index.test.tsx)
│   │   │   ├── components/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [CoordinatesTab.test.tsx](./src/components/ChessTrainer/components/__tests__/CoordinatesTab.test.tsx)
│   │   │   │   │   ├── [CrazyhouseTab.test.tsx](./src/components/ChessTrainer/components/__tests__/CrazyhouseTab.test.tsx)
│   │   │   │   │   ├── [EndgameTab.test.tsx](./src/components/ChessTrainer/components/__tests__/EndgameTab.test.tsx)
│   │   │   │   │   ├── [HordeTab.test.tsx](./src/components/ChessTrainer/components/__tests__/HordeTab.test.tsx)
│   │   │   │   │   ├── [MateTab.test.tsx](./src/components/ChessTrainer/components/__tests__/MateTab.test.tsx)
│   │   │   │   │   ├── [OpeningTab.test.tsx](./src/components/ChessTrainer/components/__tests__/OpeningTab.test.tsx)
│   │   │   │   │   ├── [PerftTab.test.tsx](./src/components/ChessTrainer/components/__tests__/PerftTab.test.tsx)
│   │   │   │   │   ├── [TacticsTab.test.tsx](./src/components/ChessTrainer/components/__tests__/TacticsTab.test.tsx)
│   │   │   │   │   ├── [ThreeCheckTab.test.tsx](./src/components/ChessTrainer/components/__tests__/ThreeCheckTab.test.tsx)
│   │   │   │   │   └── [VariantsTab.test.tsx](./src/components/ChessTrainer/components/__tests__/VariantsTab.test.tsx)
│   │   │   │   ├── [CoordinatesTab.tsx](./src/components/ChessTrainer/components/CoordinatesTab.tsx)
│   │   │   │   ├── [CrazyhouseTab.tsx](./src/components/ChessTrainer/components/CrazyhouseTab.tsx)
│   │   │   │   ├── [EndgameTab.tsx](./src/components/ChessTrainer/components/EndgameTab.tsx)
│   │   │   │   ├── [HordeTab.tsx](./src/components/ChessTrainer/components/HordeTab.tsx)
│   │   │   │   ├── [MateTab.tsx](./src/components/ChessTrainer/components/MateTab.tsx)
│   │   │   │   ├── [OpeningTab.tsx](./src/components/ChessTrainer/components/OpeningTab.tsx)
│   │   │   │   ├── [PerftTab.tsx](./src/components/ChessTrainer/components/PerftTab.tsx)
│   │   │   │   ├── [TacticsTab.tsx](./src/components/ChessTrainer/components/TacticsTab.tsx)
│   │   │   │   ├── [ThreeCheckTab.tsx](./src/components/ChessTrainer/components/ThreeCheckTab.tsx)
│   │   │   │   └── [VariantsTab.tsx](./src/components/ChessTrainer/components/VariantsTab.tsx)
│   │   │   ├── data/
│   │   │   │   ├── [mates.ts](./src/components/ChessTrainer/data/mates.ts)
│   │   │   │   └── [puzzles.ts](./src/components/ChessTrainer/data/puzzles.ts)
│   │   │   ├── utils/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [coordinates.test.ts](./src/components/ChessTrainer/utils/__tests__/coordinates.test.ts)
│   │   │   │   │   ├── [endgame.test.ts](./src/components/ChessTrainer/utils/__tests__/endgame.test.ts)
│   │   │   │   │   ├── [opening.test.ts](./src/components/ChessTrainer/utils/__tests__/opening.test.ts)
│   │   │   │   │   ├── [perft.test.ts](./src/components/ChessTrainer/utils/__tests__/perft.test.ts)
│   │   │   │   │   ├── [tactics.test.ts](./src/components/ChessTrainer/utils/__tests__/tactics.test.ts)
│   │   │   │   │   └── [variants.test.ts](./src/components/ChessTrainer/utils/__tests__/variants.test.ts)
│   │   │   │   ├── [coordinates.ts](./src/components/ChessTrainer/utils/coordinates.ts)
│   │   │   │   ├── [endgame.ts](./src/components/ChessTrainer/utils/endgame.ts)
│   │   │   │   ├── [opening.ts](./src/components/ChessTrainer/utils/opening.ts)
│   │   │   │   ├── [perft.ts](./src/components/ChessTrainer/utils/perft.ts)
│   │   │   │   ├── [tactics.ts](./src/components/ChessTrainer/utils/tactics.ts)
│   │   │   │   └── [variants.ts](./src/components/ChessTrainer/utils/variants.ts)
│   │   │   ├── [index.tsx](./src/components/ChessTrainer/index.tsx)
│   │   │   └── [types.ts](./src/components/ChessTrainer/types.ts)
│   │   ├── __tests__/
│   │   │   ├── [ChessPairing.test.tsx](./src/components/__tests__/ChessPairing.test.tsx)
│   │   │   └── [ChessReview.test.tsx](./src/components/__tests__/ChessReview.test.tsx)
│   │   ├── organisms/
│   │   │   └── chess/
│   │   │       └── [ChessBoard.tsx](./src/components/organisms/chess/ChessBoard.tsx)
│   │   ├── templates/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   ├── [DownloadsTemplate.test.tsx](./src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │   │   ├── [DownloadsTemplate.tsx](./src/components/templates/DownloadsTemplate.tsx)
│   │   │   ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │   │   └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   │   ├── [ChessClock.test.tsx](./src/components/ChessClock.test.tsx)
│   │   └── [ToolPage.tsx](./src/components/ToolPage.tsx)
│   ├── lib/
│   │   ├── chess/
│   │   │   └── [openings.ts](./src/lib/chess/openings.ts)
│   │   └── [fonts.ts](./src/lib/fonts.ts)
│   ├── styles/
│   │   ├── [globals.css](./src/styles/globals.css)
│   │   └── [themes.css](./src/styles/themes.css)
│   └── utils/
│       ├── __tests__/
│       │   ├── [canvas.test.ts](./src/utils/__tests__/canvas.test.ts)
│       │   └── [preloadBackgroundImages.test.ts](./src/utils/__tests__/preloadBackgroundImages.test.ts)
│       └── [canvas.ts](./src/utils/canvas.ts)
├── src-tauri/
│   ├── capabilities/
│   │   └── [default.json](./src-tauri/capabilities/default.json)
│   ├── icons/
│   │   ├── [128x128.png](./src-tauri/icons/128x128.png)
│   │   ├── [128x128@2x.png](./src-tauri/icons/128x128@2x.png)
│   │   ├── [32x32.png](./src-tauri/icons/32x32.png)
│   │   ├── [Square107x107Logo.png](./src-tauri/icons/Square107x107Logo.png)
│   │   ├── [Square142x142Logo.png](./src-tauri/icons/Square142x142Logo.png)
│   │   ├── [Square150x150Logo.png](./src-tauri/icons/Square150x150Logo.png)
│   │   ├── [Square284x284Logo.png](./src-tauri/icons/Square284x284Logo.png)
│   │   ├── [Square30x30Logo.png](./src-tauri/icons/Square30x30Logo.png)
│   │   ├── [Square310x310Logo.png](./src-tauri/icons/Square310x310Logo.png)
│   │   ├── [Square44x44Logo.png](./src-tauri/icons/Square44x44Logo.png)
│   │   ├── [Square71x71Logo.png](./src-tauri/icons/Square71x71Logo.png)
│   │   ├── [Square89x89Logo.png](./src-tauri/icons/Square89x89Logo.png)
│   │   ├── [StoreLogo.png](./src-tauri/icons/StoreLogo.png)
│   │   ├── [icon.icns](./src-tauri/icons/icon.icns)
│   │   ├── [icon.ico](./src-tauri/icons/icon.ico)
│   │   └── [icon.png](./src-tauri/icons/icon.png)
│   ├── src/
│   │   ├── [lib.rs](./src-tauri/src/lib.rs)
│   │   └── [main.rs](./src-tauri/src/main.rs)
│   ├── [Cargo.lock](./src-tauri/Cargo.lock)
│   ├── [Cargo.toml](./src-tauri/Cargo.toml)
│   ├── [build.rs](./src-tauri/build.rs)
│   └── [tauri.conf.json](./src-tauri/tauri.conf.json)
├── [AGENTS.md](./AGENTS.md)
├── [Dockerfile](./Dockerfile)
├── [LICENSE](./LICENSE)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
├── [docker-compose.yaml](./docker-compose.yaml)
├── [eslint.config.mts](./eslint.config.mts)
├── [jest.config.ts](./jest.config.ts)
├── [jest.setup.ts](./jest.setup.ts)
├── [next.config.ts](./next.config.ts)
├── [package.json](./package.json)
├── [playwright.config.ts](./playwright.config.ts)
├── [postcss.config.mjs](./postcss.config.mjs)
└── [tsconfig.json](./tsconfig.json)
```

91 directories, 289 files
