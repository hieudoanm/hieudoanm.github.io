import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useChessBoard } from '@hieudoanm.github.io/components/pages/app/chess/board/hooks/useChessBoard';
import { useEcoData } from '@hieudoanm.github.io/components/pages/app/chess/board/hooks/useEcoData';
import { Header } from '@hieudoanm.github.io/components/pages/app/chess/board/components/Header';
import { BoardSection } from '@hieudoanm.github.io/components/pages/app/chess/board/components/BoardSection';
import { PositionPanel } from '@hieudoanm.github.io/components/pages/app/chess/board/components/PositionPanel';
import { EnginePanel } from '@hieudoanm.github.io/components/pages/app/chess/board/components/EnginePanel';
import { ExportPanel } from '@hieudoanm.github.io/components/pages/app/chess/board/components/ExportPanel';
import { EcoPanel } from '@hieudoanm.github.io/components/pages/app/chess/board/components/EcoPanel';
import type { SidePanel } from '@hieudoanm.github.io/components/pages/app/chess/board/types';

const sidePanelTabs: { key: SidePanel; label: string }[] = [
  { key: 'position', label: 'Position' },
  { key: 'engine', label: 'Engine' },
  { key: 'export', label: 'Export' },
  { key: 'openings', label: 'Openings' },
];

const ChessWorkbenchPage: NextPage = () => {
  const board = useChessBoard();
  const eco = useEcoData();

  useEffect(() => {
    if (board.panel !== 'openings') return;
    board.dispatch({ type: 'SET_FEN', fen: eco.ecoFen() });
  }, [eco.cursor, eco.ecoOpening?.pgn, board.panel]);

  const displayFen = board.panel === 'openings' ? eco.ecoFen() : board.fen;

  return (
    <div className="bg-base-200 flex min-h-screen w-screen items-start justify-center p-4 py-8 md:p-8">
      <div className="flex w-full max-w-4xl flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex flex-1 flex-col gap-4">
          <Header
            positionId={board.positionId}
            panel={board.panel}
            boardMode={board.boardMode}
            ecoOpening={eco.ecoOpening}
            on960IdChange={board.handle960IdChange}
            onRandomize={board.randomize960}
            onReset={board.resetToStart}
            onModeSwitch={board.switchBoardMode}
          />
          <BoardSection
            boardRef={board.boardRef}
            displayFen={displayFen}
            panel={board.panel}
            boardMode={board.boardMode}
            evalPercent={board.evalPercent}
            evalLabel={board.evalLabel}
            statusLabel={board.statusLabel}
            ecoCursor={eco.cursor}
            ecoTotal={eco.total}
            ecoMoves={eco.moves}
            onPieceDrop={board.onPieceDrop}
            canDragPiece={board.canDragPiece}
            onEcoCursorChange={eco.setCursor}
            onEcoPrev={eco.prev}
            onEcoNext={eco.next}
            onEcoStart={eco.start}
            onEcoEnd={eco.end}
          />
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-72">
          <div className="grid grid-cols-4 gap-1">
            {sidePanelTabs.map(({ key, label }) => (
              <button
                key={key}
                className={`btn btn-xs ${
                  board.panel === key ? 'btn-primary' : 'btn-ghost'
                }`}
                onClick={() =>
                  board.dispatch({ type: 'SET_PANEL', panel: key })
                }>
                {label}
              </button>
            ))}
          </div>
          {board.panel === 'position' && (
            <PositionPanel
              fen={board.fen}
              pgn={board.pgn}
              onFENChange={board.handleFENChange}
              onPGNChange={board.handlePGNChange}
              onReset={board.resetToStart}
              onRandomize={board.randomize960}
            />
          )}
          {board.panel === 'engine' && (
            <EnginePanel
              boardMode={board.boardMode}
              whiteEval={board.whiteEval}
              evalPercent={board.evalPercent}
              statusLabel={board.statusLabel}
              onModeSwitch={board.switchBoardMode}
            />
          )}
          {board.panel === 'export' && (
            <ExportPanel
              pgn={board.pgn}
              gifLoading={board.gifLoading}
              onExportPNG={board.exportPNG}
              onExportGIF={board.exportGIF}
            />
          )}
          {board.panel === 'openings' && (
            <EcoPanel
              group={eco.group}
              subgroup={eco.subgroup}
              ecoIndex={eco.ecoIndex}
              ecoList={eco.ecoList}
              ecoOpening={eco.ecoOpening}
              onGroupChange={eco.handleGroupChange}
              onSubgroupChange={eco.handleSubgroupChange}
              onOpeningChange={eco.handleOpeningChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChessWorkbenchPage;
