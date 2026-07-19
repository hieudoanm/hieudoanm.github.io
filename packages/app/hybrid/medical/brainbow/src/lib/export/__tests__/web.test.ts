import { exportWebViewer } from '@/lib/export/web';
import { bytesToBase64 } from '@/lib/projects/bundle';
import type { Project } from '@/types/project';

const buildProject = (overrides: Partial<Project> = {}): Project => ({
  format: 'brainbow-project',
  version: 1,
  name: 'Neuron 7',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-02T00:00:00.000Z',
  images: [
    {
      id: 'img-1',
      name: 'neuron',
      width: 2,
      height: 2,
      data: bytesToBase64(
        new Uint8ClampedArray([
          10, 20, 30, 255, 40, 50, 60, 255, 70, 80, 90, 255, 100, 110, 120, 255,
        ])
      ),
      calibration: { pixelsPerMicron: 2.5 },
    },
  ],
  channels: [
    {
      id: 'ch-1',
      name: 'Red',
      sourcePlane: 'r',
      color: '#ff0030',
      visible: true,
      opacity: 1,
    },
  ],
  layers: [
    {
      id: 'layer-1',
      name: 'Axon',
      color: '#00ff00',
      visible: true,
      annotations: [
        {
          id: 'ann-1',
          kind: 'polygon',
          points: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
          ],
        },
      ],
    },
  ],
  ...overrides,
});

describe('exportWebViewer', () => {
  it('produces a standalone HTML document', () => {
    const html = exportWebViewer(buildProject());
    expect(html.startsWith('<!doctype html>')).toBe(true);
    expect(html).toContain('<canvas id="viewer"');
    expect(html).toContain('<script>');
  });

  it('embeds the project JSON including image data and annotations', () => {
    const html = exportWebViewer(buildProject());
    expect(html).toContain('"name":"Neuron 7"');
    expect(html).toContain('"kind":"polygon"');
    expect(html).toContain('"data":"');
  });

  it('is marked read-only and has no editing tools', () => {
    const html = exportWebViewer(buildProject());
    expect(html).toContain('read-only');
    expect(html).not.toContain('ToolPalette');
    expect(html).not.toContain('aria-pressed');
  });

  it('sanitizes embedded JSON so it cannot break out of the script tag', () => {
    const html = exportWebViewer(
      buildProject({ name: '</script><script>alert(1)</script>' })
    );
    expect(html).not.toContain('</script><script>alert(1)</script>');
    expect(html).toContain('\\u003c/script\\u003e');
    expect(html).toContain('&lt;/script&gt;');
  });

  it('renders a layer legend placeholder and reset control', () => {
    const html = exportWebViewer(buildProject());
    expect(html).toContain('id="layers"');
    expect(html).toContain('id="reset"');
    expect(html).toContain('Fit image');
  });

  it('handles a project without calibration', () => {
    const project = buildProject();
    project.images[0].calibration = null;
    const html = exportWebViewer(project);
    expect(html).toContain('<canvas id="viewer"');
  });
});
