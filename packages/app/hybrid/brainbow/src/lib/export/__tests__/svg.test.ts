import { annotationsToSvg, buildScaleBar } from '@/lib/export/svg';
import type { AnnotationLayer } from '@/types/annotation';

const layers: AnnotationLayer[] = [
  {
    id: 'layer-1',
    name: 'Soma',
    color: '#ff0030',
    visible: true,
    annotations: [
      {
        id: 'a1',
        kind: 'polygon',
        points: [
          { x: 10, y: 10 },
          { x: 20, y: 10 },
          { x: 15, y: 20 },
        ],
      },
    ],
  },
  {
    id: 'layer-2',
    name: 'Process',
    color: '#00a6ff',
    visible: true,
    annotations: [
      {
        id: 'a2',
        kind: 'freehand',
        points: [
          { x: 0, y: 0 },
          { x: 5, y: 5 },
        ],
      },
    ],
  },
];

describe('annotationsToSvg', () => {
  it('emits an svg root with dimensions and white background', () => {
    const svg = annotationsToSvg([], 640, 480);
    expect(svg).toContain('<svg');
    expect(svg).toContain('width="640"');
    expect(svg).toContain('height="480"');
    expect(svg).toContain('fill="#ffffff"');
  });

  it('renders polygon and freehand annotations with layer colors', () => {
    const svg = annotationsToSvg(layers, 640, 480);
    expect(svg).toContain('<polygon points="10,10 20,10 15,20"');
    expect(svg).toContain('stroke="#ff0030"');
    expect(svg).toContain('<polyline points="0,0 5,5"');
    expect(svg).toContain('stroke="#00a6ff"');
    expect(svg).toContain('data-layer="Soma"');
  });

  it('skips hidden layers', () => {
    const hidden = layers.map((layer) => ({ ...layer, visible: false }));
    const svg = annotationsToSvg(hidden, 640, 480);
    expect(svg).not.toContain('polygon');
    expect(svg).not.toContain('polyline');
  });

  it('escapes XML in layer names', () => {
    const dangerous: AnnotationLayer[] = [
      {
        id: 'l',
        name: 'A&B <"C">',
        color: '#000000',
        visible: true,
        annotations: [
          {
            id: 'a',
            kind: 'polygon',
            points: [{ x: 0, y: 0 }],
          },
        ],
      },
    ];
    const svg = annotationsToSvg(dangerous, 100, 100);
    expect(svg).toContain('A&amp;B &lt;&quot;C&quot;&gt;');
  });
});

describe('buildScaleBar', () => {
  it('omits the scale bar without calibration', () => {
    expect(buildScaleBar(0, 640)).toBeNull();
    expect(buildScaleBar(Number.NaN, 640)).toBeNull();
  });

  it('picks a rounded length within a quarter of the width', () => {
    const bar = buildScaleBar(10, 640);
    expect(bar).not.toBeNull();
    expect(bar?.lengthPx).toBeLessThanOrEqual(160);
    expect(bar?.label).toMatch(/^\d+ µm$/);
  });

  it('computes the pixel length from microns', () => {
    const bar = buildScaleBar(6.25, 640);
    expect(bar?.lengthPx).toBeCloseTo(31.25);
    expect(bar?.label).toBe('5 µm');
  });
});
