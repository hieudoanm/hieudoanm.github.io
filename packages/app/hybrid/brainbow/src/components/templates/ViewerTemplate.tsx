'use client';

import type { FC } from 'react';
import { FiArrowLeft, FiImage } from 'react-icons/fi';
import Link from 'next/link';
import { AnnotatorCanvas } from '@/components/organisms/AnnotatorCanvas';
import { ViewerSidebar } from '@/components/organisms/ViewerSidebar';
import { ToolPalette } from '@/components/molecules/ToolPalette';
import { ImageToolbar } from '@/components/molecules/ImageToolbar';
import { EmptyState } from '@/components/molecules/EmptyState';
import { ReportModal } from '@/components/molecules/ReportModal';
import { Button } from '@/components/atoms/Button';
import type { ViewerTemplateProps } from '@/components/templates/ViewerTemplateProps';

export const ViewerTemplate: FC<ViewerTemplateProps> = ({
  raster,
  name,
  channels,
  analyses,
  transform,
  size,
  onOpenDemo,
  onSetSize,
  onFitView,
  onZoomIn,
  onZoomOut,
  onTransformChange,
  onToggleChannel,
  onSetChannelOpacity,
  onSaveProject,
  layers,
  activeLayer,
  tool,
  onToolChange,
  onAddLayer,
  onRemoveLayer,
  onToggleLayerVisibility,
  onSetLayerColor,
  onSetActiveLayer,
  onAddAnnotation,
  onUndo,
  onRedo,
  analysisStatus,
  analysisProgress,
  analysisError,
  k,
  analysisResult,
  batchResult,
  onSetK,
  onRunSingle,
  onBatchFiles,
  onExportCsv,
  onExportJson,
  onExportPng,
  onOpenReport,
  reportOpen,
  reportTitle,
  reportHtml,
  onCloseReport,
}) => (
  <div className="flex h-screen flex-col">
    <header className="border-base-300 bg-base-200 z-10 flex items-center gap-4 border-b px-4 py-3">
      <Link href="/" aria-label="Back to home">
        <FiArrowLeft className="text-lg" />
      </Link>
      <h2 className="flex-1 truncate text-lg">{name ?? 'No image loaded'}</h2>
      <ToolPalette tool={tool} onToolChange={onToolChange} />
      <ImageToolbar
        zoom={transform.scale}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onFit={onFitView}
      />
      <Button
        variant="outline"
        size="sm"
        disabled={!raster}
        aria-label="Save project"
        onClick={onSaveProject}>
        Save project
      </Button>
    </header>

    <div className="flex min-h-0 flex-1">
      <div className="min-w-0 flex-1">
        {raster ? (
          <AnnotatorCanvas
            raster={raster}
            transform={transform}
            layers={layers}
            activeLayer={activeLayer}
            tool={tool}
            onTransformChange={onTransformChange}
            onSizeChange={onSetSize}
            onAddAnnotation={onAddAnnotation}
          />
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
        channelAnalyses={analyses}
        onToggleChannel={onToggleChannel}
        onSetChannelOpacity={onSetChannelOpacity}
        layers={layers}
        activeLayerId={activeLayer?.id ?? ''}
        onSelectLayer={onSetActiveLayer}
        onToggleLayerVisibility={onToggleLayerVisibility}
        onSetLayerColor={onSetLayerColor}
        onAddLayer={onAddLayer}
        onRemoveLayer={onRemoveLayer}
        analysisStatus={analysisStatus}
        analysisProgress={analysisProgress}
        analysisError={analysisError}
        k={k}
        analysisResult={analysisResult}
        batchResult={batchResult}
        hasRaster={Boolean(raster)}
        onSetK={onSetK}
        onRunSingle={onRunSingle}
        onBatchFiles={onBatchFiles}
        onExportCsv={onExportCsv}
        onExportJson={onExportJson}
        onExportPng={onExportPng}
        onOpenReport={onOpenReport}
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
      />
    ) : null}
  </div>
);
