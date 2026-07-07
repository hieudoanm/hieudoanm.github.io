'use client';

import { FC, useMemo, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import {
  CATEGORIES,
  TOOLS,
  type VideoToolConfig,
  popPreselectedVideoTool,
} from './config';
import { VideoConvertTool } from './tools/VideoConvertTool';
import { VideoTrimTool } from './tools/VideoTrimTool';
import { VideoMergeTool } from './tools/VideoMergeTool';
import { VideoCropTool } from './tools/VideoCropTool';
import { VideoSpeedTool } from './tools/VideoSpeedTool';
import { VideoCompressTool } from './tools/VideoCompressTool';
import { VideoMuteTool } from './tools/VideoMuteTool';
import { VideoResizeTool } from './tools/VideoResizeTool';
import { VideoStabilizeTool } from './tools/VideoStabilizeTool';
import { VideoExtractAudioTool } from './tools/VideoExtractAudioTool';
import { VideoExtractFramesTool } from './tools/VideoExtractFramesTool';
import { AudioTranscribeTool } from './tools/AudioTranscribeTool';
import { GenerateSubtitleTool } from './tools/GenerateSubtitleTool';
import { VideoDownloadTool } from './tools/VideoDownloadTool';

const TOOL_COMPONENTS: Record<string, FC<{ config: VideoToolConfig }>> = {
  'video-compress': VideoCompressTool,
  'video-crop': VideoCropTool,
  'video-extract-audio': VideoExtractAudioTool,
  'video-extract-frames': VideoExtractFramesTool,
  'video-merge': VideoMergeTool,
  'video-mute': VideoMuteTool,
  'video-resize': VideoResizeTool,
  'video-speed': VideoSpeedTool,
  'video-stabilize': VideoStabilizeTool,
  'video-trim': VideoTrimTool,
  'audio-transcribe': AudioTranscribeTool,
  'generate-subtitle': GenerateSubtitleTool,
};

const getToolComponent = (id: string): FC<{ config: VideoToolConfig }> => {
  const tool = TOOLS.find((t) => t.id === id);
  if (!tool) return VideoConvertTool;
  if (TOOL_COMPONENTS[id]) return TOOL_COMPONENTS[id];
  if (tool.category === 'convert') return VideoConvertTool;
  if (tool.category === 'download') return VideoDownloadTool;
  return VideoConvertTool;
};

export const VideoModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTool, setActiveTool] = useState<VideoToolConfig | null>(() => {
    const id = popPreselectedVideoTool();
    return TOOLS.find((t) => t.id === id) ?? null;
  });
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CATEGORIES.map((c) => [c.key, true]))
  );

  const filtered = useMemo(
    () =>
      !query.trim()
        ? TOOLS
        : TOOLS.filter(
            (t) =>
              t.title.toLowerCase().includes(query.toLowerCase()) ||
              t.description.toLowerCase().includes(query.toLowerCase())
          ),
    [query]
  );

  const grouped = useMemo(() => {
    const map: Record<string, VideoToolConfig[]> = {};
    for (const t of filtered) {
      (map[t.category] ??= []).push(t);
    }
    return map;
  }, [filtered]);

  const ToolComponent = activeTool ? getToolComponent(activeTool.id) : null;

  return (
    <FullScreen onClose={onClose} title={activeTool?.title ?? 'Video'}>
      <div className="-m-8 flex h-[calc(100%+4rem)] flex-row-reverse">
        <aside className="border-base-300 flex w-56 shrink-0 flex-col border-l bg-inherit">
          <div className="border-base-300 border-b p-3">
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              placeholder="Search tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-2">
            {CATEGORIES.map((cat) => {
              const tools = grouped[cat.key];
              if (!tools || tools.length === 0) return null;
              const isExpanded = query.trim().length > 0 || expanded[cat.key];
              return (
                <div key={cat.key}>
                  <button
                    className="hover:bg-base-200 flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium"
                    onClick={() =>
                      setExpanded((p) => ({ ...p, [cat.key]: !p[cat.key] }))
                    }>
                    <span className="text-lg">{cat.emoji}</span>
                    <span className="flex-1">{cat.label}</span>
                    <span className="text-base-content/30 text-xs">
                      {isExpanded ? '▾' : '▸'}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="ml-2 space-y-0.5">
                      {tools.map((tool) => (
                        <button
                          key={tool.id}
                          className={`hover:bg-base-200 flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-xs transition-colors ${activeTool?.id === tool.id ? 'bg-primary/10 text-primary font-medium' : ''}`}
                          onClick={() => setActiveTool(tool)}>
                          <span>{tool.emoji}</span>
                          <span>{tool.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>
        <div className="flex flex-1 flex-col overflow-y-auto">
          {activeTool && ToolComponent ? (
            <ToolComponent config={activeTool} />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-base-content/30 text-sm">
                Select a video tool
              </p>
            </div>
          )}
        </div>
      </div>
    </FullScreen>
  );
};
VideoModal.displayName = 'VideoModal';
