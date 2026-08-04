export type Plane = 'r' | 'g' | 'b';

export interface ImageRaster {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

export interface ChannelConfig {
  id: string;
  name: string;
  sourcePlane: Plane;
  displayColor: string;
}

export interface ChannelState {
  id: string;
  name: string;
  sourcePlane: Plane;
  color: string;
  visible: boolean;
  opacity: number;
}

export interface ViewTransform {
  scale: number;
  offsetX: number;
  offsetY: number;
}

export interface RgbTuple {
  r: number;
  g: number;
  b: number;
}
