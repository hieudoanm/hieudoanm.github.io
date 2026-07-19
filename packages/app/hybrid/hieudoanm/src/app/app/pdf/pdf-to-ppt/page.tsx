'use client';

import dynamic from 'next/dynamic';
import { ToolPage } from '../../_shared/ToolPage';

const Component = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/app/pdf').then((m) => ({
      default: m.Pdf,
    })),
  { ssr: false }
);

const ToolPdfPdfToPpt = () => <ToolPage Component={Component} />;

export default ToolPdfPdfToPpt;
