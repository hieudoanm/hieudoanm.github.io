import type { AnnotationLayer } from '@/types/annotation';

export const DEFAULT_LAYERS: AnnotationLayer[] = [
  {
    id: 'layer-neurons',
    name: 'Neurons',
    color: '#00e5ff',
    visible: true,
    annotations: [],
  },
];

export const createLayer = (
  name: string,
  color: string,
  id: string
): AnnotationLayer => ({
  id,
  name,
  color,
  visible: true,
  annotations: [],
});
