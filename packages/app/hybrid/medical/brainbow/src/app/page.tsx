'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useImageViewer } from '@/hooks/useImageViewer';
import { useAnnotation } from '@/hooks/useAnnotation';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useHistory } from '@/hooks/useHistory';
import { useShortcuts } from '@/hooks/useShortcuts';
import { ViewerTemplate } from '@/components/templates/ViewerTemplate';
import { viewerStore } from '@/lib/store/viewerStore';
import { loadImageFiles } from '@/lib/image/load';
import { compositeChannels } from '@/lib/image/channels';
import { orientChannelRaster } from '@/lib/image/orientation';
import {
  nextOrientation,
  remapAnnotationLayers,
  type OrientationAction,
} from '@/lib/image/orientation';
import {
  base64ToBytes,
  createProject,
  deserializeProject,
  imageToProjectImage,
} from '@/lib/projects/bundle';
import { saveProject } from '@/lib/projects/io';
import { downloadBlob, downloadText } from '@/lib/io/dom';
import { toCsv, annotationsToCsv } from '@/lib/export/csv';
import { flattenAnnotations, rasterToBlob } from '@/lib/export/raster';
import { buildRoiSet } from '@/lib/export/roi';
import { layersToGeoJson } from '@/lib/export/geojson';
import { annotationsToSvg } from '@/lib/export/svg';
import { exportWebViewer } from '@/lib/export/web';
import { buildReportHtml } from '@/lib/analysis/report';
import {
  buildDensityMaps,
  densityOverlay,
  DENSITY_DEFAULT_RADIUS,
} from '@/lib/analysis/density';
import { nativeNotify, readLaunchProject } from '@/lib/native';
import { blobToFile, shareFiles, shareText } from '@/lib/share/share';
import type { ImageAnalysis } from '@/lib/analysis/analyze';
import type { ImageRaster, StackRaster } from '@/types/image';
import type { Project } from '@/types/project';
import type { CompareMode } from '@/types/compare';

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

const regionRows = (
  analyses: ImageAnalysis[]
): Record<string, string | number>[] =>
  analyses.flatMap((analysis, imageIndex) =>
    analysis.regionStats.map((region) => ({
      image: imageIndex + 1,
      cluster: region.cluster + 1,
      region: region.id + 1,
      areaPixels: region.area,
      meanIntensity: Number(region.meanIntensity.toFixed(2)),
      centroidX: Number(region.centroidX.toFixed(2)),
      centroidY: Number(region.centroidY.toFixed(2)),
      minX: region.minX,
      minY: region.minY,
      maxX: region.maxX,
      maxY: region.maxY,
    }))
  );

