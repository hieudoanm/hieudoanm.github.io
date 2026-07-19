import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test, expect } from '@playwright/test';
import { exportWebViewer } from '../src/lib/export/web';
import type { Project } from '../src/types/project';

const imageData = Buffer.from([
  10, 20, 30, 255, 40, 50, 60, 255, 70, 80, 90, 255, 100, 110, 120, 255,
]).toString('base64');

const project: Project = {
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
      data: imageData,
      calibration: { pixelsPerMicron: 2.5 },
    },
  ],
  channels: [],
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
};

test.describe('exported web viewer', () => {
  test('renders the image, layer legend, and metadata in a standalone HTML file', async ({
    page,
  }) => {
    const dir = mkdtempSync(join(tmpdir(), 'brainbow-viewer-'));
    const file = join(dir, 'viewer.html');
    writeFileSync(file, exportWebViewer(project));

    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto(`file://${file}`);

    await expect(page.getByText('read-only')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Fit image' })).toBeVisible();
    await expect(page.locator('#layers li')).toContainText('Axon');
    await expect(page.locator('#meta')).toContainText('2×2 px');

    const painted = await page.evaluate(() => {
      const canvas = document.getElementById('viewer') as HTMLCanvasElement;
      const context = canvas.getContext('2d');
      if (!context) return 0;
      const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let nonzero = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 0 || data[i + 1] > 0 || data[i + 2] > 0) {
          nonzero += 1;
        }
      }
      return nonzero;
    });
    expect(painted).toBeGreaterThan(0);
    expect(errors).toEqual([]);

    rmSync(dir, { recursive: true, force: true });
  });
});
