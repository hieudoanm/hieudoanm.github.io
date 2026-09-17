class MockVector3 {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
}

class MockColor {
  r: number;
  g: number;
  b: number;

  constructor(r = 1, g = 1, b = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  setHSL(): this {
    this.r = 1;
    this.g = 1;
    this.b = 1;
    return this;
  }
}

class MockScene {
  background: unknown = null;
  add = jest.fn();
  remove = jest.fn();
}

class MockPerspectiveCamera {
  position = new MockVector3(0, 0, 1);
  aspect = 1;
  updateProjectionMatrix = jest.fn();
  lookAt = jest.fn();
}

class MockBufferGeometry {
  attributes: Record<string, { array: Float32Array; needsUpdate?: boolean }> =
    {};

  setAttribute(name: string, attribute: { array: Float32Array }): this {
    this.attributes[name] = { ...attribute };
    return this;
  }

  dispose = jest.fn();
}

class MockBufferAttribute {
  array: Float32Array;
  size: number;

  constructor(array: Float32Array, size: number) {
    this.array = array;
    this.size = size;
  }
}

class MockShaderMaterial {
  constructor(params: Record<string, unknown>) {
    Object.assign(this, params);
  }

  dispose = jest.fn();
}

class MockPoints {
  geometry: MockBufferGeometry;
  material: MockShaderMaterial;

  constructor(geometry: MockBufferGeometry, material: MockShaderMaterial) {
    this.geometry = geometry;
    this.material = material;
  }
}

class MockWebGLRenderer {
  domElement = document.createElement('canvas');
  setSize = jest.fn();
  setPixelRatio = jest.fn();
  render = jest.fn();
  dispose = jest.fn();
}

export const mockThree = {
  Color: MockColor,
  Scene: MockScene,
  PerspectiveCamera: MockPerspectiveCamera,
  BufferGeometry: MockBufferGeometry,
  BufferAttribute: MockBufferAttribute,
  ShaderMaterial: MockShaderMaterial,
  Points: MockPoints,
  WebGLRenderer: MockWebGLRenderer,
  NormalBlending: 1,
};
