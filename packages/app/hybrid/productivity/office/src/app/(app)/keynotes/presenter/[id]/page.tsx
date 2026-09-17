import PresenterView from '@/app/(app)/keynotes/presenter/[id]/PresenterView';

export function generateStaticParams() {
  return [{ id: 'new' }];
}

export default function Page() {
  return <PresenterView />;
}
