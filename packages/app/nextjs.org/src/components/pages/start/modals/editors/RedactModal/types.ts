export interface RedactionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const NODE_ENV = process.env.NODE_ENV ?? 'development';
