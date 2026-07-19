import PrintPage from '@/app/(app)/keynotes/print/[id]/PrintPage';

export function generateStaticParams() {
  return [{ id: 'new' }];
}

export default function Page() {
  return <PrintPage />;
}
