export type Plane = 'r' | 'g' | 'b';

export interface ImageRaster {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

export interface ChannelPlane {
  id: string;
  name: string;
  data: Uint8ClampedArray;
}

export interface ChannelRaster {
  width: number;
  height: number;
  planes: ChannelPlane[];
}

export interface StackSlice {
  id: string;
  z: number | null;
  frame: number | null;
  planes: ChannelPlane[];
}

export interface StackRaster {
  width: number;
  height: number;
  slices: StackSlice[];
}

export interface ChannelConfig {
  id: string;
  name: string;
  sourcePlane: string;
  displayColor: string;
}

export interface ChannelState {
  id: string;
  name: string;
  sourcePlane: string;
  color: string;
  visible: boolean;
  opacity: number;
}

export type Rotation = 0 | 90 | 180 | 270;

export interface Orientation {
  rotation: Rotation;
  flipX: boolean;
  flipY: boolean;
}

export interface Calibration {
  pixelsPerMicron: number | null;
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