const ViewerPage = () => {
  const viewer = useImageViewer();
  const annotation = useAnnotation();
  const analysis = useAnalysis();
  const history = useHistory();
  const [report, setReport] = useState<ReportState | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [showDensity, setShowDensity] = useState(false);
  const [densityRadius, setDensityRadius] = useState(DENSITY_DEFAULT_RADIUS);
  const [stack, setStack] = useState<StackRaster | null>(null);
  const [sliceIndex, setSliceIndex] = useState(0);
  const [snapEnabled, setSnapEnabled] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [compareRaster, setCompareRaster] = useState<ImageRaster | null>(null);
  const [compareMode, setCompareMode] = useState<CompareMode>('off');
  const [compareDivider, setCompareDivider] = useState(0.5);
  const rastersRef = useRef<ImageRaster[]>([]);

  const loadSlice = useCallback(
    (index: number) => {
      if (!stack) return;
      const slice = stack.slices[index];
      if (!slice) return;
      viewer.loadChannelRaster(
        { width: stack.width, height: stack.height, planes: slice.planes },
        `${viewer.name ?? 'image'} (slice ${index + 1})`,
        undefined,
        viewer.calibration.pixelsPerMicron ? viewer.calibration : undefined
      );
    },
    [stack, viewer.name, viewer.calibration]
  );

  const loadProjectIntoViewer = useCallback(
    (project: Project) => {
      const image = project.images[0];
      if (!image) return;
      viewer.loadRaster(
        {
          width: image.width,
          height: image.height,
          data: base64ToBytes(image.data),
        },
        project.name,
        project.channels
      );
      viewer.setCalibration(image.calibration ?? { pixelsPerMicron: null });
      annotation.replaceLayers(project.layers);
    },
    [viewer.loadRaster, viewer.setCalibration, annotation.replaceLayers]
  );

  useEffect(() => {
    const transfer = viewerStore.take();
    if (transfer?.project) {
      loadProjectIntoViewer(transfer.project);
    } else if (transfer) {
      viewer.loadChannelRaster(
        transfer.raster,
        transfer.name,
        undefined,
        transfer.calibration ?? undefined
      );
      if (transfer.stack && transfer.stack.slices.length > 1) {
        setStack(transfer.stack);
        setSliceIndex(0);
      }
    } else {
      void readLaunchProject().then((payload) => {
        if (payload) {
          loadProjectIntoViewer(deserializeProject(payload.content));
        } else {
          viewer.openDemo();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onStackIndexChange = useCallback(
    (index: number) => {
      if (!stack) return;
      const next = Math.max(0, Math.min(stack.slices.length - 1, index));
      setSliceIndex(next);
      loadSlice(next);
    },
    [stack, loadSlice]
  );

  const analyzeStack = useCallback(() => {
    if (!stack) return;
    const rasters = stack.slices.map((slice) =>
      compositeChannels(
        orientChannelRaster(
          { width: stack.width, height: stack.height, planes: slice.planes },
          viewer.orientation
        ),
        viewer.channels
      )
    );
    void analysis.analyzeImages(rasters, (batch) => {
      void nativeNotify(
        'Stack analysis complete',
        `Analyzed ${batch.aggregate.imageCount} slices`
      );
    });
  }, [stack, viewer.orientation, viewer.channels, analysis.analyzeImages]);

  const densityMaps = useMemo(() => {
    const result = analysis.result;
    if (!result || !viewer.source) return null;
    return buildDensityMaps(
      result.classified,
      viewer.source.width,
      viewer.source.height,
      result.k,
      densityRadius
    );
  }, [analysis.result, viewer.source, densityRadius]);

  const densityOverlayRaster = useMemo(() => {
    const result = analysis.result;
    if (!result || !densityMaps || !viewer.source) return null;
    return densityOverlay(
      densityMaps,
      result.centers,
      viewer.source.width,
      viewer.source.height
    );
  }, [analysis.result, densityMaps, viewer.source]);

  useShortcuts({
    setTool: annotation.setTool,
    undo: annotation.undo,
    redo: annotation.redo,
    zoomIn: viewer.zoomIn,
    zoomOut: viewer.zoomOut,
    fit: viewer.fitView,
    panBy: (deltaX, deltaY) =>
      viewer.setTransform({
        ...viewer.transform,
        offsetX: viewer.transform.offsetX + deltaX,
        offsetY: viewer.transform.offsetY + deltaY,
      }),
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
      await analysis.analyzeImages(loaded, (batch) => {
        void nativeNotify(
          'Batch analysis complete',
          `Analyzed ${batch.aggregate.imageCount} images`
        );
      });
    },
    [analysis.analyzeImages]
  );

  const onLoadCompareFiles = useCallback(async (files: File[]) => {
    const loaded = await loadImageFiles(files);
    if (loaded.length === 0) return;
    setCompareRaster(loaded[loaded.length - 1]);
    setCompareMode('side');
  }, []);

  const onClearCompare = useCallback(() => {
    setCompareRaster(null);
    setCompareMode('off');
  }, []);

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
    const payload = analysis.result
      ? {
          summary: analysis.result.summary,
          regions: analysis.result.regionStats,
        }
      : analysis.batch;
    if (!payload) return;
    downloadText(
      `${viewer.name ?? 'analysis'}-summary.json`,
      JSON.stringify(payload, null, 2)
    );
  }, [analysis.result, analysis.batch, viewer.name]);

  const exportRegionsCsv = useCallback(() => {
    const analyses = analysis.result
      ? [analysis.result]
      : (analysis.batch?.results ?? []);
    if (analyses.length === 0) return;
    downloadText(
      `${viewer.name ?? 'analysis'}-regions.csv`,
      toCsv(regionRows(analyses)),
      'text/csv'
    );
  }, [analysis.result, analysis.batch, viewer.name]);

  const exportPng = useCallback(() => {
    if (!viewer.source) return;
    const flattened = flattenAnnotations(viewer.source, annotation.layers);
    void rasterToBlob(flattened).then((blob) => {
      downloadBlob(blob, `${viewer.name ?? 'image'}-annotated.png`);
    });
  }, [viewer.source, annotation.layers, viewer.name]);

  const exportRoiZip = useCallback(() => {
    const bytes = buildRoiSet(annotation.layers);
    if (bytes.length === 0) return;
    downloadBlob(
      new Blob([bytes], { type: 'application/zip' }),
      `${viewer.name ?? 'image'}-annotations.zip`
    );
  }, [annotation.layers, viewer.name]);

  const exportGeoJson = useCallback(() => {
    downloadText(
      `${viewer.name ?? 'image'}-annotations.geojson`,
      layersToGeoJson(annotation.layers),
      'application/geo+json'
    );
  }, [annotation.layers, viewer.name]);

  const exportAnnotationsCsv = useCallback(() => {
    downloadText(
      `${viewer.name ?? 'image'}-annotations.csv`,
      annotationsToCsv(annotation.layers),
      'text/csv'
    );
  }, [annotation.layers, viewer.name]);

  const exportSvg = useCallback(() => {
    const source = viewer.source;
    if (!source) return;
    downloadText(
      `${viewer.name ?? 'image'}-figure.svg`,
      annotationsToSvg(
        annotation.layers,
        source.width,
        source.height,
        viewer.calibration.pixelsPerMicron
      ),
      'image/svg+xml'
    );
  }, [annotation.layers, viewer.source, viewer.name, viewer.calibration]);

  const openReport = useCallback(() => {
    const analyses = analysis.result
      ? [analysis.result]
      : (analysis.batch?.results ?? []);
    if (analyses.length === 0) return;
    const title = `${viewer.name ?? 'Brainbow'} analysis report`;
    const html = buildReportHtml(title, analyses, analysis.options);
    setReport({ title, html });
  }, [analysis.result, analysis.batch, analysis.options, viewer.name]);

  const shareReport = useCallback(async () => {
    if (!report) return;
    await shareText(report.title, report.html);
  }, [report]);

  const shareExport = useCallback(async () => {
    const analyses = analysis.result
      ? [analysis.result]
      : (analysis.batch?.results ?? []);
    const files: File[] = [];
    if (analyses.length > 0) {
      files.push(
        blobToFile(
          new Blob([toCsv(summaryRows(analyses))], { type: 'text/csv' }),
          `${viewer.name ?? 'analysis'}-clusters.csv`
        )
      );
    }
    if (viewer.source) {
      const flattened = flattenAnnotations(viewer.source, annotation.layers);
      const blob = await rasterToBlob(flattened);
      files.push(blobToFile(blob, `${viewer.name ?? 'image'}-annotated.png`));
    }
    if (files.length === 0) return;
    const title = `${viewer.name ?? 'Brainbow'} exports`;
    await shareFiles(title, files);
  }, [
    analysis.result,
    analysis.batch,
    viewer.name,
    viewer.source,
    annotation.layers,
  ]);

  const currentProject = useCallback((): Project | null => {
    if (!viewer.source || !viewer.name) return null;
    return createProject(
      viewer.name,
      [
        imageToProjectImage(
          viewer.source,
          viewer.name,
          viewer.calibration.pixelsPerMicron ? viewer.calibration : null
        ),
      ],
      viewer.channels,
      annotation.layers
    );
  }, [
    viewer.source,
    viewer.name,
    viewer.channels,
    viewer.calibration,
    annotation.layers,
  ]);

  const onSaveProject = useCallback(async () => {
    const project = currentProject();
    if (!project) return;
    await saveProject(project);
  }, [currentProject]);

  const onExportWebViewer = useCallback(() => {
    const project = currentProject();
    if (!project) return;
    const baseName = viewer.name?.replace(/\W+/g, '-') ?? 'brainbow';
    downloadText(
      `${baseName}-viewer.html`,
      exportWebViewer(project),
      'text/html'
    );
  }, [currentProject, viewer.name]);

  const onHistoryCommit = useCallback(
    (message: string) => {
      const project = currentProject();
      if (!project) return;
      history.commit(project, message);
    },
    [currentProject, history.commit]
  );

  const onHistoryRestore = useCallback(
    (id: string) => {
      const snapshot = history.restore(id);
      if (!snapshot) return;
      loadProjectIntoViewer(snapshot.project);
      setHistoryOpen(false);
    },
    [history.restore, loadProjectIntoViewer]
  );

  const onHistoryRemove = useCallback(
    (id: string) => history.remove(id),
    [history.remove]
  );

  const applyOrientation = useCallback(
    (action: OrientationAction) => {
      const next = nextOrientation(viewer.orientation, action);
      if (viewer.baseWidth > 0 && viewer.baseHeight > 0) {
        const remapped = remapAnnotationLayers(
          annotation.layers,
          viewer.orientation,
          next,
          viewer.baseWidth,
          viewer.baseHeight
        );
        annotation.replaceLayers(remapped);
      }
      viewer.setOrientation(next);
    },
    [
      viewer.orientation,
      viewer.baseWidth,
      viewer.baseHeight,
      viewer.setOrientation,
      annotation.layers,
      annotation.replaceLayers,
    ]
  );

  const onRotateCW = useCallback(
    () => applyOrientation('rotateCW'),
    [applyOrientation]
  );
  const onRotateCCW = useCallback(
    () => applyOrientation('rotateCCW'),
    [applyOrientation]
  );
  const onFlipX = useCallback(
    () => applyOrientation('flipX'),
    [applyOrientation]
  );
  const onFlipY = useCallback(
    () => applyOrientation('flipY'),
    [applyOrientation]
  );

  return (
    <ViewerTemplate
      raster={viewer.raster}
      name={viewer.name}
      channels={viewer.channels}
      planes={viewer.planes}
      analyses={viewer.analyses}
      transform={viewer.transform}
      size={viewer.size}
      onOpenDemo={viewer.openDemo}
      onSetSize={viewer.setSize}
      onFitView={viewer.fitView}
      onZoomIn={viewer.zoomIn}
      onZoomOut={viewer.zoomOut}
      onRotateCW={onRotateCW}
      onRotateCCW={onRotateCCW}
      onFlipX={onFlipX}
      onFlipY={onFlipY}
      onTransformChange={viewer.setTransform}
      onToggleChannel={viewer.toggleChannel}
      onSetChannelOpacity={viewer.setChannelOpacity}
      onSetChannelSourcePlane={viewer.setChannelSourcePlane}
      onAddChannel={viewer.addChannel}
      calibration={viewer.calibration}
      onCalibrationChange={viewer.setCalibration}
      onSaveProject={onSaveProject}
      layers={annotation.layers}
      activeLayer={annotation.activeLayer}
      tool={annotation.tool}
      canUndo={annotation.canUndo}
      canRedo={annotation.canRedo}
      onToolChange={annotation.setTool}
      onAddLayer={annotation.addLayer}
      onRemoveLayer={annotation.removeLayer}
      onExportRoiZip={exportRoiZip}
      onExportGeoJson={exportGeoJson}
      onExportAnnotationsCsv={exportAnnotationsCsv}
      onExportSvg={exportSvg}
      onExportWebViewer={onExportWebViewer}
      onToggleLayerVisibility={annotation.toggleLayerVisibility}
      onSetLayerColor={annotation.setLayerColor}
      onSetActiveLayer={annotation.setActiveLayer}
      onAddAnnotation={annotation.addAnnotation}
      onRemoveAnnotations={annotation.removeAnnotations}
      onUndo={annotation.undo}
      onRedo={annotation.redo}
      snapEnabled={snapEnabled}
      gridVisible={gridVisible}
      onToggleSnap={setSnapEnabled}
      onToggleGrid={setGridVisible}
      compareRaster={compareRaster}
      compareMode={compareMode}
      compareDivider={compareDivider}
      onCompareModeChange={setCompareMode}
      onCompareDividerChange={setCompareDivider}
      onLoadCompareFiles={onLoadCompareFiles}
      onClearCompare={onClearCompare}
      analysisStatus={analysis.status}
      analysisProgress={analysis.progress}
      analysisError={analysis.error}
      k={analysis.k}
      analysisResult={analysis.result}
      batchResult={analysis.batch}
      presets={analysis.presets}
      onApplyPreset={analysis.applyPreset}
      onSavePreset={analysis.saveCurrentPreset}
      onDeletePreset={analysis.deletePreset}
      densityOverlay={densityOverlayRaster}
      showDensity={showDensity}
      densityRadius={densityRadius}
      onToggleDensity={setShowDensity}
      onDensityRadiusChange={setDensityRadius}
      onSetK={analysis.setK}
      onRunSingle={runSingle}
      onBatchFiles={onBatchFiles}
      onExportCsv={exportCsv}
      onExportJson={exportJson}
      onExportRegionsCsv={exportRegionsCsv}
      onExportPng={exportPng}
      onOpenReport={openReport}
      onShareExport={shareExport}
      onShareReport={shareReport}
      reportOpen={report !== null}
      reportTitle={report?.title ?? ''}
      reportHtml={report?.html ?? ''}
      onCloseReport={() => setReport(null)}
      stackSliceCount={stack?.slices.length ?? 0}
      stackIndex={sliceIndex}
      onStackIndexChange={onStackIndexChange}
      onAnalyzeStack={analyzeStack}
      historyOpen={historyOpen}
      onOpenHistory={() => setHistoryOpen(true)}
      onCloseHistory={() => setHistoryOpen(false)}
      historySnapshots={history.snapshots}
      onHistoryCommit={onHistoryCommit}
      onHistoryRestore={onHistoryRestore}
      onHistoryRemove={onHistoryRemove}
    />
  );
};

export default ViewerPage;
