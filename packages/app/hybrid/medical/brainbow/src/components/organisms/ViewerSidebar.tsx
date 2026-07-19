'use client';

import { useRef, useState, type FC } from 'react';
import { ChannelList } from '@/components/organisms/ChannelList';
import { LayerPanel } from '@/components/molecules/LayerPanel';
import { AnalysisPanel } from '@/components/molecules/AnalysisPanel';
import { CalibrationInput } from '@/components/molecules/CalibrationInput';
import type { AnnotationLayer } from '@/types/annotation';
import type { Calibration, ChannelPlane, ChannelState } from '@/types/image';
import type { ChannelAnalysis } from '@/lib/image/histogram';
import type { AnalysisPreset } from '@/lib/analysis/presets';
import type { AnalysisStatus } from '@/hooks/useAnalysis';
import type { ImageAnalysis } from '@/lib/analysis/analyze';
import type { BatchResult } from '@/lib/analysis/batch';

export type ViewerTab = 'channels' | 'layers' | 'analysis';

export interface ViewerSidebarProps {
  channels: ChannelState[];
  planes: ChannelPlane[];
  channelAnalyses: ChannelAnalysis[] | null;
  calibration: Calibration;
  onCalibrationChange: (calibration: Calibration) => void;
  onToggleChannel: (id: string, visible: boolean) => void;
  onSetChannelOpacity: (id: string, opacity: number) => void;
  onSetChannelSourcePlane: (id: string, sourcePlane: string) => void;
  onAddChannel: () => void;
  layers: AnnotationLayer[];
  activeLayerId: string;
  onSelectLayer: (id: string) => void;
  onToggleLayerVisibility: (id: string, visible: boolean) => void;
  onSetLayerColor: (id: string, color: string) => void;
  onAddLayer: () => void;
  onRemoveLayer: (id: string) => void;
  onExportRoiZip: () => void;
  onExportGeoJson: () => void;
  onExportAnnotationsCsv: () => void;
  onExportSvg: () => void;
  onExportWebViewer: () => void;
  analysisStatus: AnalysisStatus;
  analysisProgress: number;
  analysisError: string | null;
  k: number;
  analysisResult: ImageAnalysis | null;
  batchResult: BatchResult | null;
  presets: AnalysisPreset[];
  onApplyPreset: (preset: AnalysisPreset) => void;
  onSavePreset: (name: string) => void;
  onDeletePreset: (id: string) => void;
  showDensity: boolean;
  densityRadius: number;
  onToggleDensity: (show: boolean) => void;
  onDensityRadiusChange: (radius: number) => void;
  hasRaster: boolean;
  onSetK: (k: number) => void;
  onRunSingle: () => void;
  onBatchFiles: (files: File[]) => void;
  onExportCsv: () => void;
  onExportJson: () => void;
  onExportRegionsCsv: () => void;
  onExportPng: () => void;
  onOpenReport: () => void;
  onShareExport: () => void;
}

const TABS: { id: ViewerTab; label: string }[] = [
  { id: 'channels', label: 'Channels' },
  { id: 'layers', label: 'Layers' },
  { id: 'analysis', label: 'Analysis' },
];

export const ViewerSidebar: FC<ViewerSidebarProps> = ({
  channels,
  planes,
  channelAnalyses,
  calibration,
  onCalibrationChange,
  onToggleChannel,
  onSetChannelOpacity,
  onSetChannelSourcePlane,
  onAddChannel,
  layers,
  activeLayerId,
  onSelectLayer,
  onToggleLayerVisibility,
  onSetLayerColor,
  onAddLayer,
  onRemoveLayer,
  onExportRoiZip,
  onExportGeoJson,
  onExportAnnotationsCsv,
  onExportSvg,
  onExportWebViewer,
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
  showDensity,
  densityRadius,
  onToggleDensity,
  onDensityRadiusChange,
  hasRaster,
  onSetK,
  onRunSingle,
  onBatchFiles,
  onExportCsv,
  onExportJson,
  onExportRegionsCsv,
  onExportPng,
  onOpenReport,
  onShareExport,
}) => {
  const [activeTab, setActiveTab] = useState<ViewerTab>('channels');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <aside
      className="border-base-content/10 bg-base-200 flex h-full w-80 flex-col gap-3 border-l p-3"
      aria-label="Viewer sidebar">
      <div
        role="tablist"
        aria-label="Sidebar sections"
        className="tabs tabs-boxed">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tab tab-sm ${activeTab === tab.id ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'channels' ? (
          <div className="flex flex-col gap-4">
            <CalibrationInput
              value={calibration.pixelsPerMicron}
              onChange={(pixelsPerMicron) =>
                onCalibrationChange({ pixelsPerMicron })
              }
            />
            <ChannelList
              channels={channels}
              planes={planes}
              analyses={channelAnalyses}
              onToggle={onToggleChannel}
              onOpacityChange={onSetChannelOpacity}
              onSourcePlaneChange={onSetChannelSourcePlane}
              onAddChannel={onAddChannel}
            />
          </div>
        ) : null}
        {activeTab === 'layers' ? (
          <LayerPanel
            layers={layers}
            activeLayerId={activeLayerId}
            onSelect={onSelectLayer}
            onToggleVisible={onToggleLayerVisibility}
            onChangeColor={onSetLayerColor}
            onAdd={onAddLayer}
            onRemove={onRemoveLayer}
            onExportRoiZip={onExportRoiZip}
            onExportGeoJson={onExportGeoJson}
            onExportAnnotationsCsv={onExportAnnotationsCsv}
            onExportSvg={onExportSvg}
            onExportWebViewer={onExportWebViewer}
          />
        ) : null}
        {activeTab === 'analysis' ? (
          <AnalysisPanel
            status={analysisStatus}
            progress={analysisProgress}
            error={analysisError}
            k={k}
            result={analysisResult}
            batch={batchResult}
            presets={presets}
            onApplyPreset={onApplyPreset}
            onSavePreset={onSavePreset}
            onDeletePreset={onDeletePreset}
            showDensity={showDensity}
            densityRadius={densityRadius}
            onToggleDensity={onToggleDensity}
            onDensityRadiusChange={onDensityRadiusChange}
            hasRaster={hasRaster}
            fileInputRef={fileInputRef}
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
        ) : null}
      </div>
    </aside>
  );
};
