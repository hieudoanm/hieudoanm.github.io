'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useImageViewer } from '@/hooks/useImageViewer';
import { useAnnotation } from '@/hooks/useAnnotation';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useShortcuts } from '@/hooks/useShortcuts';
import { ViewerTemplate } from '@/components/templates/ViewerTemplate';
import { viewerStore } from '@/lib/store/viewerStore';
import { loadImageFiles } from '@/lib/image/load';
import { createProject, imageToProjectImage } from '@/lib/projects/bundle';
import { saveProject } from '@/lib/projects/io';
import { downloadBlob, downloadText } from '@/lib/io/dom';
import { toCsv } from '@/lib/export/csv';
import { flattenAnnotations, rasterToBlob } from '@/lib/export/raster';
import { buildReportHtml } from '@/lib/analysis/report';
import type { ImageAnalysis } from '@/lib/analysis/analyze';
import type { ImageRaster } from '@/types/image';

interface ReportState {
  title: string;
  html: string;
}

const summaryRows = (
  analyses: ImageAnalysis[]
): Record<string, string | number>[] =>
  analyses.flatMap((analysis, imageIndex) =>
    analysis.summary.clusters.map((cluster) => ({
      image: imageIndex + 1,
      cluster: cluster.index + 1,
      pixels: cluster.pixelCount,
      coverage: Number(cluster.areaCoverage.toFixed(4)),
      regions: cluster.regionCount,
    }))
  );

const ViewerPage = () => {
  const viewer = useImageViewer();
  const annotation = useAnnotation();
  const analysis = useAnalysis();
  const [report, setReport] = useState<ReportState | null>(null);
  const rastersRef = useRef<ImageRaster[]>([]);

  useEffect(() => {
    const transfer = viewerStore.take();
    if (transfer) {
      viewer.loadRaster(transfer.raster, transfer.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useShortcuts({
    setTool: annotation.setTool,
    undo: annotation.undo,
    redo: annotation.redo,
    zoomIn: viewer.zoomIn,
    zoomOut: viewer.zoomOut,
    fit: viewer.fitView,
  });

  const importFiles = useCallback(
    async (files: File[]) => {
      const loaded = await loadImageFiles(files);
      if (loaded.length === 0) return;
      rastersRef.current = loaded;
      viewer.loadRaster(
        loaded[loaded.length - 1],
        files[loaded.length - 1].name
      );
    },
    [viewer.loadRaster]
  );

  const onBatchFiles = useCallback(
    async (files: File[]) => {
      const loaded = await loadImageFiles(files);
      if (loaded.length === 0) return;
      rastersRef.current = loaded;
      await analysis.analyzeImages(loaded);
    },
    [analysis.analyzeImages]
  );

  const runSingle = useCallback(() => {
    if (viewer.source) {
      void analysis.analyzeSingle(viewer.source);
    }
  }, [analysis.analyzeSingle, viewer.source]);

  const exportCsv = useCallback(() => {
    const analyses = analysis.result
      ? [analysis.result]
      : (analysis.batch?.results ?? []);
    if (analyses.length === 0) return;
    downloadText(
      `${viewer.name ?? 'analysis'}-clusters.csv`,
      toCsv(summaryRows(analyses)),
      'text/csv'
    );
  }, [analysis.result, analysis.batch, viewer.name]);

  const exportJson = useCallback(() => {
    const payload = analysis.result?.summary ?? analysis.batch;
    if (!payload) return;
    downloadText(
      `${viewer.name ?? 'analysis'}-summary.json`,
      JSON.stringify(payload, null, 2)
    );
  }, [analysis.result, analysis.batch, viewer.name]);

  const exportPng = useCallback(() => {
    if (!viewer.source) return;
    const flattened = flattenAnnotations(viewer.source, annotation.layers);
    void rasterToBlob(flattened).then((blob) => {
      downloadBlob(blob, `${viewer.name ?? 'image'}-annotated.png`);
    });
  }, [viewer.source, annotation.layers, viewer.name]);

  const openReport = useCallback(() => {
    const analyses = analysis.result
      ? [analysis.result]
      : (analysis.batch?.results ?? []);
    if (analyses.length === 0) return;
    const title = `${viewer.name ?? 'Brainbow'} analysis report`;
    const html = buildReportHtml(title, analyses, {
      k: analysis.k,
      iterations: 10,
      stride: 4,
      minRegionSize: 4,
    });
    setReport({ title, html });
  }, [analysis.result, analysis.batch, analysis.k, viewer.name]);

  const onSaveProject = useCallback(async () => {
    if (!viewer.source || !viewer.name) return;
    const project = createProject(
      viewer.name,
      [imageToProjectImage(viewer.source, viewer.name)],
      viewer.channels,
      annotation.layers
    );
    await saveProject(project);
  }, [viewer.source, viewer.name, viewer.channels, annotation.layers]);

  return (
    <ViewerTemplate
      raster={viewer.raster}
      name={viewer.name}
      channels={viewer.channels}
      analyses={viewer.analyses}
      transform={viewer.transform}
      size={viewer.size}
      onOpenDemo={viewer.openDemo}
      onSetSize={viewer.setSize}
      onFitView={viewer.fitView}
      onZoomIn={viewer.zoomIn}
      onZoomOut={viewer.zoomOut}
      onTransformChange={viewer.setTransform}
      onToggleChannel={viewer.toggleChannel}
      onSetChannelOpacity={viewer.setChannelOpacity}
      onSaveProject={onSaveProject}
      layers={annotation.layers}
      activeLayer={annotation.activeLayer}
      tool={annotation.tool}
      canUndo={annotation.canUndo}
      canRedo={annotation.canRedo}
      onToolChange={annotation.setTool}
      onAddLayer={annotation.addLayer}
      onRemoveLayer={annotation.removeLayer}
      onToggleLayerVisibility={annotation.toggleLayerVisibility}
      onSetLayerColor={annotation.setLayerColor}
      onSetActiveLayer={annotation.setActiveLayer}
      onAddAnnotation={annotation.addAnnotation}
      onUndo={annotation.undo}
      onRedo={annotation.redo}
      analysisStatus={analysis.status}
      analysisProgress={analysis.progress}
      analysisError={analysis.error}
      k={analysis.k}
      analysisResult={analysis.result}
      batchResult={analysis.batch}
      onSetK={analysis.setK}
      onRunSingle={runSingle}
      onBatchFiles={onBatchFiles}
      onExportCsv={exportCsv}
      onExportJson={exportJson}
      onExportPng={exportPng}
      onOpenReport={openReport}
      reportOpen={report !== null}
      reportTitle={report?.title ?? ''}
      reportHtml={report?.html ?? ''}
      onCloseReport={() => setReport(null)}
    />
  );
};

export default ViewerPage;
