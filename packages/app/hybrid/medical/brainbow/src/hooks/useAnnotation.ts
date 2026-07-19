'use client';

import { useCallback, useMemo, useReducer, useState } from 'react';
import { DEFAULT_LAYERS, createLayer } from '@/data/layers';
import { createId } from '@/lib/annotation/id';
import type { Annotation, AnnotationLayer, ViewTool } from '@/types/annotation';

interface AnnotationState {
  layers: AnnotationLayer[];
  activeLayerId: string;
  past: AnnotationLayer[][];
  future: AnnotationLayer[][];
}

type AnnotationAction =
  | { type: 'addLayer'; layer: AnnotationLayer }
  | { type: 'removeLayer'; id: string }
  | { type: 'toggleLayerVisibility'; id: string; visible: boolean }
  | { type: 'setLayerColor'; id: string; color: string }
  | { type: 'setActiveLayer'; id: string }
  | { type: 'addAnnotation'; annotation: Annotation }
  | { type: 'removeAnnotation'; id: string }
  | { type: 'removeAnnotations'; ids: string[] }
  | { type: 'replaceLayers'; layers: AnnotationLayer[] }
  | { type: 'undo' }
  | { type: 'redo' };

const initialState: AnnotationState = {
  layers: DEFAULT_LAYERS.map((layer) => ({
    ...layer,
    annotations: [...layer.annotations],
  })),
  activeLayerId: DEFAULT_LAYERS[0].id,
  past: [],
  future: [],
};

const withHistory = (
  before: AnnotationState,
  after: AnnotationState
): AnnotationState => ({
  ...after,
  past: [...before.past, before.layers],
  future: [],
});

const withLayer = (
  state: AnnotationState,
  id: string,
  update: (layer: AnnotationLayer) => AnnotationLayer
): AnnotationState => ({
  ...state,
  layers: state.layers.map((layer) =>
    layer.id === id ? update(layer) : layer
  ),
});

const reducer = (
  state: AnnotationState,
  action: AnnotationAction
): AnnotationState => {
  switch (action.type) {
    case 'addLayer':
      return withHistory(state, {
        ...state,
        layers: [...state.layers, action.layer],
        activeLayerId: action.layer.id,
      });
    case 'removeLayer': {
      const layers = state.layers.filter((layer) => layer.id !== action.id);
      if (layers.length === 0) return state;
      const activeLayerId =
        state.activeLayerId === action.id ? layers[0].id : state.activeLayerId;
      return withHistory(state, { ...state, layers, activeLayerId });
    }
    case 'toggleLayerVisibility':
      return withHistory(
        state,
        withLayer(state, action.id, (layer) => ({
          ...layer,
          visible: action.visible,
        }))
      );
    case 'setLayerColor':
      return withHistory(
        state,
        withLayer(state, action.id, (layer) => ({
          ...layer,
          color: action.color,
        }))
      );
    case 'setActiveLayer':
      return { ...state, activeLayerId: action.id };
    case 'addAnnotation': {
      const target = state.layers.find(
        (layer) => layer.id === state.activeLayerId
      );
      if (!target) return state;
      return withHistory(
        state,
        withLayer(state, target.id, (layer) => ({
          ...layer,
          annotations: [...layer.annotations, action.annotation],
        }))
      );
    }
    case 'removeAnnotation': {
      const target = state.layers.find(
        (layer) => layer.id === state.activeLayerId
      );
      if (!target) return state;
      return withHistory(
        state,
        withLayer(state, target.id, (layer) => ({
          ...layer,
          annotations: layer.annotations.filter(
            (annotation) => annotation.id !== action.id
          ),
        }))
      );
    }
    case 'removeAnnotations': {
      const target = state.layers.find(
        (layer) => layer.id === state.activeLayerId
      );
      if (!target || action.ids.length === 0) return state;
      const removed = new Set(action.ids);
      const remaining = target.annotations.filter(
        (annotation) => !removed.has(annotation.id)
      );
      if (remaining.length === target.annotations.length) return state;
      return withHistory(
        state,
        withLayer(state, target.id, (layer) => ({
          ...layer,
          annotations: remaining,
        }))
      );
    }
    case 'replaceLayers': {
      const layers = action.layers.length > 0 ? action.layers : DEFAULT_LAYERS;
      return {
        ...state,
        layers: layers.map((layer) => ({ ...layer })),
        activeLayerId: layers[0].id,
        past: [],
        future: [],
      };
    }
    case 'undo': {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        ...state,
        layers: previous,
        activeLayerId: previous[0]?.id ?? state.activeLayerId,
        past: state.past.slice(0, -1),
        future: [state.layers, ...state.future],
      };
    }
    case 'redo': {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        ...state,
        layers: next,
        activeLayerId: next[0]?.id ?? state.activeLayerId,
        past: [...state.past, state.layers],
        future: state.future.slice(1),
      };
    }
  }
};

export const useAnnotation = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [tool, setTool] = useState<ViewTool>('pan');

  const activeLayer = useMemo(
    () =>
      state.layers.find((layer) => layer.id === state.activeLayerId) ?? null,
    [state.layers, state.activeLayerId]
  );

  const addLayer = useCallback(() => {
    const count = state.layers.length + 1;
    dispatch({
      type: 'addLayer',
      layer: createLayer(`Layer ${count}`, '#ffd000', createId()),
    });
  }, [state.layers.length]);

  const removeLayer = useCallback((id: string) => {
    dispatch({ type: 'removeLayer', id });
  }, []);

  const toggleLayerVisibility = useCallback((id: string, visible: boolean) => {
    dispatch({ type: 'toggleLayerVisibility', id, visible });
  }, []);

  const setLayerColor = useCallback((id: string, color: string) => {
    dispatch({ type: 'setLayerColor', id, color });
  }, []);

  const setActiveLayer = useCallback((id: string) => {
    dispatch({ type: 'setActiveLayer', id });
  }, []);

  const addAnnotation = useCallback((annotation: Annotation) => {
    dispatch({ type: 'addAnnotation', annotation });
  }, []);

  const removeAnnotation = useCallback((id: string) => {
    dispatch({ type: 'removeAnnotation', id });
  }, []);

  const removeAnnotations = useCallback((ids: string[]) => {
    dispatch({ type: 'removeAnnotations', ids });
  }, []);

  const replaceLayers = useCallback((layers: AnnotationLayer[]) => {
    dispatch({ type: 'replaceLayers', layers });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'undo' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'redo' });
  }, []);

  return {
    layers: state.layers,
    activeLayer,
    activeLayerId: state.activeLayerId,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    tool,
    setTool,
    addLayer,
    removeLayer,
    toggleLayerVisibility,
    setLayerColor,
    setActiveLayer,
    addAnnotation,
    removeAnnotation,
    removeAnnotations,
    replaceLayers,
    undo,
    redo,
  };
};
