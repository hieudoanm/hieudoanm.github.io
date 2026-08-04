'use client';

import type { FC } from 'react';
import { FiArrowLeft, FiImage } from 'react-icons/fi';
import Link from 'next/link';
import { ViewerCanvas } from '@/components/organisms/ViewerCanvas';
import { ChannelList } from '@/components/organisms/ChannelList';
import { ImageToolbar } from '@/components/molecules/ImageToolbar';
import { EmptyState } from '@/components/molecules/EmptyState';
import { Button } from '@/components/atoms/Button';
import type { ChannelState, ImageRaster, ViewTransform } from '@/types/image';
import type { ViewerSize } from '@/hooks/useImageViewer';

export interface ViewerTemplateProps {
  raster: ImageRaster | null;
  name: string | null;
  channels: ChannelState[];
  transform: ViewTransform;
  size: ViewerSize;
  onOpenDemo: () => void;
  onSetSize: (size: ViewerSize) => void;
  onFitView: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onTransformChange: (transform: ViewTransform) => void;
  onToggleChannel: (id: string, visible: boolean) => void;
  onSetChannelOpacity: (id: string, opacity: number) => void;
}

export const ViewerTemplate: FC<ViewerTemplateProps> = ({
  raster,
  name,
  channels,
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
}) => (
  <div className="flex h-screen flex-col">
    <header className="border-base-300 bg-base-200 z-10 flex items-center gap-4 border-b px-4 py-3">
      <Link href="/" aria-label="Back to home">
        <FiArrowLeft className="text-lg" />
      </Link>
      <h2 className="flex-1 truncate text-lg">{name ?? 'No image loaded'}</h2>
      <ImageToolbar
        zoom={transform.scale}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onFit={onFitView}
      />
    </header>

    <div className="flex min-h-0 flex-1">
      <div className="min-w-0 flex-1">
        {raster ? (
          <ViewerCanvas
            raster={raster}
            transform={transform}
            onTransformChange={onTransformChange}
            onSizeChange={onSetSize}
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

      <aside className="border-base-300 bg-base-200 w-72 overflow-y-auto border-l p-4">
        <h3 className="mb-3">Channels</h3>
        {raster ? (
          <ChannelList
            channels={channels}
            onToggle={onToggleChannel}
            onOpacityChange={onSetChannelOpacity}
          />
        ) : (
          <p className="text-base-content/60 text-sm">
            Load an image to adjust channels.
          </p>
        )}
        <p className="text-base-content/50 mt-4 text-xs">
          Size: {size.width}×{size.height} — drag to pan, scroll to zoom.
        </p>
      </aside>
    </div>
  </div>
);
