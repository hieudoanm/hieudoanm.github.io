import EditorPage from './EditorPage';

export function generateStaticParams() {
  return [{ id: 'new' }];
}

export default function Page() {
  return <EditorPage />;
}
