'use client';

import { type FC, useMemo, useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { CATEGORIES, TOOLS, type ImageToolConfig } from '@/data/photo-tools';
import { ImageConvertTool } from '@/components/tools/ImageConvertTool';
import { AiGenerateTool } from '@/components/tools/AiGenerateTool';
import { AiRemoveBgTool } from '@/components/tools/AiRemoveBgTool';
import { AiRemoveObjectTool } from '@/components/tools/AiRemoveObjectTool';
import { AiRemovePersonTool } from '@/components/tools/AiRemovePersonTool';
import { AiRemoveWatermarkTool } from '@/components/tools/AiRemoveWatermarkTool';
import { AiRestoreTool } from '@/components/tools/AiRestoreTool';
import { AiUnblurTool } from '@/components/tools/AiUnblurTool';
import { AiUpscaleTool } from '@/components/tools/AiUpscaleTool';
import { AiColorizeTool } from '@/components/tools/AiColorizeTool';
import { ColorsTool } from '@/components/tools/ColorsTool';
import { ContrastCheckerTool } from '@/components/tools/ContrastCheckerTool';
import { GradientGeneratorTool } from '@/components/tools/GradientGeneratorTool';
import { ImageColorizeTool } from '@/components/tools/ImageColorizeTool';
import { ImageDominantColorTool } from '@/components/tools/ImageDominantColorTool';
import { Base64Tool } from '@/components/tools/Base64Tool';
import { BreakingBadTool } from '@/components/tools/BreakingBadTool';
import { CameraTool } from '@/components/tools/CameraTool';
import { ChartMakerTool } from '@/components/tools/ChartMakerTool';
import { CollageMakerTool } from '@/components/tools/CollageMakerTool';
import { GitHubSocialPreviewTool } from '@/components/tools/GitHubSocialPreviewTool';
import { HouseTool } from '@/components/tools/HouseTool';
import { ImageProfileTool } from '@/components/tools/ImageProfileTool';
import { InstaSizeTool } from '@/components/tools/InstaSizeTool';
import { MemeMakerTool } from '@/components/tools/MemeMakerTool';
import { PixelTool } from '@/components/tools/PixelTool';
import { YouTubeThumbnailsTool } from '@/components/tools/YouTubeThumbnailsTool';
import { ImageBorderTool } from '@/components/tools/ImageBorderTool';
import { ImageBwTool } from '@/components/tools/ImageBwTool';
import { ImageCompressTool } from '@/components/tools/ImageCompressTool';
import { ImageCropTool } from '@/components/tools/ImageCropTool';
import { ImageFlipTool } from '@/components/tools/ImageFlipTool';
import { ImagePixelateTool } from '@/components/tools/ImagePixelateTool';
import { ImageResizeTool } from '@/components/tools/ImageResizeTool';
import { ImageRotateTool } from '@/components/tools/ImageRotateTool';
import { ImageRoundTool } from '@/components/tools/ImageRoundTool';
import { ImageSharpenTool } from '@/components/tools/ImageSharpenTool';
import { ImageSplitTool } from '@/components/tools/ImageSplitTool';
import { ImageAdjustTool } from '@/components/tools/ImageAdjustTool';
import { ImageBlurBackgroundTool } from '@/components/tools/ImageBlurBackgroundTool';
import { ImageCombinerSideBySideTool } from '@/components/tools/ImageCombinerSideBySideTool';
import { ImageCombinerStackedTool } from '@/components/tools/ImageCombinerStackedTool';
import { ImageMorphingTool } from '@/components/tools/ImageMorphingTool';
import { ImagePhotoFiltersTool } from '@/components/tools/ImagePhotoFiltersTool';
import { ImagePixelateFaceTool } from '@/components/tools/ImagePixelateFaceTool';
import { ImageShadowTool } from '@/components/tools/ImageShadowTool';
import { ImageTextTool } from '@/components/tools/ImageTextTool';
import { ImageTransparentBgTool } from '@/components/tools/ImageTransparentBgTool';
import { ImageVignetteTool } from '@/components/tools/ImageVignetteTool';
import { ImageWatermarkTool } from '@/components/tools/ImageWatermarkTool';
import { BarcodeTool } from '@/components/tools/BarcodeTool';
import { BarcodeReadTool } from '@/components/tools/BarcodeReadTool';
import { ImageOcrTool } from '@/components/tools/ImageOcrTool';
import { ImageTranslateTool } from '@/components/tools/ImageTranslateTool';
import { InvoiceParserTool } from '@/components/tools/InvoiceParserTool';
import { QRCodeTool } from '@/components/tools/QRCodeTool';
import { QrReadTool } from '@/components/tools/QrReadTool';

const TOOL_COMPONENTS: Record<string, FC<{ config: ImageToolConfig }>> = {
  'ai-generate': AiGenerateTool,
  'ai-remove-bg': AiRemoveBgTool,
  'ai-remove-object': AiRemoveObjectTool,
  'ai-remove-person': AiRemovePersonTool,
  'ai-remove-watermark': AiRemoveWatermarkTool,
  'ai-restore': AiRestoreTool,
  'ai-unblur': AiUnblurTool,
  'ai-upscale': AiUpscaleTool,
  'ai-colorize': AiColorizeTool,
  colors: ColorsTool,
  'contrast-checker': ContrastCheckerTool,
  'gradient-generator': GradientGeneratorTool,
  'image-colorize': ImageColorizeTool,
  'image-dominant-color': ImageDominantColorTool,
  base64: Base64Tool,
  'breaking-bad': BreakingBadTool,
  camera: CameraTool,
  'chart-maker': ChartMakerTool,
  'collage-maker': CollageMakerTool,
  'github-social-preview': GitHubSocialPreviewTool,
  house: HouseTool,
  'image-profile': ImageProfileTool,
  instasize: InstaSizeTool,
  'meme-maker': MemeMakerTool,
  pixel: PixelTool,
  'youtube-thumbnails': YouTubeThumbnailsTool,
  'image-border': ImageBorderTool,
  'image-bw': ImageBwTool,
  'image-compress': ImageCompressTool,
  'image-crop': ImageCropTool,
  'image-flip': ImageFlipTool,
  'image-pixelate': ImagePixelateTool,
  'image-resize': ImageResizeTool,
  'image-rotate': ImageRotateTool,
  'image-round': ImageRoundTool,
  'image-sharpen': ImageSharpenTool,
  'image-split': ImageSplitTool,
  'image-adjust': ImageAdjustTool,
  'image-blur-background': ImageBlurBackgroundTool,
  'image-combiner-side-by-side': ImageCombinerSideBySideTool,
  'image-combiner-stacked': ImageCombinerStackedTool,
  'image-morphing': ImageMorphingTool,
  'image-photo-filters': ImagePhotoFiltersTool,
  'image-pixelate-face': ImagePixelateFaceTool,
  'image-shadow': ImageShadowTool,
  'image-text': ImageTextTool,
  'image-transparent-bg': ImageTransparentBgTool,
  'image-vignette': ImageVignetteTool,
  'image-watermark': ImageWatermarkTool,
  barcode: BarcodeTool,
  'barcode-read': BarcodeReadTool,
  'image-ocr': ImageOcrTool,
  'image-translate': ImageTranslateTool,
  'invoice-parser': InvoiceParserTool,
  qr: QRCodeTool,
  'qr-read': QrReadTool,
};

const getToolComponent = (id: string): FC<{ config: ImageToolConfig }> => {
  const tool = TOOLS.find((t) => t.id === id);
  if (!tool) return ImageConvertTool;
  if (TOOL_COMPONENTS[id]) return TOOL_COMPONENTS[id];
  if (tool.category === 'convert') return ImageConvertTool;
  return ImageConvertTool;
};

const CATEGORY_TOOLS: Record<string, string[]> = {};
for (const t of TOOLS) {
  (CATEGORY_TOOLS[t.category] ??= []).push(t.id);
}

const toolCategoryMap: Record<string, string> = {};
for (const [cat, ids] of Object.entries(CATEGORY_TOOLS)) {
  for (const id of ids) {
    toolCategoryMap[id] = cat;
  }
}

const ToolsPage: FC = () => {
  const [activeTool, setActiveTool] = useState<ImageToolConfig | null>(null);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CATEGORIES.map((c) => [c.key, false]))
  );

  const filteredByQuery = useMemo(
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
    const map: Record<string, ImageToolConfig[]> = {};
    for (const t of filteredByQuery) {
      const cat = toolCategoryMap[t.id] ?? 'misc';
      (map[cat] ??= []).push(t);
    }
    return map;
  }, [filteredByQuery]);

  const ToolComponent = activeTool ? getToolComponent(activeTool.id) : null;

  return (
    <div className="flex h-screen flex-col">
      <header className="border-base-300 flex items-center gap-4 border-b px-4 py-3">
        <Link
          href="/"
          className="btn btn-ghost btn-sm btn-circle"
          aria-label="Back to library">
          <FiArrowLeft className="size-4" />
        </Link>
        <h1 className="text-base-content text-lg font-bold">
          {activeTool ? activeTool.title : 'Image Tools'}
        </h1>
      </header>
      <div className="flex flex-1 flex-row-reverse overflow-hidden">
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
                      setExpanded((prev) => ({
                        ...prev,
                        [cat.key]: !prev[cat.key],
                      }))
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
                          className={`hover:bg-base-200 flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-xs transition-colors ${
                            activeTool?.id === tool.id
                              ? 'bg-primary/10 text-primary font-medium'
                              : ''
                          }`}
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
        <div className="flex flex-1 flex-col overflow-y-auto p-8">
          {activeTool && ToolComponent ? (
            <ToolComponent config={activeTool} />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-base-content/30 text-sm">
                Select an image tool from the sidebar
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
