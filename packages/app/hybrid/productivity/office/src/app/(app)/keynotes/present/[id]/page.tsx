import PresentPage from '@/app/(app)/keynotes/present/[id]/PresentPage';

export function generateStaticParams() {
  return [{ id: 'new' }];
}

export default function Page() {
  return <PresentPage />;
}
