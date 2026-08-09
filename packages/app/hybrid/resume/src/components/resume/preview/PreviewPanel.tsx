'use client';

import type { FC } from 'react';
import { getPaperSize, mmToPx } from '../../../data/paper';
import { useOverflowDetect } from '../../../hooks/useOverflowDetect';
import { usePreviewScale } from '../../../hooks/usePreviewScale';
import type { ResumeData, ResumeOptions } from '../../../types/resume';
import { downloadResumeHtml, printResume } from '../../../utils/export';
import { dateStamp, resumeFileName } from '../../../utils/io';
import { PreviewStage } from './PreviewStage';
import { PreviewToolbar } from './PreviewToolbar';
import { ResumeSheet } from './ResumeSheet';

interface PreviewPanelProps {
  data: ResumeData;
  templateId: string;
  paperId: string;
  options: ResumeOptions;
  onPaperChange: (id: string) => void;
  onOptionsChange: (options: ResumeOptions) => void;
}

export const PreviewPanel: FC<PreviewPanelProps> = ({
  data,
  templateId,
  paperId,
  options,
  onPaperChange,
  onOptionsChange,
}) => {
  const paper = getPaperSize(paperId);
  const pxWidth = mmToPx(paper.widthMm);
  const pxHeight = mmToPx(paper.heightMm);
  const { containerRef, scale, zoom, setZoom } = usePreviewScale(pxWidth);
  const overflows = useOverflowDetect([data, templateId, paperId, options]);

  const handleDownloadHtml = () => {
    const sheet = document.getElementById('resume-sheet');
    if (!sheet) return;
    downloadResumeHtml(
      sheet,
      `${resumeFileName(data)}-${dateStamp()}-resume.html`,
      paper.widthMm,
      paper.heightMm
    );
  };

  const handleDensityChange = (density: ResumeOptions['density']) => {
    onOptionsChange({ ...options, density });
  };

  const handleAccentChange = (accentColor: string) => {
    onOptionsChange({ ...options, accentColor });
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <PreviewToolbar
        paperId={paperId}
        density={options.density}
        accentColor={options.accentColor}
        scale={scale}
        zoom={zoom}
        overflows={overflows}
        onPaperChange={onPaperChange}
        onDensityChange={handleDensityChange}
        onAccentChange={handleAccentChange}
        onZoomChange={setZoom}
        onDownload={handleDownloadHtml}
        onPrint={() => printResume(paper.widthMm, paper.heightMm)}
      />
      <PreviewStage
        containerRef={containerRef}
        scale={scale}
        widthPx={pxWidth}
        heightPx={pxHeight}>
        <ResumeSheet
          data={data}
          templateId={templateId}
          widthMm={paper.widthMm}
          heightMm={paper.heightMm}
          options={options}
        />
      </PreviewStage>
    </div>
  );
};

PreviewPanel.displayName = 'PreviewPanel';
