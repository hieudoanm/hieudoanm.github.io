import { annotationsToCsv, toCsv } from '@/lib/export/csv';
import type { AnnotationLayer } from '@/types/annotation';

describe('toCsv', () => {
  it('writes headers and rows', () => {
    const csv = toCsv([
      { cluster: 1, regions: 2 },
      { cluster: 2, regions: 5 },
    ]);
    expect(csv).toBe('cluster,regions\n1,2\n2,5');
  });

  it('escapes commas, quotes and newlines', () => {
    const csv = toCsv([{ name: 'a,"b"', note: 'line\nbreak' }]);
    expect(csv).toBe('name,note\n"a,""b""","line\nbreak"');
  });

  it('returns an empty string for no rows', () => {
    expect(toCsv([])).toBe('');
  });
});

describe('annotationsToCsv', () => {
  const layers: AnnotationLayer[] = [
    {
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
    },
    {
      id: 'l2',
      name: 'Hidden',
      color: '#00ff00',
      visible: false,
      annotations: [{ id: 'a2', kind: 'freehand', points: [{ x: 1, y: 2 }] }],
    },
  ];

  it('writes one row per visible annotation with a points column', () => {
    const csv = annotationsToCsv(layers);
    expect(csv).toBe(
      'layer,color,kind,points\n' +
        'Neurons,#ff0000,polygon,"10.0,20.0;30.0,40.0"'
    );
  });

  it('skips invisible layers', () => {
    expect(annotationsToCsv([layers[1]])).toBe('');
  });
});
