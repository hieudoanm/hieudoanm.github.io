'use client';

import type { FC } from 'react';
import { DENSITY_ZOOM } from '../../../types/resume';
import type { ResumeData, ResumeOptions } from '../../../types/resume';
import { getTemplate } from '../templates';

interface ResumeSheetProps {
  data: ResumeData;
  templateId: string;
  widthMm: number;
  heightMm: number;
  options?: ResumeOptions;
}

export const ResumeSheet: FC<ResumeSheetProps> = ({
  data,
  templateId,
  widthMm,
  heightMm,
  options,
}) => {
  const { component: Template } = getTemplate(templateId);
  const zoom = DENSITY_ZOOM[options?.density ?? 'normal'];

  return (
    <div
      id="resume-sheet"
      style={{
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        background: '#ffffff',
        overflow: 'hidden',
      }}>
      <div style={{ height: '100%', zoom }}>
        <Template data={data} options={options} />
      </div>
    </div>
  );
};

ResumeSheet.displayName = 'ResumeSheet';
