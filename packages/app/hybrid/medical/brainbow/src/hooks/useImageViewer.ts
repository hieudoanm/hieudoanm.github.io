'use client';

import { useCallback, useMemo, useReducer } from 'react';
import { SAMPLE_NAME, createSampleRaster } from '@/data/sample';
import { DEFAULT_CHANNEL_STATES } from '@/data/channels';
import { createId } from '@/lib/annotation/id';
import {
  compositeChannels,
  createChannelState,
  toChannelRaster,
} from '@/lib/image/channels';
import { analyzeChannels } from '@/lib/image/histogram';
import { loadChannelImageFile } from '@/lib/image/load';
import {
  DEFAULT_ORIENTATION,
  orientedSize,
  orientChannelRaster,
} from '@/lib/image/orientation';
import { fitTransform, panBy, zoomAt } from '@/lib/geometry/viewport';
import type {
  Calibration,
  ChannelRaster,
  ChannelState,
  ImageRaster,
  Orientation,
  ViewTransform,
} from '@/types/image';

export interface ViewerSize {
  width: number;
  height: number;
}

interface ViewerState {
  raster: ChannelRaster | null;
  name: string | null;
  channels: ChannelState[];
  orientation: Orientation;
  calibration: Calibration;
  transform: ViewTransform;
  size: ViewerSize;
}

type ViewerAction =
  | {
      type: 'setRaster';
      raster: ChannelRaster;
      name: string;
      channels?: ChannelState[];
      calibration?: Calibration;
    }
  | { type: 'setOrientation'; orientation: Orientation }
  | { type: 'setCalibration'; calibration: Calibration }
  | { type: 'setTransform'; transform: ViewTransform }
  | { type: 'setSize'; size: ViewerSize }
  | { type: 'addChannel'; channel: ChannelState }
  | { type: 'setChannelSourcePlane'; id: string; sourcePlane: string }
  | { type: 'toggleChannel'; id: string; visible: boolean }
  | { type: 'setChannelOpacity'; id: string; opacity: number };

const fitFor = (state: ViewerState): ViewTransform => {
  const { raster, size, orientation } = state;
  if (!raster) return state.transform;
  const { width, height } = orientedSize(
    orientation,
    raster.width,
    raster.height
  );
  return fitTransform(width, height, size.width, size.height);
};

const reducer = (state: ViewerState, action: ViewerAction): ViewerState => {
  switch (action.type) {
    case 'setRaster': {
      const next: ViewerState = {
        ...state,
        raster: action.raster,
        name: action.name,
        channels: action.channels ?? DEFAULT_CHANNEL_STATES,
        orientation: DEFAULT_ORIENTATION,
        calibration: action.calibration ?? { pixelsPerMicron: null },
        transform: fitFor({ ...state, raster: action.raster }),
      };
      return next;
    }
    case 'setOrientation': {
      const next = { ...state, orientation: action.orientation };
      return { ...next, transform: fitFor(next) };
    }
    case 'setCalibration':
      return { ...state, calibration: action.calibration };
    case 'addChannel':
      return {
        ...state,
        channels: [...state.channels, action.channel],
      };
    case 'setChannelSourcePlane':
      return {
        ...state,
        channels: state.channels.map((channel) =>
          channel.id === action.id
            ? { ...channel, sourcePlane: action.sourcePlane }
            : channel
        ),
      };
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
  orientation: DEFAULT_ORIENTATION,
  calibration: { pixelsPerMicron: null },
  transform: { scale: 1, offsetX: 0, offsetY: 0 },
  size: { width: 0, height: 0 },
};

export const useImageViewer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const composited = useMemo(() => {
    if (!state.raster) return null;
    const oriented = orientChannelRaster(state.raster, state.orientation);
    return compositeChannels(oriented, state.channels);
  }, [state.raster, state.orientation, state.channels]);

  const analyses = useMemo(
    () => (state.raster ? analyzeChannels(state.raster, state.channels) : null),
    [state.raster, state.channels]
  );

  const openDemo = useCallback(() => {
    dispatch({
      type: 'setRaster',
      raster: toChannelRaster(createSampleRaster()),
      name: SAMPLE_NAME,
    });
  }, []);

  const importFiles = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    const loaded = await loadChannelImageFile(files[0]);
    dispatch({
      type: 'setRaster',
      raster: loaded.raster,
      name: loaded.name,
      calibration: loaded.calibration,
    });
  }, []);

  const loadChannelRaster = useCallback(
    (
      raster: ChannelRaster,
      name: string,
      channels?: ChannelState[],
      calibration?: Calibration
    ) => {
      dispatch({ type: 'setRaster', raster, name, channels, calibration });
    },
    []
  );

  const loadRaster = useCallback(
    (raster: ImageRaster, name: string, channels?: ChannelState[]) => {
      dispatch({
        type: 'setRaster',
        raster: toChannelRaster(raster),
        name,
        channels,
      });
    },
    []
  );

  const setSize = useCallback((size: ViewerSize) => {
    dispatch({ type: 'setSize', size });
  }, []);

  const fitView = useCallback(() => {
    dispatch({ type: 'setTransform', transform: fitFor(state) });
  }, [state]);

  const setOrientation = useCallback((orientation: Orientation) => {
    dispatch({ type: 'setOrientation', orientation });
  }, []);

  const setCalibration = useCallback((calibration: Calibration) => {
    dispatch({ type: 'setCalibration', calibration });
  }, []);

  const planes = useMemo(() => state.raster?.planes ?? [], [state.raster]);

  const addChannel = useCallback(() => {
    const planes = state.raster?.planes ?? [];
    if (planes.length === 0) return;
    dispatch({
      type: 'addChannel',
      channel: createChannelState(planes, state.channels, createId()),
    });
  }, [state.raster, state.channels]);

  const setChannelSourcePlane = useCallback(
    (id: string, sourcePlane: string) => {
      dispatch({ type: 'setChannelSourcePlane', id, sourcePlane });
    },
    []
  );

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
    source: composited,
    name: state.name,
    channels: state.channels,
    analyses,
    transform: state.transform,
    size: state.size,
    orientation: state.orientation,
    baseWidth: state.raster?.width ?? 0,
    baseHeight: state.raster?.height ?? 0,
    calibration: state.calibration,
    planes,
    openDemo,
    importFiles,
    loadRaster,
    loadChannelRaster,
    setSize,
    fitView,
    zoomIn,
    zoomOut,
    pan,
    setTransform,
    setOrientation,
    setCalibration,
    addChannel,
    setChannelSourcePlane,
    toggleChannel,
    setChannelOpacity,
  };
};
