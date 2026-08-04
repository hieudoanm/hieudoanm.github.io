'use client';

import { useCallback, useMemo, useReducer } from 'react';
import { SAMPLE_NAME, createSampleRaster } from '@/data/sample';
import { DEFAULT_CHANNEL_STATES } from '@/data/channels';
import { compositeChannels } from '@/lib/image/channels';
import { analyzeChannels } from '@/lib/image/histogram';
import { loadImageFiles } from '@/lib/image/load';
import { fitTransform, panBy, zoomAt } from '@/lib/geometry/viewport';
import type { ChannelState, ImageRaster, ViewTransform } from '@/types/image';

export interface ViewerSize {
  width: number;
  height: number;
}

interface ViewerState {
  raster: ImageRaster | null;
  name: string | null;
  channels: ChannelState[];
  transform: ViewTransform;
  size: ViewerSize;
}

type ViewerAction =
  | {
      type: 'setRaster';
      raster: ImageRaster;
      name: string;
      channels?: ChannelState[];
    }
  | { type: 'setTransform'; transform: ViewTransform }
  | { type: 'setSize'; size: ViewerSize }
  | { type: 'toggleChannel'; id: string; visible: boolean }
  | { type: 'setChannelOpacity'; id: string; opacity: number };

const fitFor = (state: ViewerState): ViewTransform => {
  const { raster, size } = state;
  if (!raster) return state.transform;
  return fitTransform(raster.width, raster.height, size.width, size.height);
};

const reducer = (state: ViewerState, action: ViewerAction): ViewerState => {
  switch (action.type) {
    case 'setRaster': {
      const next: ViewerState = {
        ...state,
        raster: action.raster,
        name: action.name,
        channels: action.channels ?? DEFAULT_CHANNEL_STATES,
        transform: fitFor({ ...state, raster: action.raster }),
      };
      return next;
    }
    case 'setTransform':
      return { ...state, transform: action.transform };
    case 'setSize': {
      const next = { ...state, size: action.size };
      if (next.raster && state.size.width !== action.size.width) {
        next.transform = fitFor(next);
      }
      return next;
    }
    case 'toggleChannel':
      return {
        ...state,
        channels: state.channels.map((channel) =>
          channel.id === action.id
            ? { ...channel, visible: action.visible }
            : channel
        ),
      };
    case 'setChannelOpacity':
      return {
        ...state,
        channels: state.channels.map((channel) =>
          channel.id === action.id
            ? { ...channel, opacity: action.opacity }
            : channel
        ),
      };
  }
};

const initialState: ViewerState = {
  raster: null,
  name: null,
  channels: DEFAULT_CHANNEL_STATES,
  transform: { scale: 1, offsetX: 0, offsetY: 0 },
  size: { width: 0, height: 0 },
};

export const useImageViewer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const composited = useMemo(
    () =>
      state.raster ? compositeChannels(state.raster, state.channels) : null,
    [state.raster, state.channels]
  );

  const analyses = useMemo(
    () => (state.raster ? analyzeChannels(state.raster, state.channels) : null),
    [state.raster, state.channels]
  );

  const openDemo = useCallback(() => {
    dispatch({
      type: 'setRaster',
      raster: createSampleRaster(),
      name: SAMPLE_NAME,
    });
  }, []);

  const importFiles = useCallback(async (files: File[]) => {
    const loaded = await loadImageFiles(files);
    if (loaded.length > 0) {
      dispatch({ type: 'setRaster', raster: loaded[0], name: files[0].name });
    }
  }, []);

  const loadRaster = useCallback(
    (raster: ImageRaster, name: string, channels?: ChannelState[]) => {
      dispatch({ type: 'setRaster', raster, name, channels });
    },
    []
  );

  const setSize = useCallback((size: ViewerSize) => {
    dispatch({ type: 'setSize', size });
  }, []);

  const fitView = useCallback(() => {
    dispatch({ type: 'setTransform', transform: fitFor(state) });
  }, [state]);

  const zoomIn = useCallback(() => {
    const center = {
      x: state.size.width / 2,
      y: state.size.height / 2,
    };
    dispatch({
      type: 'setTransform',
      transform: zoomAt(state.transform, center.x, center.y, 1.25),
    });
  }, [state]);

  const zoomOut = useCallback(() => {
    const center = {
      x: state.size.width / 2,
      y: state.size.height / 2,
    };
    dispatch({
      type: 'setTransform',
      transform: zoomAt(state.transform, center.x, center.y, 0.8),
    });
  }, [state]);

  const pan = useCallback(
    (deltaX: number, deltaY: number) => {
      dispatch({
        type: 'setTransform',
        transform: panBy(state.transform, deltaX, deltaY),
      });
    },
    [state.transform]
  );

  const setTransform = useCallback((transform: ViewTransform) => {
    dispatch({ type: 'setTransform', transform });
  }, []);

  const toggleChannel = useCallback((id: string, visible: boolean) => {
    dispatch({ type: 'toggleChannel', id, visible });
  }, []);

  const setChannelOpacity = useCallback((id: string, opacity: number) => {
    dispatch({ type: 'setChannelOpacity', id, opacity });
  }, []);

  return {
    raster: composited,
    source: state.raster,
    name: state.name,
    channels: state.channels,
    analyses,
    transform: state.transform,
    size: state.size,
    openDemo,
    importFiles,
    loadRaster,
    setSize,
    fitView,
    zoomIn,
    zoomOut,
    pan,
    setTransform,
    toggleChannel,
    setChannelOpacity,
  };
};
