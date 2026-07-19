import EditorPage from '@/app/(app)/keynotes/editor/[id]/EditorPage';

export function generateStaticParams() {
  return [{ id: 'new' }];
}

export default function Page() {
  return <EditorPage />;
}
