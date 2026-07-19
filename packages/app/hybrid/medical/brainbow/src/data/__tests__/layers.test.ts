import { DEFAULT_LAYERS, createLayer } from '@/data/layers';

describe('DEFAULT_LAYERS', () => {
  it('exposes a single visible neurons layer', () => {
    expect(DEFAULT_LAYERS).toHaveLength(1);
    expect(DEFAULT_LAYERS[0]).toMatchObject({
      id: 'layer-neurons',
      name: 'Neurons',
      color: '#00e5ff',
      visible: true,
    });
    expect(DEFAULT_LAYERS[0].annotations).toEqual([]);
  });
});

describe('createLayer', () => {
  it('builds an empty annotation layer', () => {
    const layer = createLayer('Axons', '#ffd000', 'layer-1');
    expect(layer).toEqual({
      id: 'layer-1',
      name: 'Axons',
      color: '#ffd000',
      visible: true,
      annotations: [],
    });
  });
});
