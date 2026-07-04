'use client';

import dynamic from 'next/dynamic';
import { ToolPage } from '../../_shared/ToolPage';

const Component = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/app/pdf').then((m) => ({
      default: m.PdfModal,
    })),
  { ssr: false }
);

const ToolPdfAzw3ToEpub = () => <ToolPage Component={Component} />;

export default ToolPdfAzw3ToEpub;
