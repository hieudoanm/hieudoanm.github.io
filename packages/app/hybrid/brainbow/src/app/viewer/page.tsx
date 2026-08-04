'use client';

import { useEffect } from 'react';
import { useImageViewer } from '@/hooks/useImageViewer';
import { ViewerTemplate } from '@/components/templates/ViewerTemplate';
import { viewerStore } from '@/lib/store/viewerStore';

const ViewerPage = () => {
  const viewer = useImageViewer();

  useEffect(() => {
    const transfer = viewerStore.take();
    if (transfer) {
      viewer.loadRaster(transfer.raster, transfer.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ViewerTemplate
      raster={viewer.raster}
      name={viewer.name}
      channels={viewer.channels}
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
    />
  );
};

export default ViewerPage;
