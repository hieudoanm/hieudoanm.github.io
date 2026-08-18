'use client';

import { memo, type ComponentType, type FC } from 'react';
import { mmToPx } from '../../../data/paper';
import { seedResumeData } from '../../../data/seed';
import type { ResumeData } from '../../../types/resume';

const SHEET_WIDTH_PX = mmToPx(210);
const SHEET_HEIGHT_PX = mmToPx(297);

interface TemplateThumbnailProps {
  component: ComponentType<{ data: ResumeData }>;
  width?: number;
}

export const TemplateThumbnail: FC<TemplateThumbnailProps> = memo(
  ({ component: Template, width = 64 }) => {
    const scale = width / SHEET_WIDTH_PX;
    const height = width * (SHEET_HEIGHT_PX / SHEET_WIDTH_PX);
    return (
      <div
        aria-hidden
        style={{
          width,
          height,
          overflow: 'hidden',
          borderRadius: 4,
          flexShrink: 0,
        }}>
        <div
          style={{
            width: SHEET_WIDTH_PX,
            height: SHEET_HEIGHT_PX,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}>
          <Template data={seedResumeData} />
        </div>
      </div>
    );
  }
);

TemplateThumbnail.displayName = 'TemplateThumbnail';
