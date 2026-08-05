'use client';

import type { FC } from 'react';
import { FiClock, FiImage } from 'react-icons/fi';
import { AnnotatorCanvas } from '@/components/organisms/AnnotatorCanvas';
import { ViewerSidebar } from '@/components/organisms/ViewerSidebar';
import { ToolPalette } from '@/components/molecules/ToolPalette';
import { ImageToolbar } from '@/components/molecules/ImageToolbar';
import { SliceNavigator } from '@/components/molecules/SliceNavigator';
import { EmptyState } from '@/components/molecules/EmptyState';
import { ReportModal } from '@/components/molecules/ReportModal';
import { HistoryModal } from '@/components/molecules/HistoryModal';
import { Minimap } from '@/components/molecules/Minimap';
import { ComparePane } from '@/components/molecules/ComparePane';
import { GuideControls } from '@/components/molecules/GuideControls';
import { CompareControls } from '@/components/molecules/CompareControls';
import { Button } from '@/components/atoms/Button';
import { centerView } from '@/lib/geometry/viewport';
import type { ViewerTemplateProps } from '@/components/templates/ViewerTemplateProps';

export const ViewerTemplate: FC<ViewerTemplateProps> = ({
  raster,
  name,
  channels,
  planes,
  analyses,
  transform,
  size,
  onOpenDemo,
  onSetSize,
  onFitView,
  onZoomIn,
  onZoomOut,
  onRotateCW,
  onRotateCCW,
  onFlipX,
  onFlipY,
  onTransformChange,
  onToggleChannel,
  onSetChannelOpacity,
  onSetChannelSourcePlane,
  onAddChannel,
  calibration,
  onCalibrationChange,
  onSaveProject,
  layers,
  activeLayer,
  tool,
  onToolChange,
  onAddLayer,
  onRemoveLayer,
  onExportRoiZip,
  onExportGeoJson,
  onExportAnnotationsCsv,
  onExportSvg,
  onExportWebViewer,
  onToggleLayerVisibility,
  onSetLayerColor,
  onSetActiveLayer,
  onAddAnnotation,
  onRemoveAnnotations,
  onUndo,
  onRedo,
  snapEnabled,
  gridVisible,
  onToggleSnap,
  onToggleGrid,
  compareRaster,
  compareMode,
  compareDivider,
  onCompareModeChange,
  onCompareDividerChange,
  onLoadCompareFiles,
  onClearCompare,
  analysisStatus,
  analysisProgress,
  analysisError,
  k,
  analysisResult,
  batchResult,
  presets,
  onApplyPreset,
  onSavePreset,
  onDeletePreset,
  densityOverlay,
  showDensity,
  densityRadius,
  onToggleDensity,
  onDensityRadiusChange,
  onSetK,
  onRunSingle,
  onBatchFiles,
  onExportCsv,
  onExportJson,
  onExportRegionsCsv,
  onExportPng,
  onOpenReport,
  onShareExport,
  onShareReport,
  reportOpen,
  reportTitle,
  reportHtml,
  onCloseReport,
  stackSliceCount,
  stackIndex,
  onStackIndexChange,
  onAnalyzeStack,
  historyOpen,
  onOpenHistory,
  onCloseHistory,
  historySnapshots,
  onHistoryCommit,
  onHistoryRestore,
  onHistoryRemove,
}) => {
  const canvasProps = {
    raster,
    transform,
    layers,
    activeLayer,
    tool,
    calibration,
    densityOverlay,
    snapEnabled,
    gridVisible,
    onTransformChange,
    onSizeChange: onSetSize,
    onAddAnnotation,
    onRemoveAnnotations,
  };

  const navigateTo = (imageX: number, imageY: number): void => {
    onTransformChange(
      centerView(imageX, imageY, transform.scale, size.width, size.height)
    );
  };

  const minimap =
    raster && compareMode !== 'side' ? (
      <Minimap
        raster={raster}
        imageWidth={raster.width}
        imageHeight={raster.height}
        transform={transform}
        size={size}
        onNavigate={navigateTo}
      />
    ) : null;

  return (
    <div className="flex h-screen flex-col">
      <header className="border-base-300 bg-base-200 z-10 flex flex-wrap items-center gap-4 border-b px-4 py-3">
        <h2 className="min-w-24 flex-1 truncate text-lg">
          {name ?? 'No image loaded'}
        </h2>
        <ToolPalette tool={tool} onToolChange={onToolChange} />
        <GuideControls
          snapEnabled={snapEnabled}
          gridVisible={gridVisible}
          onToggleSnap={onToggleSnap}
          onToggleGrid={onToggleGrid}
        />
        <CompareControls
          compareRaster={compareRaster}
          mode={compareMode}
          onModeChange={onCompareModeChange}
          onLoadFiles={onLoadCompareFiles}
          onClear={onClearCompare}
        />
        <ImageToolbar
          zoom={transform.scale}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onFit={onFitView}
          onRotateCW={onRotateCW}
          onRotateCCW={onRotateCCW}
          onFlipX={onFlipX}
          onFlipY={onFlipY}
        />
        <Button
          variant="outline"
          size="sm"
          disabled={!raster}
          aria-label="Save project"
          onClick={onSaveProject}>
          Save project
        </Button>
        <Button
          variant="outline"
          size="sm"
          aria-label="Open version history"
          onClick={onOpenHistory}>
          <FiClock />
          History
        </Button>
      </header>

      {stackSliceCount > 1 ? (
        <SliceNavigator
          index={stackIndex}
          count={stackSliceCount}
          onIndexChange={onStackIndexChange}
          onAnalyzeStack={onAnalyzeStack}
        />
      ) : null}

      <div className="flex min-h-0 flex-1">
        <div className="min-w-0 flex-1">
          {raster ? (
            compareMode === 'side' && compareRaster ? (
              <div className="flex h-full">
                <div className="border-base-300 relative min-w-0 flex-1 border-r">
                  <AnnotatorCanvas {...canvasProps} />
                  {minimap}
                </div>
                <div className="relative min-w-0 flex-1">
                  <ComparePane raster={compareRaster} name="Compare" />
                </div>
              </div>
            ) : (
              <div className="relative min-w-0 flex-1">
                <AnnotatorCanvas
                  {...canvasProps}
                  compareRaster={compareMode === 'swipe' ? compareRaster : null}
                  compareDivider={
                    compareMode === 'swipe' ? compareDivider : null
                  }
                  onCompareDividerChange={onCompareDividerChange}
                />
                {minimap}
              </div>
            )
          ) : (
            <div className="flex h-full items-center justify-center">
              <EmptyState
                icon={<FiImage />}
                title="No image loaded"
                description="Open the demo dataset to explore the viewer."
                action={
                  <Button variant="primary" onClick={onOpenDemo}>
                    Open demo dataset
                  </Button>
                }
              />
            </div>
          )}
        </div>

        <ViewerSidebar
          channels={channels}
          planes={planes}
          channelAnalyses={analyses}
          calibration={calibration}
          onCalibrationChange={onCalibrationChange}
          onToggleChannel={onToggleChannel}
          onSetChannelOpacity={onSetChannelOpacity}
          onSetChannelSourcePlane={onSetChannelSourcePlane}
          onAddChannel={onAddChannel}
          layers={layers}
          activeLayerId={activeLayer?.id ?? ''}
          onSelectLayer={onSetActiveLayer}
          onToggleLayerVisibility={onToggleLayerVisibility}
          onSetLayerColor={onSetLayerColor}
          onAddLayer={onAddLayer}
          onRemoveLayer={onRemoveLayer}
          onExportRoiZip={onExportRoiZip}
          onExportGeoJson={onExportGeoJson}
          onExportAnnotationsCsv={onExportAnnotationsCsv}
          onExportSvg={onExportSvg}
          onExportWebViewer={onExportWebViewer}
          analysisStatus={analysisStatus}
          analysisProgress={analysisProgress}
          analysisError={analysisError}
          k={k}
          analysisResult={analysisResult}
          batchResult={batchResult}
          presets={presets}
          onApplyPreset={onApplyPreset}
          onSavePreset={onSavePreset}
          onDeletePreset={onDeletePreset}
          showDensity={showDensity}
          densityRadius={densityRadius}
          onToggleDensity={onToggleDensity}
          onDensityRadiusChange={onDensityRadiusChange}
          hasRaster={Boolean(raster)}
          onSetK={onSetK}
          onRunSingle={onRunSingle}
          onBatchFiles={onBatchFiles}
          onExportCsv={onExportCsv}
          onExportJson={onExportJson}
          onExportRegionsCsv={onExportRegionsCsv}
          onExportPng={onExportPng}
          onOpenReport={onOpenReport}
          onShareExport={onShareExport}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        Size: {size.width}×{size.height}
      </p>

      {reportOpen ? (
        <ReportModal
          title={reportTitle}
          html={reportHtml}
          onClose={onCloseReport}
          onShare={onShareReport}
        />
      ) : null}

      {historyOpen ? (
        <HistoryModal
          snapshots={historySnapshots}
          canCommit={!!raster}
          onCommit={onHistoryCommit}
          onRestore={onHistoryRestore}
          onRemove={onHistoryRemove}
          onClose={onCloseHistory}
        />
      ) : null}
    </div>
  );
};
