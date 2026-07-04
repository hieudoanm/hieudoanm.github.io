'use client';

import dynamic from 'next/dynamic';
import { ToolPage } from '../_shared/ToolPage';

const Component = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/app/pdf').then((m) => ({
      default: m.PdfModal,
    })),
  { ssr: false }
);

const PdfPage = () => <ToolPage Component={Component} />;

export default PdfPage;
