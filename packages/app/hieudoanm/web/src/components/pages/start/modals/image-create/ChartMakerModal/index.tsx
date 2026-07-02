'use client';
import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { COLORS, downloadBlob } from './utils';

export const ChartMakerModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [title, setTitle] = useState('My Chart');
  const [labels, setLabels] = useState('A,B,C,D');
  const [values, setValues] = useState('10,25,15,30');

  const handleGenerate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setLoading(true);
    const ctx = canvas.getContext('2d')!;
    canvas.width = 600;
    canvas.height = 400;
    const labelList = labels.split(',').map((s) => s.trim());
    const valueList = values.split(',').map(Number);
    const maxVal = Math.max(...valueList, 1);

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, 30);

    const barWidth = (canvas.width - 100) / labelList.length;
    valueList.forEach((v, i) => {
      const barHeight = (v / maxVal) * 250;
      const x = 50 + i * barWidth;
      const y = canvas.height - 60 - barHeight;
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fillRect(x + 5, y, barWidth - 10, barHeight);
      ctx.fillStyle = '#000';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labelList[i] || '', x + barWidth / 2, canvas.height - 40);
      ctx.fillText(String(v), x + barWidth / 2, y - 5);
    });

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'chart.png');
      setLoading(false);
    });
  }, [title, labels, values]);

  return (
    <ModalWrapper onClose={onClose} title="Chart Maker">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          className="input input-bordered"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="input input-bordered"
          placeholder="Labels (comma-separated)"
          value={labels}
          onChange={(e) => setLabels(e.target.value)}
        />
        <input
          type="text"
          className="input input-bordered"
          placeholder="Values (comma-separated)"
          value={values}
          onChange={(e) => setValues(e.target.value)}
        />
        <button
          className="btn btn-primary btn-sm"
          disabled={loading}
          onClick={handleGenerate}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Generate Chart'
          )}
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ModalWrapper>
  );
};
ChartMakerModal.displayName = 'ChartMakerModal';
