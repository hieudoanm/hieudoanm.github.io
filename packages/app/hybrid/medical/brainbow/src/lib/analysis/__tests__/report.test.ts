import { analyzeRaster } from '@/lib/analysis/analyze';
import { buildMethodsSnippet, buildReportHtml } from '@/lib/analysis/report';
import type { ImageRaster } from '@/types/image';

const makeRaster = (value: number): ImageRaster => ({
  width: 2,
  height: 1,
  data: new Uint8ClampedArray([
    value,
    value,
    value,
    255,
    value,
    value,
    value,
    255,
  ]),
});

const OPTIONS = { k: 3, iterations: 5, stride: 2, minRegionSize: 4 };

describe('buildMethodsSnippet', () => {
  it('describes the parameters and region totals', () => {
    const analyses = [
      analyzeRaster(makeRaster(0), {
        k: 1,
        iterations: 1,
        stride: 1,
        minRegionSize: 1,
      }),
      analyzeRaster(makeRaster(255), {
        k: 1,
        iterations: 1,
        stride: 1,
        minRegionSize: 1,
      }),
    ];
    const snippet = buildMethodsSnippet(OPTIONS, analyses);
    expect(snippet).toContain('k=3');
    expect(snippet).toContain('2 images');
  });
});

describe('buildReportHtml', () => {
  it('produces a full HTML document with title and tables', () => {
    const analyses = [
      analyzeRaster(makeRaster(0), {
        k: 1,
        iterations: 1,
        stride: 1,
        minRegionSize: 1,
      }),
    ];
    const html = buildReportHtml('My Report', analyses, OPTIONS);
    expect(html).toContain('<!doctype html>');
    expect(html).toContain('<h1>My Report</h1>');
    expect(html).toContain('<table>');
    expect(html).toContain('Shannon diversity index');
  });
});
