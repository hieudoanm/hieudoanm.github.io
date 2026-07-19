import { useEffect, type FC } from 'react';

import { useChessBoard } from './hooks/useChessBoard';
import { useEcoData } from './hooks/useEcoData';
import { Header } from './components/Header';
import { BoardSection } from './components/BoardSection';
import { PositionPanel } from './components/PositionPanel';
import { EnginePanel } from './components/EnginePanel';
import { ExportPanel } from './components/ExportPanel';
import { EcoPanel } from './components/EcoPanel';
import { SetupPanel } from './components/SetupPanel';
import type { SidePanel } from './types';

const sidePanelTabs: { key: SidePanel; label: string }[] = [
  { key: 'position', label: 'Position' },
  { key: 'engine', label: 'Engine' },
  { key: 'export', label: 'Export' },
  { key: 'openings', label: 'Openings' },
  { key: 'setup', label: 'Setup' },
];

export const ChessBoard: FC<{ onClose: () => void }> = ({ onClose }) => {
  const board = useChessBoard();
  const eco = useEcoData();

  useEffect(() => {
    if (board.panel !== 'openings') return;
    board.dispatch({ type: 'SET_FEN', fen: eco.ecoFen() });
  }, [eco.cursor, eco.ecoOpening?.pgn, board.panel]);

  const displayFen = board.setupMode
    ? board.setupFen
    : board.panel === 'openings'
      ? eco.ecoFen()
      : board.fen;

  return (
    <div className="bg-base-200 flex min-h-0 w-full flex-1 items-start justify-center overflow-y-auto p-4 py-4 md:p-8">
      <div className="flex w-full max-w-4xl flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex flex-1 flex-col gap-4">
          <Header
            positionId={board.positionId}
            panel={board.panel}
            boardMode={board.boardMode}
            ecoOpening={eco.ecoOpening}
            flipped={board.flipped}
            showNotation={board.showNotation}
            theme={board.theme}
            pieceSet={board.pieceSet}
            on960IdChange={board.handle960IdChange}
            onRandomize={board.randomize960}
            onReset={board.resetToStart}
            onModeSwitch={board.switchBoardMode}
            onFlip={() => board.setFlipped(!board.flipped)}
            onToggleNotation={board.toggleNotation}
            onThemeChange={board.handleThemeChange}
            onPieceSetChange={board.handlePieceSetChange}
            onCopyLink={board.copyShareLink}
          />
          <BoardSection
            boardRef={board.boardRef}
            displayFen={displayFen}
            panel={board.panel}
            boardMode={board.boardMode}
            setupMode={board.setupMode}
            keyboardBuffer={board.keyboardBuffer}
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
            board={{
              flipped: board.flipped,
              theme: board.theme,
              pieceSet: board.pieceSet,
              showNotation: board.showNotation,
            }}
            selection={{
              selectedSquare: board.selectedSquare,
              legalTargets: board.legalTargets,
              onSquareClick: board.onSquareClick,
            }}
            history={{
              moves: board.moves,
              cursor: board.cursor,
              onUndo: board.undo,
              onRedo: board.redo,
              onJumpTo: board.jumpTo,
            }}
          />
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-72">
          <div className="grid grid-cols-5 gap-1">
            {sidePanelTabs.map(({ key, label }) => (
              <button
                key={key}
                className={`btn btn-xs ${board.panel === key ? 'btn-primary' : 'btn-ghost'}`}
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
              depth={board.depth}
              side={board.side}
              odds={board.odds}
              lines={board.lines}
              linesBusy={board.linesBusy}
              graphPoints={board.graphPoints}
              graphBusy={board.graphBusy}
              onModeSwitch={board.switchBoardMode}
              onDepthChange={board.handleDepthChange}
              onSideChange={board.handleSideChange}
              onOddsChange={board.handleOddsChange}
              onAnalyzeLines={board.analyzeLines}
              onComputeGraph={board.computeGraph}
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
          {board.panel === 'setup' && (
            <SetupPanel
              setupMode={board.setupMode}
              setupFen={board.setupFen}
              setupPalette={board.setupPalette}
              onStart={board.setup.startSetup}
              onApply={board.setup.applySetup}
              onCancel={board.setup.cancelSetup}
              onClear={board.setup.clearBoard}
              onPaletteChange={board.setup.setPalette}
              onSetupFenChange={board.setup.setSetupFen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

ChessBoard.displayName = 'ChessBoard';
