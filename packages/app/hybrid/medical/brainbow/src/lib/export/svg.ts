import type { Annotation, AnnotationLayer } from '@/types/annotation';

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const pointsAttribute = (points: Annotation['points']): string =>
  points.map((point) => `${point.x},${point.y}`).join(' ');

const annotationElement = (annotation: Annotation, color: string): string => {
  const points = pointsAttribute(annotation.points);
  const tag = annotation.kind === 'polygon' ? 'polygon' : 'polyline';
  return [
    `<${tag} points="${points}"`,
    `  fill="${annotation.kind === 'polygon' ? color : 'none'}"`,
    `  fill-opacity="${annotation.kind === 'polygon' ? '0.12' : '0'}"`,
    `  stroke="${color}" stroke-width="1.5" stroke-linejoin="round"`,
    `  stroke-linecap="round"/>`,
  ].join('\n');
};

export interface ScaleBar {
  lengthPx: number;
  label: string;
}

export const buildScaleBar = (
  pixelsPerMicron: number,
  width: number
): ScaleBar | null => {
  if (!Number.isFinite(pixelsPerMicron) || pixelsPerMicron <= 0) return null;
  const niceLengths = [5, 10, 20, 50, 100, 200];
  const targetMax = width * 0.25;
  const length = niceLengths.find(
    (microns) => microns * pixelsPerMicron <= targetMax
  );
  const chosen = length ?? niceLengths[niceLengths.length - 1];
  return { lengthPx: chosen * pixelsPerMicron, label: `${chosen} µm` };
};

export const annotationsToSvg = (
  layers: AnnotationLayer[],
  width: number,
  height: number,
  pixelsPerMicron?: number | null
): string => {
  const visible = layers.filter((layer) => layer.visible);
  const scaleBar =
    pixelsPerMicron != null ? buildScaleBar(pixelsPerMicron, width) : null;
  const barY = height - 24;
  const scaleBarElement = scaleBar
    ? [
        '<g>',
        `  <rect x="16" y="${barY}" width="${scaleBar.lengthPx}" height="4"`,
        `        fill="#000000" stroke="none"/>`,
        `  <text x="16" y="${barY + 16}" font-family="Arial" font-size="11">`,
        `    ${escapeXml(scaleBar.label)}`,
        '  </text>',
        '</g>',
      ].join('\n')
    : '';
  const groupElements = visible.map((layer) => {
    const annotations = layer.annotations
      .map((annotation) => annotationElement(annotation, layer.color))
      .join('\n');
    if (annotations.length === 0) return '';
    return [
      `<g id="${escapeXml(layer.id)}" data-layer="${escapeXml(layer.name)}">`,
      annotations,
      '</g>',
    ].join('\n');
  });
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"`,
    `     viewBox="0 0 ${width} ${height}">`,
    '  <rect width="100%" height="100%" fill="#ffffff"/>',
    groupElements.join('\n'),
    scaleBarElement,
    '</svg>',
  ]
    .filter((part) => part !== '')
    .join('\n');
};
