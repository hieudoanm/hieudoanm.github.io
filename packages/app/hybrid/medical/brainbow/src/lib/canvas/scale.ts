export interface ScaleBarSpec {
  lengthPx: number;
  lengthMicrons: number;
  label: string;
}

const NICE_STEPS = [
  0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000,
];

export const scaleBarSpec = (
  transformScale: number,
  pixelsPerMicron: number,
  targetPx = 96
): ScaleBarSpec | null => {
  if (pixelsPerMicron <= 0 || transformScale <= 0) return null;

  const screenPixelsPerMicron = pixelsPerMicron * transformScale;
  const targetMicrons = targetPx / screenPixelsPerMicron;
  const lengthMicrons =
    NICE_STEPS.find((step) => step >= targetMicrons) ?? targetMicrons;

  return {
    lengthPx: lengthMicrons * screenPixelsPerMicron,
    lengthMicrons,
    label: `${lengthMicrons >= 10 ? Math.round(lengthMicrons) : lengthMicrons} \u00b5m`,
  };
};

export const drawScaleBar = (
  ctx: CanvasRenderingContext2D,
  spec: ScaleBarSpec,
  width: number,
  height: number
): void => {
  const margin = 12;
  const y = height - margin;
  const x0 = margin;
  const x1 = x0 + spec.lengthPx;

  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(x0, y - 4);
  ctx.lineTo(x0, y + 4);
  ctx.moveTo(x0, y);
  ctx.lineTo(x1, y);
  ctx.moveTo(x1, y - 4);
  ctx.lineTo(x1, y + 4);
  ctx.stroke();

  ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText(spec.label, (x0 + x1) / 2, y - 8);
  ctx.restore();
};
