import type { AnnotationLayer } from '@/types/annotation';
import { buildRoiSet, roiBytes } from '@/lib/export/roi';

const layer = (overrides: Partial<AnnotationLayer> = {}): AnnotationLayer => ({
  id: 'l1',
  name: 'Neurons',
  color: '#ff0000',
  visible: true,
  annotations: [
    {
      id: 'a1',
      kind: 'polygon',
      points: [
        { x: 10, y: 20 },
        { x: 30, y: 40 },
      ],
    },
  ],
  ...overrides,
});

const firstEntryBytes = (zip: Uint8Array): Uint8Array => {
  const view = new DataView(zip.buffer);
  const nameLength = view.getUint16(26, true);
  const size = view.getUint32(18, true);
  return zip.slice(30 + nameLength, 30 + nameLength + size);
};

describe('roiBytes', () => {
  it('writes the ImageJ ROI magic and header fields', () => {
    const bytes = roiBytes(layer().annotations[0], '#00ff00');
    const view = new DataView(bytes.buffer);
    expect(view.getUint32(0, true)).toBe(0x746f7549);
    expect(view.getUint16(4, true)).toBe(1);
    expect(view.getUint16(6, true)).toBe(0);
    expect(view.getUint16(8, true)).toBe(20);
    expect(view.getUint16(10, true)).toBe(10);
    expect(view.getUint16(12, true)).toBe(40);
    expect(view.getUint16(14, true)).toBe(30);
    expect(view.getUint16(16, true)).toBe(2);
    expect(view.getUint16(70, true)).toBe(74);
    expect(view.getUint16(72, true)).toBe(74 + 2 * 2);
  });

  it('uses the freehand type and argb color for freehand annotations', () => {
    const annotation = { ...layer().annotations[0], kind: 'freehand' as const };
    const bytes = roiBytes(annotation, '#00ff00');
    const view = new DataView(bytes.buffer);
    expect(view.getUint16(6, true)).toBe(5);
    expect(view.getUint32(26, true)).toBe(0xff00ff00);
  });

  it('switches to float coordinates when values exceed int16 range', () => {
    const annotation = {
      ...layer().annotations[0],
      points: [
        { x: 40000, y: 20 },
        { x: 30, y: 40 },
      ],
    };
    const bytes = roiBytes(annotation, '#ff0000');
    const view = new DataView(bytes.buffer);
    expect(view.getUint32(34, true)).toBe(0x10000);
    expect(view.getFloat32(74, true)).toBe(40000);
    expect(view.getFloat32(74 + 2 * 4, true)).toBe(20);
  });
});

describe('buildRoiSet', () => {
  it('produces a zip whose first entry has a {layer}-001.roi name', () => {
    const zip = buildRoiSet([layer()]);
    const view = new DataView(zip.buffer);
    const nameLength = view.getUint16(26, true);
    const name = new TextDecoder().decode(zip.slice(30, 30 + nameLength));
    expect(name).toBe('Neurons-001.roi');
  });

  it('skips invisible layers and annotations with fewer than 2 points', () => {
    const invisible = layer({
      id: 'l2',
      name: 'Hidden',
      visible: false,
      annotations: layer().annotations,
    });
    const sparse = layer({
      id: 'l3',
      name: 'Sparse',
      annotations: [{ id: 's1', kind: 'polygon', points: [{ x: 1, y: 1 }] }],
    });
    const zip = buildRoiSet([invisible, sparse]);
    expect(zip.length).toBe(22);
    expect(new DataView(zip.buffer).getUint16(10, true)).toBe(0);
  });

  it('includes a valid roi payload in the first entry', () => {
    const zip = buildRoiSet([layer()]);
    const payload = firstEntryBytes(zip);
    const view = new DataView(payload.buffer);
    expect(view.getUint32(0, true)).toBe(0x746f7549);
  });
});
