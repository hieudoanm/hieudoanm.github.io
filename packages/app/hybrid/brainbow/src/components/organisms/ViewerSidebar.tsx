'use client';

import { useRef, useState, type FC } from 'react';
import { ChannelList } from '@/components/organisms/ChannelList';
import { LayerPanel } from '@/components/molecules/LayerPanel';
import { AnalysisPanel } from '@/components/molecules/AnalysisPanel';
import type { AnnotationLayer } from '@/types/annotation';
import type { ChannelState } from '@/types/image';
import type { ChannelAnalysis } from '@/lib/image/histogram';
import type { AnalysisStatus } from '@/hooks/useAnalysis';
import type { ImageAnalysis } from '@/lib/analysis/analyze';
import type { BatchResult } from '@/lib/analysis/batch';

export type ViewerTab = 'channels' | 'layers' | 'analysis';

export interface ViewerSidebarProps {
  channels: ChannelState[];
  channelAnalyses: ChannelAnalysis[] | null;
  onToggleChannel: (id: string, visible: boolean) => void;
  onSetChannelOpacity: (id: string, opacity: number) => void;
  layers: AnnotationLayer[];
  activeLayerId: string;
  onSelectLayer: (id: string) => void;
  onToggleLayerVisibility: (id: string, visible: boolean) => void;
  onSetLayerColor: (id: string, color: string) => void;
  onAddLayer: () => void;
  onRemoveLayer: (id: string) => void;
  analysisStatus: AnalysisStatus;
  analysisProgress: number;
  analysisError: string | null;
  k: number;
  analysisResult: ImageAnalysis | null;
  batchResult: BatchResult | null;
  hasRaster: boolean;
  onSetK: (k: number) => void;
  onRunSingle: () => void;
  onBatchFiles: (files: File[]) => void;
  onExportCsv: () => void;
  onExportJson: () => void;
  onExportPng: () => void;
  onOpenReport: () => void;
}

const TABS: { id: ViewerTab; label: string }[] = [
  { id: 'channels', label: 'Channels' },
  { id: 'layers', label: 'Layers' },
  { id: 'analysis', label: 'Analysis' },
];

export const ViewerSidebar: FC<ViewerSidebarProps> = ({
  channels,
  channelAnalyses,
  onToggleChannel,
  onSetChannelOpacity,
  layers,
  activeLayerId,
  onSelectLayer,
  onToggleLayerVisibility,
  onSetLayerColor,
  onAddLayer,
  onRemoveLayer,
  analysisStatus,
  analysisProgress,
  analysisError,
  k,
  analysisResult,
  batchResult,
  hasRaster,
  onSetK,
  onRunSingle,
  onBatchFiles,
  onExportCsv,
  onExportJson,
  onExportPng,
  onOpenReport,
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
          <ChannelList
            channels={channels}
            analyses={channelAnalyses}
            onToggle={onToggleChannel}
            onOpacityChange={onSetChannelOpacity}
          />
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
            hasRaster={hasRaster}
            fileInputRef={fileInputRef}
            onSetK={onSetK}
            onRunSingle={onRunSingle}
            onBatchFiles={onBatchFiles}
            onExportCsv={onExportCsv}
            onExportJson={onExportJson}
            onExportPng={onExportPng}
            onOpenReport={onOpenReport}
          />
        ) : null}
      </div>
    </aside>
  );
};
